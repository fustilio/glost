import { z } from 'zod';

// ============================================================================
// Zod Schemas for GLOST Validation
// ============================================================================

/**
 * Linguistic level schema
 */
export const LinguisticLevelSchema = z.enum([
  'character',
  'syllable', 
  'word',
  'phrase',
  'sentence',
  'paragraph'
]);

/**
 * Pronunciation context schema
 */
export const PronunciationContextSchema = z.enum([
  'formal',
  'informal',
  'historical',
  'regional',
  'dialectal'
]);

/**
 * Transcription system schema
 */
export const TranscriptionSystemSchema = z.union([
  z.literal('rtgs'),
  z.literal('aua'),
  z.literal('paiboon'),
  z.literal('romaji'),
  z.literal('furigana'),
  z.literal('ipa'),
  z.literal('pinyin'),
  z.literal('hangul'),
  z.string()
]);

/**
 * Language code schema
 */
export const LanguageCodeSchema = z.union([
  z.literal('th'),
  z.literal('ja'),
  z.literal('zh'),
  z.literal('ko'),
  z.literal('en'),
  z.string()
]);

/**
 * Script system schema
 */
export const ScriptSystemSchema = z.union([
  z.literal('thai'),
  z.literal('hiragana'),
  z.literal('katakana'),
  z.literal('kanji'),
  z.literal('hanzi'),
  z.literal('hangul'),
  z.literal('latin'),
  z.literal('mixed'),
  z.string()
]);

/**
 * Pronunciation variant schema
 */
export const PronunciationVariantSchema = z.object({
  text: z.string(),
  context: PronunciationContextSchema,
  notes: z.string().optional()
});

/**
 * Transcription info schema
 */
export const TranscriptionInfoSchema = z.object({
  text: z.string(),
  system: TranscriptionSystemSchema,
  variants: z.array(PronunciationVariantSchema).optional(),
  tone: z.number().optional(),
  syllables: z.array(z.string()).optional(),
  phonetic: z.string().optional()
});

/**
 * Transliteration data schema
 */
export const TransliterationDataSchema = z.record(
  z.string(),
  TranscriptionInfoSchema
);

/**
 * Linguistic metadata schema
 */
export const LinguisticMetadataSchema = z.object({
  /** @deprecated Use extras.translations instead */
  meaning: z.string().optional(),
  partOfSpeech: z.string(),
  usage: z.string().optional(),
  etymology: z.string().optional(),
  examples: z.array(z.string()).optional(),
  frequency: z.enum(['high', 'medium', 'low']).optional(),
  formality: z.enum(['formal', 'neutral', 'informal']).optional(),
  register: z.string().optional()
});

/**
 * Base GLOST node schema
 */
export const GLOSTNodeBaseSchema = z.object({
  type: z.string(),
  lang: LanguageCodeSchema.optional(),
  script: ScriptSystemSchema.optional(),
  level: LinguisticLevelSchema.optional(),
  position: z.any().optional()
});

/**
 * GLOST word node schema
 */
export const GLOSTWordNodeSchema = GLOSTNodeBaseSchema.extend({
  type: z.literal('GLOSTWordNode'),
  value: z.string(),
  transcription: TransliterationDataSchema,
  metadata: LinguisticMetadataSchema,
  level: LinguisticLevelSchema,
  children: z.array(z.any()).default([])
});

/**
 * GLOST sentence node schema
 */
export const GLOSTSentenceNodeSchema = GLOSTNodeBaseSchema.extend({
  type: z.literal('GLOSTSentenceNode'),
  originalText: z.string(),
  lang: LanguageCodeSchema,
  script: ScriptSystemSchema,
  transcription: TransliterationDataSchema.optional(),
  children: z.array(z.any()).default([])
});

/**
 * GLOST paragraph node schema
 */
export const GLOSTParagraphNodeSchema = GLOSTNodeBaseSchema.extend({
  type: z.literal('GLOSTParagraphNode'),
  lang: LanguageCodeSchema,
  script: ScriptSystemSchema,
  children: z.array(z.any()).default([])
});

/**
 * GLOST root node schema
 */
export const GLOSTRootNodeSchema = GLOSTNodeBaseSchema.extend({
  type: z.literal('GLOSTRootNode'),
  lang: LanguageCodeSchema,
  script: ScriptSystemSchema,
  metadata: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    date: z.string().optional(),
    description: z.string().optional()
  }).optional(),
  children: z.array(z.any()).default([])
});

/**
 * Union schema for all GLOST node types
 */
export const GLOSTNodeSchema = z.union([
  GLOSTWordNodeSchema,
  GLOSTSentenceNodeSchema,
  GLOSTParagraphNodeSchema,
  GLOSTRootNodeSchema
]);

// ============================================================================
// Validation Functions
// ============================================================================

