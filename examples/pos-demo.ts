/**
 * Part-of-Speech Extension Demo
 * 
 * Demonstrates grammar pattern recognition and exercise generation
 */

import { createPOSExtension } from "glost-pos";
import type { POSProvider } from "glost-pos";

// ============================================================================
// REAL DATA: English POS Dictionary (Sample)
// ============================================================================

const ENGLISH_POS_DATA = new Map<string, string>([
  // Articles
  ["the", "article"],
  ["a", "article"],
  ["an", "article"],
  
  // Nouns
  ["cat", "noun"],
  ["dog", "noun"],
  ["fox", "noun"],
  ["student", "noun"],
  ["exam", "noun"],
  ["material", "noun"],
  
  // Verbs
  ["is", "verb"],
  ["was", "verb"],
  ["jumps", "verb"],
  ["runs", "verb"],
  ["studied", "verb"],
  ["passed", "verb"],
  ["understood", "verb"],
  
  // Adjectives
  ["quick", "adjective"],
  ["brown", "adjective"],
  ["lazy", "adjective"],
  ["hard", "adjective"],
  
  // Prepositions
  ["over", "preposition"],
  ["on", "preposition"],
  ["in", "preposition"],
  
  // Pronouns
  ["she", "pronoun"],
  ["he", "pronoun"],
  ["it", "pronoun"],
  
  // Conjunctions
  ["and", "conjunction"],
  ["but", "conjunction"],
  ["because", "conjunction"],
  
  // Adverbs
  ["very", "adverb"],
  ["quickly", "adverb"],
]);

// ============================================================================
// PROVIDER IMPLEMENTATION
// ============================================================================

class EnglishPOSProvider implements POSProvider {
  constructor(private dictionary: Map<string, string>) {}
  
  async getPOS(word: string, language: string): Promise<string | undefined> {
    const normalized = word.toLowerCase();
    return this.dictionary.get(normalized);
  }
}

// ============================================================================
// DEMO: Sentence Structure Visualization
// ============================================================================

async function demonstrateSentenceStructure() {
  console.log("\n📊 DEMO: Sentence Structure Visualization\n");
  console.log("=" .repeat(70));
  
  const sentence = "The quick brown fox jumps over the lazy dog";
  console.log(`\nInput sentence:\n"${sentence}"\n`);
  
  const provider = new EnglishPOSProvider(ENGLISH_POS_DATA);
  const words = sentence.split(/\s+/);
  
  console.log("Word-by-Word Analysis:\n");
  
  const posColors: Record<string, string> = {
    article: "🔵",
    adjective: "🟢",
    noun: "🔴",
    verb: "🟡",
    preposition: "🟣"
  };
  
  const structure: string[] = [];
  
  for (const word of words) {
    const pos = await provider.getPOS(word, "en");
    
    if (!pos) {
      console.log(`  ❓ "${word}" - No POS data`);
      structure.push("?");
      continue;
    }
    
    const emoji = posColors[pos] || "⚪";
    const abbr = pos.substring(0, 3).toUpperCase();
    
    console.log(`  ${emoji} "${word}"`);
    console.log(`      Part of Speech: ${pos}`);
    console.log(`      Abbreviation: [${abbr}]`);
    
    structure.push(abbr);
  }
  
  console.log("\n📐 Sentence Structure Pattern:\n");
  console.log(`  [${structure.join("]-[")}]`);
  console.log(`   ${words.join("   ")}`);
  
  console.log("\n🎯 Pattern Identified:");
  console.log(`  [Article] [Adjective] [Adjective] [Noun] [Verb] [Preposition] [Article] [Adjective] [Noun]`);
  console.log(`  This is a descriptive sentence with a prepositional phrase.`);
  
  console.log("\n" + "=".repeat(70));
}

// ============================================================================
// DEMO: Pattern Recognition
// ============================================================================

async function demonstratePatternRecognition() {
  console.log("\n🔍 DEMO: Grammar Pattern Recognition\n");
  console.log("=" .repeat(70));
  
  const sentence = "The quick brown fox jumps over the lazy dog";
  const provider = new EnglishPOSProvider(ENGLISH_POS_DATA);
  const words = sentence.split(/\s+/);
  
  // Get POS tags
  const tagged: Array<{ word: string; pos: string }> = [];
  for (const word of words) {
    const pos = await provider.getPOS(word, "en");
    if (pos) {
      tagged.push({ word, pos });
    }
  }
  
  console.log("\n🎯 Patterns Found:\n");
  
  // Find adjective-noun pairs
  const adjNounPairs: string[] = [];
  for (let i = 0; i < tagged.length - 1; i++) {
    if (tagged[i].pos === "adjective" && tagged[i + 1].pos === "noun") {
      adjNounPairs.push(`"${tagged[i].word} ${tagged[i + 1].word}"`);
    }
  }
  
  if (adjNounPairs.length > 0) {
    console.log(`  ✅ Adjective + Noun patterns: ${adjNounPairs.length}`);
    adjNounPairs.forEach(pair => {
      console.log(`      • ${pair}`);
    });
  }
  
  // Find article-noun phrases
  const articleNounPhrases: string[] = [];
  for (let i = 0; i < tagged.length - 1; i++) {
    if (tagged[i].pos === "article") {
      const phrase: string[] = [tagged[i].word];
      let j = i + 1;
      
      // Collect adjectives
      while (j < tagged.length && tagged[j].pos === "adjective") {
        phrase.push(tagged[j].word);
        j++;
      }
      
      // Get noun
      if (j < tagged.length && tagged[j].pos === "noun") {
        phrase.push(tagged[j].word);
        articleNounPhrases.push(`"${phrase.join(" ")}"`);
      }
    }
  }
  
  if (articleNounPhrases.length > 0) {
    console.log(`\n  ✅ Noun Phrases (Article + Adjectives + Noun): ${articleNounPhrases.length}`);
    articleNounPhrases.forEach(phrase => {
      console.log(`      • ${phrase}`);
    });
  }
  
  // Count by POS
  const posCounts: Record<string, number> = {};
  tagged.forEach(({ pos }) => {
    posCounts[pos] = (posCounts[pos] || 0) + 1;
  });
  
  console.log("\n📊 Part-of-Speech Distribution:\n");
  Object.entries(posCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([pos, count]) => {
      const percent = ((count / tagged.length) * 100).toFixed(1);
      console.log(`  ${pos.padEnd(15)} ${count} (${percent}%)`);
    });
  
  console.log("\n" + "=".repeat(70));
}

