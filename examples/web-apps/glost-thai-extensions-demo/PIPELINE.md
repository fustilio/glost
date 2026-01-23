# Pipeline Flow: "จากรัฐอิลลินอย" (from Illinois)

This document traces the complete pipeline step-by-step for processing Thai text and rendering transcriptions and translations.

## Input
```
"จากรัฐอิลลินอย"
```

---

## STEP 1: Text Segmentation
**File:** `server.ts` → `segmentThaiText()`

Uses `Intl.Segmenter` to split the text into word-like segments.

**Result:**
```javascript
["จา", "กรัฐอิล", "ลิ", "นอย"]
```

⚠️ **Problem:** The segmenter incorrectly splits "จากรัฐอิลลินอย" into fragments:
- "จา" (fragment of "จาก")
- "กรัฐอิล" (fragment of "รัฐอิลลินอย")
- "ลิ" (fragment of "อิลลินอย")
- "นอย" (fragment of "อิลลินอย")

**GLOST Document Created:**
```javascript
{
  type: "RootNode",
  children: [
    { type: "WordNode", text: "จา", lang: "th-TH", script: "thai" },
    { type: "WordNode", text: "กรัฐอิล", lang: "th-TH", script: "thai" },
    { type: "WordNode", text: "ลิ", lang: "th-TH", script: "thai" },
    { type: "WordNode", text: "นอย", lang: "th-TH", script: "thai" }
  ]
}
```

---

## STEP 2: Transcription Extension
**File:** `transcription.ts` → `createThaiTranscriptionExtension()`

Adds transcription data to each word node by looking up in demo vocabulary.

**Process:**
- For each word: `getDemoThaiTranscriptions(word)`
- Looks up: "จา", "กรัฐอิล", "ลิ", "นอย"
- Finds transcriptions only for words that exist in dictionary

**Result:**
```javascript
[
  { 
    text: "จา", 
    transcription: undefined  // fragment, not in dictionary (full word is "จาก")
  },
  { 
    text: "กรัฐอิล", 
    transcription: undefined  // fragment, not in dictionary
  },
  { 
    text: "ลิ", 
    transcription: undefined  // fragment, not in dictionary
  },
  { 
    text: "นอย", 
    transcription: undefined  // fragment, not in dictionary
  }
]
```

**Note:** All fragments don't have transcriptions because they're not real words. The transcriptions will come from the full phrase "จากรัฐอิลลินอย" after word joining.

---

## STEP 3: Word Joiner Extension
**File:** `word-joiner.ts` → `createThaiWordJoinerExtension()`

Combines consecutive words into phrases if the combined form exists in the dictionary.

**Process:**
1. Try combining all 4 words: "จา" + "กรัฐอิล" + "ลิ" + "นอย" = "จากรัฐอิลลินอย"
2. Check if "จากรัฐอิลลินอย" exists in dictionary → ✅ YES
3. Check if at least one individual word is valid (not blacklisted AND in dictionary):
   - "จา" is blacklisted → skip
   - "กรัฐอิล" is blacklisted → skip
   - "ลิ" is blacklisted → skip
   - "นอย" is blacklisted → skip
4. **Fallback:** Even though all individual words are blacklisted, the combined phrase "จากรัฐอิลลินอย" exists in the dictionary, so we combine it anyway!
   - This is the safety net for cases where Intl.Segmenter incorrectly splits a valid phrase

**Result - Composite Word Created:**
```javascript
{
  type: "WordNode",
  text: "จากรัฐอิลลินอย",
  extras: {
    isComposite: true,
    originalChunks: ["จา", "กรัฐอิล", "ลิ", "นอย"],
    originalTranscriptions: [
      undefined,            // "จา" - fragment, no transcription
      undefined,            // "กรัฐอิล" - fragment, no transcription
      undefined,            // "ลิ" - fragment, no transcription
      undefined             // "นอย" - fragment, no transcription
    ]
  }
}
```

**Key Point:** The word joiner:
- ✅ Combines fragments into the full phrase "จากรัฐอิลลินอย"
- ✅ Preserves individual word transcriptions in `originalTranscriptions`
- ✅ Marks it as `isComposite: true` so the renderer knows it's a phrase

---

## STEP 4: Translation Extension
**File:** `translation.ts` → `createThaiTranslationExtension()`

Adds translation data to the composite word.

**Process:**
1. Look up translation for "จากรัฐอิลลินอย"
2. `getDemoThaiTranslation("จากรัฐอิลลินอย")` → "from Illinois"
3. Add to word extras