/**
 * Validate an GLOST word node
 */
export function validateGLOSTWordNode(data: unknown): data is z.infer<typeof GLOSTWordNodeSchema> {
  const result = GLOSTWordNodeSchema.safeParse(data);
  return result.success;
}

/**
 * Validate an GLOST sentence node
 */
export function validateGLOSTSentenceNode(data: unknown): data is z.infer<typeof GLOSTSentenceNodeSchema> {
  const result = GLOSTSentenceNodeSchema.safeParse(data);
  return result.success;
}

/**
 * Validate an GLOST paragraph node
 */
export function validateGLOSTParagraphNode(data: unknown): data is z.infer<typeof GLOSTParagraphNodeSchema> {
  const result = GLOSTParagraphNodeSchema.safeParse(data);
  return result.success;
}

/**
 * Validate an GLOST root node
 */
export function validateGLOSTRootNode(data: unknown): data is z.infer<typeof GLOSTRootNodeSchema> {
  const result = GLOSTRootNodeSchema.safeParse(data);
  return result.success;
}

/**
 * Validate any GLOST node
 */
export function validateGLOSTNode(data: unknown): data is z.infer<typeof GLOSTNodeSchema> {
  const result = GLOSTNodeSchema.safeParse(data);
  return result.success;
}

/**
 * Parse and validate GLOST data with error details
 */
export function parseGLOSTNode(data: unknown) {
  return GLOSTNodeSchema.safeParse(data);
}

/**
 * Parse and validate GLOST word node with error details
 */
export function parseGLOSTWordNode(data: unknown) {
  return GLOSTWordNodeSchema.safeParse(data);
}

/**
 * Parse and validate GLOST sentence node with error details
 */
export function parseGLOSTSentenceNode(data: unknown) {
  return GLOSTSentenceNodeSchema.safeParse(data);
}

/**
 * Parse and validate GLOST paragraph node with error details
 */
export function parseGLOSTParagraphNode(data: unknown) {
  return GLOSTParagraphNodeSchema.safeParse(data);
}

/**
 * Parse and validate GLOST root node with error details
 */
export function parseGLOSTRootNode(data: unknown) {
  return GLOSTRootNodeSchema.safeParse(data);
}

/**
 * Validate an entire GLOST tree/document
 */
export function validateGLOSTTree(data: unknown): string[] {
  const errors: string[] = [];
  
  // Validate root node
  const rootResult = GLOSTRootNodeSchema.safeParse(data);
  if (!rootResult.success) {
    errors.push(`Root validation failed: ${rootResult.error.message}`);
    return errors;
  }
  
  const root = rootResult.data;
  
  // Validate all paragraphs
  for (let i = 0; i < root.children.length; i++) {
    const child = root.children[i];
    if (child.type === 'ParagraphNode') {
      const paragraphResult = GLOSTParagraphNodeSchema.safeParse(child);
      if (!paragraphResult.success) {
        errors.push(`Paragraph ${i} validation failed: ${paragraphResult.error.message}`);
      } else {
        // Validate all sentences in paragraph
        for (let j = 0; j < child.children.length; j++) {
          const sentence = child.children[j];
          if (sentence.type === 'SentenceNode') {
            const sentenceResult = GLOSTSentenceNodeSchema.safeParse(sentence);
            if (!sentenceResult.success) {
              errors.push(`Sentence ${i}.${j} validation failed: ${sentenceResult.error.message}`);
            } else {
              // Validate all words in sentence
              for (let k = 0; k < sentence.children.length; k++) {
                const word = sentence.children[k];
                if (word.type === 'WordNode') {
                  const wordResult = GLOSTWordNodeSchema.safeParse(word);
                  if (!wordResult.success) {
                    errors.push(`Word ${i}.${j}.${k} validation failed: ${wordResult.error.message}`);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  
  return errors;
}

// ============================================================================
// Schema Export
// ============================================================================

export const schemas = {
  LinguisticLevel: LinguisticLevelSchema,
  PronunciationContext: PronunciationContextSchema,
  TranscriptionSystem: TranscriptionSystemSchema,
  LanguageCode: LanguageCodeSchema,
  ScriptSystem: ScriptSystemSchema,
  PronunciationVariant: PronunciationVariantSchema,
  TranscriptionInfo: TranscriptionInfoSchema,
  TransliterationData: TransliterationDataSchema,
  LinguisticMetadata: LinguisticMetadataSchema,
  GLOSTNode: GLOSTNodeSchema,
  GLOSTWordNode: GLOSTWordNodeSchema,
  GLOSTSentenceNode: GLOSTSentenceNodeSchema,
  GLOSTParagraphNode: GLOSTParagraphNodeSchema,
  GLOSTRootNode: GLOSTRootNodeSchema
};