// ============================================================================
// DEMO: Exercise Generation
// ============================================================================

async function demonstrateExerciseGeneration() {
  console.log("\n📝 DEMO: Automatic Exercise Generation\n");
  console.log("=" .repeat(70));
  
  const sentence = "The student studied hard and passed the exam because she understood the material";
  const provider = new EnglishPOSProvider(ENGLISH_POS_DATA);
  const words = sentence.split(/\s+/);
  
  // Get POS tags
  const tagged: Array<{ word: string; pos: string }> = [];
  for (const word of words) {
    const pos = await provider.getPOS(word, "en");
    if (pos) {
      tagged.push({ word, pos });
    }
  }
  
  console.log("\n🎮 Exercise 1: Find All Verbs\n");
  console.log(`  Sentence: "${sentence}"`);
  console.log(`  Task: Identify all the verbs in the sentence.\n`);
  
  const verbs = tagged.filter(t => t.pos === "verb");
  console.log(`  Answer: ${verbs.map(v => v.word).join(", ")}`);
  console.log(`  Total verbs found: ${verbs.length}`);
  
  console.log("\n🎮 Exercise 2: Find All Nouns\n");
  console.log(`  Sentence: "${sentence}"`);
  console.log(`  Task: Identify all the nouns in the sentence.\n`);
  
  const nouns = tagged.filter(t => t.pos === "noun");
  console.log(`  Answer: ${nouns.map(n => n.word).join(", ")}`);
  console.log(`  Total nouns found: ${nouns.length}`);
  
  console.log("\n🎮 Exercise 3: Sentence Structure Quiz\n");
  console.log(`  What is the part of speech of "studied" in this sentence?`);
  console.log(`  A) Noun`);
  console.log(`  B) Verb`);
  console.log(`  C) Adjective`);
  console.log(`  D) Adverb`);
  
  const studiedPOS = await provider.getPOS("studied", "en");
  console.log(`\n  ✅ Correct Answer: B) ${studiedPOS}`);
  
  console.log("\n🎮 Exercise 4: Fill in the POS\n");
  console.log(`  Complete the pattern: [Article] [___] [Verb] [Article] [___]`);
  console.log(`  Sentence start: "The student passed the exam"`);
  
  const pattern = ["article", "noun", "verb", "article", "noun"];
  console.log(`\n  ✅ Answer: [Article] [Noun] [Verb] [Article] [Noun]`);
  
  console.log("\n" + "=".repeat(70));
}

// ============================================================================
// DEMO: Multiple Sentences Comparison
// ============================================================================

async function demonstrateMultipleSentences() {
  console.log("\n🔀 DEMO: Comparing Sentence Structures\n");
  console.log("=" .repeat(70));
  
  const sentences = [
    "The cat sleeps",
    "The quick cat sleeps",
    "The quick brown cat sleeps peacefully"
  ];
  
  const provider = new EnglishPOSProvider(ENGLISH_POS_DATA);
  
  for (const sentence of sentences) {
    const words = sentence.split(/\s+/);
    const structure: string[] = [];
    
    for (const word of words) {
      const pos = await provider.getPOS(word, "en");
      if (pos) {
        structure.push(pos.substring(0, 3).toUpperCase());
      }
    }
    
    console.log(`\n  "${sentence}"`);
    console.log(`  Structure: [${structure.join("]-[")}]`);
    console.log(`  Complexity: ${structure.length} words, ${structure.filter(s => s === "ADJ").length} adjectives`);
  }
  
  console.log("\n🎯 Pattern Observation:");
  console.log(`  As sentences get longer, adjectives are added to modify the noun.`);
  console.log(`  Basic structure remains: [Article] [Adjectives*] [Noun] [Verb]`);
  
  console.log("\n" + "=".repeat(70));
}

// ============================================================================
// RUN ALL DEMOS
// ============================================================================

async function main() {
  console.log("\n");
  console.log("╔════════════════════════════════════════════════════════════════════╗");
  console.log("║                  PART-OF-SPEECH EXTENSION DEMO                     ║");
  console.log("║                                                                    ║");
  console.log("║  Demonstrates how POS tagging enables:                            ║");
  console.log("║  • Grammar pattern visualization (adjective + noun)               ║");
  console.log("║  • Sentence structure analysis ([Art][Adj][Noun][Verb])           ║");
  console.log("║  • Automatic exercise generation (find all verbs)                 ║");
  console.log("╚════════════════════════════════════════════════════════════════════╝");
  
  await demonstrateSentenceStructure();
  await demonstratePatternRecognition();
  await demonstrateExerciseGeneration();
  await demonstrateMultipleSentences();
  
  console.log("\n✅ Demo complete!\n");
  console.log("Key Takeaway:");
  console.log("  With POS tagging, learners can see grammar patterns and understand");
  console.log("  sentence structure, making language learning more systematic.\n");
}

// Run if executed directly
if (require.main === module) {
  main().catch(console.error);
}

export { main as runPOSDemo };