**Result:**
```javascript
{
  type: "WordNode",
  text: "จากรัฐอิลลินอย",
  extras: {
    isComposite: true,
    originalChunks: ["จา", "กรัฐอิล", "ลิ", "นอย"],
    originalTranscriptions: [
      { rtgs: "cha" },
      undefined,
      undefined,
      undefined
    ],
    translations: {
      en: "from Illinois"
    }
  }
}
```

**Note:** The translation extension:
- ✅ Skips very short words (like "จา", "ลิ", "นอย") to avoid translating fragments
- ✅ Only translates the full phrase "จากรัฐอิลลินอย"
- ✅ Stores translation in `extras.translations.en`

---

## STEP 5: Rendering
**File:** `server.ts` → `renderDocument()`

Converts the GLOST document into HTML for display.

**Process for Composite Word:**

1. **Detect Composite:**
   ```javascript
   const isComposite = word.extras?.isComposite === true;  // ✅ true
   const originalChunks = word.extras?.originalChunks;     // ["จา", "กรัฐอิล", "ลิ", "นอย"]
   const originalTranscriptions = word.extras?.originalTranscriptions;
   const translation = word.extras?.translations?.en;      // "from Illinois"
   ```

2. **Render Individual Word Parts:**
   - For each chunk in `originalChunks`:
     - If transcription exists → render with ruby annotation
     - If no transcription → render as plain text
   - "จา", "กรัฐอิล", "ลิ", "นอย" → all render as plain text (no transcriptions for fragments)
   - **Note:** The full phrase "จากรัฐอิลลินอย" has a transcription in the dictionary, but we want to show transcriptions on individual words, not the phrase. Since the fragments don't have transcriptions, they render as plain text.

3. **Render Phrase Translation:**
   - Show translation below all word parts
   - "from Illinois" appears below the entire phrase

**Final HTML Output:**
```html
<span style="display: inline-flex; flex-direction: column; align-items: flex-start;">
  <span class="ruby-annotation">chak rat illinoy</span>
  <span style="display: inline-flex; align-items: baseline; gap: 0.25rem;">
    <span>จา</span>
    <span>กรัฐอิล</span>
    <span>ลิ</span>
    <span>นอย</span>
  </span>
  <span class="translation">from Illinois state</span>
</span>
```

**Visual Result:**
```
chak rat illinoy
จา กรัฐอิล ลิ นอย
from Illinois state
```

**Note:** In this case, the fragments don't have individual transcriptions, so the phrase-level transcription "chak rat illinoy" appears above all the word parts. The translation "from Illinois state" appears below the entire phrase. For phrases where individual words DO have transcriptions (like "สวัสดีครับ"), those transcriptions would appear as ruby annotations above each word instead of a single phrase transcription.

---

## Pipeline Harmony: How Extensions Work Together

### Extension Order Matters:
1. **Transcription Extension** (first)
   - Adds transcriptions to individual words
   - Works on fragments before they're combined

2. **Word Joiner Extension** (second)
   - Combines fragments into phrases
   - Preserves individual transcriptions in `originalTranscriptions`
   - Marks phrases as `isComposite: true`

3. **Translation Extension** (third)
   - Adds translations to phrases
   - Works on the combined phrase, not fragments
   - Skips short fragments to avoid incorrect translations

### Data Flow:
```
Input: "จากรัฐอิลลินอย"
  ↓
Segmentation: ["จา", "กรัฐอิล", "ลิ", "นอย"]
  ↓
Transcription: Add transcriptions to each word
  ↓
Word Joiner: Combine → "จากรัฐอิลลินอย" (preserve individual transcriptions)
  ↓
Translation: Add "from Illinois" to phrase
  ↓
Rendering: Show transcriptions on words, translation on phrase
```

### Key Design Decisions:

1. **Transcriptions on Individual Words:**
   - Each word gets its own transcription
   - Even in phrases, transcriptions stay separate
   - Example: "สวัสดีครับ" → "sawatdi" + "khrap" (not "sawatdi khrap")

2. **Translations on Phrases:**
   - Phrases get phrase-level translations
   - Example: "สวัสดีครับ" → "hello" (not "hello" + "polite particle")

3. **Blacklist Prevents Incorrect Combinations:**
   - Fragments like "อิล", "ลิ", "นอย" are blacklisted
   - Prevents combining them with other words incorrectly
   - But allows combining all fragments together if the full phrase exists

---

## Summary

The pipeline harmoniously:
1. ✅ Segments text (even if incorrectly)
2. ✅ Adds transcriptions to individual words
3. ✅ Combines fragments into correct phrases
4. ✅ Adds translations to phrases
5. ✅ Renders transcriptions on words, translations on phrases

The result: **Individual word transcriptions + phrase-level translations** = Perfect for language learning! 🎯
