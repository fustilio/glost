import { z } from 'zod';
/**
 * Linguistic level schema
 */
export declare const LinguisticLevelSchema: z.ZodEnum<["character", "syllable", "word", "phrase", "sentence", "paragraph"]>;
/**
 * Pronunciation context schema
 */
export declare const PronunciationContextSchema: z.ZodEnum<["formal", "informal", "historical", "regional", "dialectal"]>;
/**
 * Transcription system schema
 */
export declare const TranscriptionSystemSchema: z.ZodUnion<[z.ZodLiteral<"rtgs">, z.ZodLiteral<"aua">, z.ZodLiteral<"paiboon">, z.ZodLiteral<"romaji">, z.ZodLiteral<"furigana">, z.ZodLiteral<"ipa">, z.ZodLiteral<"pinyin">, z.ZodLiteral<"hangul">, z.ZodString]>;
/**
 * Language code schema
 */
export declare const LanguageCodeSchema: z.ZodUnion<[z.ZodLiteral<"th">, z.ZodLiteral<"ja">, z.ZodLiteral<"zh">, z.ZodLiteral<"ko">, z.ZodLiteral<"en">, z.ZodString]>;
/**
 * Script system schema
 */
export declare const ScriptSystemSchema: z.ZodUnion<[z.ZodLiteral<"thai">, z.ZodLiteral<"hiragana">, z.ZodLiteral<"katakana">, z.ZodLiteral<"kanji">, z.ZodLiteral<"hanzi">, z.ZodLiteral<"hangul">, z.ZodLiteral<"latin">, z.ZodLiteral<"mixed">, z.ZodString]>;
/**
 * Pronunciation variant schema
 */
export declare const PronunciationVariantSchema: z.ZodObject<{
    text: z.ZodString;
    context: z.ZodEnum<["formal", "informal", "historical", "regional", "dialectal"]>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    text: string;
    context: "formal" | "informal" | "historical" | "regional" | "dialectal";
    notes?: string | undefined;
}, {
    text: string;
    context: "formal" | "informal" | "historical" | "regional" | "dialectal";
    notes?: string | undefined;
}>;
/**
 * Transcription info schema
 */
export declare const TranscriptionInfoSchema: z.ZodObject<{
    text: z.ZodString;
    system: z.ZodUnion<[z.ZodLiteral<"rtgs">, z.ZodLiteral<"aua">, z.ZodLiteral<"paiboon">, z.ZodLiteral<"romaji">, z.ZodLiteral<"furigana">, z.ZodLiteral<"ipa">, z.ZodLiteral<"pinyin">, z.ZodLiteral<"hangul">, z.ZodString]>;
    variants: z.ZodOptional<z.ZodArray<z.ZodObject<{
        text: z.ZodString;
        context: z.ZodEnum<["formal", "informal", "historical", "regional", "dialectal"]>;
        notes: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        text: string;
        context: "formal" | "informal" | "historical" | "regional" | "dialectal";
        notes?: string | undefined;
    }, {
        text: string;
        context: "formal" | "informal" | "historical" | "regional" | "dialectal";
        notes?: string | undefined;
    }>, "many">>;
    tone: z.ZodOptional<z.ZodNumber>;
    syllables: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    phonetic: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    text: string;
    system: string;
    tone?: number | undefined;
    variants?: {
        text: string;
        context: "formal" | "informal" | "historical" | "regional" | "dialectal";
        notes?: string | undefined;
    }[] | undefined;
    syllables?: string[] | undefined;
    phonetic?: string | undefined;
}, {
    text: string;
    system: string;
    tone?: number | undefined;
    variants?: {
        text: string;
        context: "formal" | "informal" | "historical" | "regional" | "dialectal";
        notes?: string | undefined;
    }[] | undefined;
    syllables?: string[] | undefined;
    phonetic?: string | undefined;
}>;
/**
 * Transliteration data schema
 */
export declare const TransliterationDataSchema: z.ZodRecord<z.ZodString, z.ZodObject<{
    text: z.ZodString;
    system: z.ZodUnion<[z.ZodLiteral<"rtgs">, z.ZodLiteral<"aua">, z.ZodLiteral<"paiboon">, z.ZodLiteral<"romaji">, z.ZodLiteral<"furigana">, z.ZodLiteral<"ipa">, z.ZodLiteral<"pinyin">, z.ZodLiteral<"hangul">, z.ZodString]>;
    variants: z.ZodOptional<z.ZodArray<z.ZodObject<{
        text: z.ZodString;
        context: z.ZodEnum<["formal", "informal", "historical", "regional", "dialectal"]>;
        notes: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        text: string;
        context: "formal" | "informal" | "historical" | "regional" | "dialectal";
        notes?: string | undefined;
    }, {
        text: string;
        context: "formal" | "informal" | "historical" | "regional" | "dialectal";
        notes?: string | undefined;
    }>, "many">>;
    tone: z.ZodOptional<z.ZodNumber>;
    syllables: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    phonetic: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    text: string;
    system: string;
    tone?: number | undefined;
    variants?: {
        text: string;
        context: "formal" | "informal" | "historical" | "regional" | "dialectal";
        notes?: string | undefined;
    }[] | undefined;
    syllables?: string[] | undefined;
    phonetic?: string | undefined;
}, {
    text: string;
    system: string;
    tone?: number | undefined;
    variants?: {
        text: string;
        context: "formal" | "informal" | "historical" | "regional" | "dialectal";
        notes?: string | undefined;
    }[] | undefined;
    syllables?: string[] | undefined;
    phonetic?: string | undefined;
}>>;
/**
 * Linguistic metadata schema
 */
export declare const LinguisticMetadataSchema: z.ZodObject<{
    /** @deprecated Use extras.translations instead */
    meaning: z.ZodOptional<z.ZodString>;
    partOfSpeech: z.ZodString;
    usage: z.ZodOptional<z.ZodString>;
    etymology: z.ZodOptional<z.ZodString>;
    examples: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    frequency: z.ZodOptional<z.ZodEnum<["high", "medium", "low"]>>;
    formality: z.ZodOptional<z.ZodEnum<["formal", "neutral", "informal"]>>;
    register: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    partOfSpeech: string;
    examples?: string[] | undefined;
    frequency?: "high" | "medium" | "low" | undefined;
    meaning?: string | undefined;
    usage?: string | undefined;
    etymology?: string | undefined;
    formality?: "neutral" | "formal" | "informal" | undefined;
    register?: string | undefined;
}, {
    partOfSpeech: string;
    examples?: string[] | undefined;
    frequency?: "high" | "medium" | "low" | undefined;
    meaning?: string | undefined;
    usage?: string | undefined;
    etymology?: string | undefined;
    formality?: "neutral" | "formal" | "informal" | undefined;
    register?: string | undefined;
}>;
/**
 * Base GLOST node schema
 */
export declare const GLOSTNodeBaseSchema: z.ZodObject<{
    type: z.ZodString;
    lang: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"th">, z.ZodLiteral<"ja">, z.ZodLiteral<"zh">, z.ZodLiteral<"ko">, z.ZodLiteral<"en">, z.ZodString]>>;
    script: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"thai">, z.ZodLiteral<"hiragana">, z.ZodLiteral<"katakana">, z.ZodLiteral<"kanji">, z.ZodLiteral<"hanzi">, z.ZodLiteral<"hangul">, z.ZodLiteral<"latin">, z.ZodLiteral<"mixed">, z.ZodString]>>;
    level: z.ZodOptional<z.ZodEnum<["character", "syllable", "word", "phrase", "sentence", "paragraph"]>>;
    position: z.ZodOptional<z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    type: string;
    lang?: string | undefined;
    position?: any;
    script?: string | undefined;
    level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
}, {
    type: string;
    lang?: string | undefined;
    position?: any;
    script?: string | undefined;
    level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
}>;
/**
 * GLOST word node schema
 */
export declare const GLOSTWordNodeSchema: z.ZodObject<{
    lang: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"th">, z.ZodLiteral<"ja">, z.ZodLiteral<"zh">, z.ZodLiteral<"ko">, z.ZodLiteral<"en">, z.ZodString]>>;
    script: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"thai">, z.ZodLiteral<"hiragana">, z.ZodLiteral<"katakana">, z.ZodLiteral<"kanji">, z.ZodLiteral<"hanzi">, z.ZodLiteral<"hangul">, z.ZodLiteral<"latin">, z.ZodLiteral<"mixed">, z.ZodString]>>;
    position: z.ZodOptional<z.ZodAny>;
} & {
    type: z.ZodLiteral<"GLOSTWordNode">;
    value: z.ZodString;
    transcription: z.ZodRecord<z.ZodString, z.ZodObject<{
        text: z.ZodString;
        system: z.ZodUnion<[z.ZodLiteral<"rtgs">, z.ZodLiteral<"aua">, z.ZodLiteral<"paiboon">, z.ZodLiteral<"romaji">, z.ZodLiteral<"furigana">, z.ZodLiteral<"ipa">, z.ZodLiteral<"pinyin">, z.ZodLiteral<"hangul">, z.ZodString]>;
        variants: z.ZodOptional<z.ZodArray<z.ZodObject<{
            text: z.ZodString;
            context: z.ZodEnum<["formal", "informal", "historical", "regional", "dialectal"]>;
            notes: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }, {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }>, "many">>;
        tone: z.ZodOptional<z.ZodNumber>;
        syllables: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        phonetic: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        text: string;
        system: string;
        tone?: number | undefined;
        variants?: {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }[] | undefined;
        syllables?: string[] | undefined;
        phonetic?: string | undefined;
    }, {
        text: string;
        system: string;
        tone?: number | undefined;
        variants?: {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }[] | undefined;
        syllables?: string[] | undefined;
        phonetic?: string | undefined;
    }>>;
    metadata: z.ZodObject<{
        /** @deprecated Use extras.translations instead */
        meaning: z.ZodOptional<z.ZodString>;
        partOfSpeech: z.ZodString;
        usage: z.ZodOptional<z.ZodString>;
        etymology: z.ZodOptional<z.ZodString>;
        examples: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        frequency: z.ZodOptional<z.ZodEnum<["high", "medium", "low"]>>;
        formality: z.ZodOptional<z.ZodEnum<["formal", "neutral", "informal"]>>;
        register: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        partOfSpeech: string;
        examples?: string[] | undefined;
        frequency?: "high" | "medium" | "low" | undefined;
        meaning?: string | undefined;
        usage?: string | undefined;
        etymology?: string | undefined;
        formality?: "neutral" | "formal" | "informal" | undefined;
        register?: string | undefined;
    }, {
        partOfSpeech: string;
        examples?: string[] | undefined;
        frequency?: "high" | "medium" | "low" | undefined;
        meaning?: string | undefined;
        usage?: string | undefined;
        etymology?: string | undefined;
        formality?: "neutral" | "formal" | "informal" | undefined;
        register?: string | undefined;
    }>;
    level: z.ZodEnum<["character", "syllable", "word", "phrase", "sentence", "paragraph"]>;
    children: z.ZodDefault<z.ZodArray<z.ZodAny, "many">>;
}, "strip", z.ZodTypeAny, {
    value: string;
    type: "GLOSTWordNode";
    children: any[];
    transcription: Record<string, {
        text: string;
        system: string;
        tone?: number | undefined;
        variants?: {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }[] | undefined;
        syllables?: string[] | undefined;
        phonetic?: string | undefined;
    }>;
    metadata: {
        partOfSpeech: string;
        examples?: string[] | undefined;
        frequency?: "high" | "medium" | "low" | undefined;
        meaning?: string | undefined;
        usage?: string | undefined;
        etymology?: string | undefined;
        formality?: "neutral" | "formal" | "informal" | undefined;
        register?: string | undefined;
    };
    level: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph";
    lang?: string | undefined;
    position?: any;
    script?: string | undefined;
}, {
    value: string;
    type: "GLOSTWordNode";
    transcription: Record<string, {
        text: string;
        system: string;
        tone?: number | undefined;
        variants?: {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }[] | undefined;
        syllables?: string[] | undefined;
        phonetic?: string | undefined;
    }>;
    metadata: {
        partOfSpeech: string;
        examples?: string[] | undefined;
        frequency?: "high" | "medium" | "low" | undefined;
        meaning?: string | undefined;
        usage?: string | undefined;
        etymology?: string | undefined;
        formality?: "neutral" | "formal" | "informal" | undefined;
        register?: string | undefined;
    };
    level: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph";
    lang?: string | undefined;
    children?: any[] | undefined;
    position?: any;
    script?: string | undefined;
}>;
/**
 * GLOST sentence node schema
 */
export declare const GLOSTSentenceNodeSchema: z.ZodObject<{
    level: z.ZodOptional<z.ZodEnum<["character", "syllable", "word", "phrase", "sentence", "paragraph"]>>;
    position: z.ZodOptional<z.ZodAny>;
} & {
    type: z.ZodLiteral<"GLOSTSentenceNode">;
    originalText: z.ZodString;
    lang: z.ZodUnion<[z.ZodLiteral<"th">, z.ZodLiteral<"ja">, z.ZodLiteral<"zh">, z.ZodLiteral<"ko">, z.ZodLiteral<"en">, z.ZodString]>;
    script: z.ZodUnion<[z.ZodLiteral<"thai">, z.ZodLiteral<"hiragana">, z.ZodLiteral<"katakana">, z.ZodLiteral<"kanji">, z.ZodLiteral<"hanzi">, z.ZodLiteral<"hangul">, z.ZodLiteral<"latin">, z.ZodLiteral<"mixed">, z.ZodString]>;
    transcription: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        text: z.ZodString;
        system: z.ZodUnion<[z.ZodLiteral<"rtgs">, z.ZodLiteral<"aua">, z.ZodLiteral<"paiboon">, z.ZodLiteral<"romaji">, z.ZodLiteral<"furigana">, z.ZodLiteral<"ipa">, z.ZodLiteral<"pinyin">, z.ZodLiteral<"hangul">, z.ZodString]>;
        variants: z.ZodOptional<z.ZodArray<z.ZodObject<{
            text: z.ZodString;
            context: z.ZodEnum<["formal", "informal", "historical", "regional", "dialectal"]>;
            notes: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }, {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }>, "many">>;
        tone: z.ZodOptional<z.ZodNumber>;
        syllables: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        phonetic: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        text: string;
        system: string;
        tone?: number | undefined;
        variants?: {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }[] | undefined;
        syllables?: string[] | undefined;
        phonetic?: string | undefined;
    }, {
        text: string;
        system: string;
        tone?: number | undefined;
        variants?: {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }[] | undefined;
        syllables?: string[] | undefined;
        phonetic?: string | undefined;
    }>>>;
    children: z.ZodDefault<z.ZodArray<z.ZodAny, "many">>;
}, "strip", z.ZodTypeAny, {
    type: "GLOSTSentenceNode";
    lang: string;
    children: any[];
    script: string;
    originalText: string;
    transcription?: Record<string, {
        text: string;
        system: string;
        tone?: number | undefined;
        variants?: {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }[] | undefined;
        syllables?: string[] | undefined;
        phonetic?: string | undefined;
    }> | undefined;
    position?: any;
    level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
}, {
    type: "GLOSTSentenceNode";
    lang: string;
    script: string;
    originalText: string;
    children?: any[] | undefined;
    transcription?: Record<string, {
        text: string;
        system: string;
        tone?: number | undefined;
        variants?: {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }[] | undefined;
        syllables?: string[] | undefined;
        phonetic?: string | undefined;
    }> | undefined;
    position?: any;
    level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
}>;
/**
 * GLOST paragraph node schema
 */
export declare const GLOSTParagraphNodeSchema: z.ZodObject<{
    level: z.ZodOptional<z.ZodEnum<["character", "syllable", "word", "phrase", "sentence", "paragraph"]>>;
    position: z.ZodOptional<z.ZodAny>;
} & {
    type: z.ZodLiteral<"GLOSTParagraphNode">;
    lang: z.ZodUnion<[z.ZodLiteral<"th">, z.ZodLiteral<"ja">, z.ZodLiteral<"zh">, z.ZodLiteral<"ko">, z.ZodLiteral<"en">, z.ZodString]>;
    script: z.ZodUnion<[z.ZodLiteral<"thai">, z.ZodLiteral<"hiragana">, z.ZodLiteral<"katakana">, z.ZodLiteral<"kanji">, z.ZodLiteral<"hanzi">, z.ZodLiteral<"hangul">, z.ZodLiteral<"latin">, z.ZodLiteral<"mixed">, z.ZodString]>;
    children: z.ZodDefault<z.ZodArray<z.ZodAny, "many">>;
}, "strip", z.ZodTypeAny, {
    type: "GLOSTParagraphNode";
    lang: string;
    children: any[];
    script: string;
    position?: any;
    level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
}, {
    type: "GLOSTParagraphNode";
    lang: string;
    script: string;
    children?: any[] | undefined;
    position?: any;
    level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
}>;
/**
 * GLOST root node schema
 */
export declare const GLOSTRootNodeSchema: z.ZodObject<{
    level: z.ZodOptional<z.ZodEnum<["character", "syllable", "word", "phrase", "sentence", "paragraph"]>>;
    position: z.ZodOptional<z.ZodAny>;
} & {
    type: z.ZodLiteral<"GLOSTRootNode">;
    lang: z.ZodUnion<[z.ZodLiteral<"th">, z.ZodLiteral<"ja">, z.ZodLiteral<"zh">, z.ZodLiteral<"ko">, z.ZodLiteral<"en">, z.ZodString]>;
    script: z.ZodUnion<[z.ZodLiteral<"thai">, z.ZodLiteral<"hiragana">, z.ZodLiteral<"katakana">, z.ZodLiteral<"kanji">, z.ZodLiteral<"hanzi">, z.ZodLiteral<"hangul">, z.ZodLiteral<"latin">, z.ZodLiteral<"mixed">, z.ZodString]>;
    metadata: z.ZodOptional<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        author: z.ZodOptional<z.ZodString>;
        date: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        date?: string | undefined;
        title?: string | undefined;
        author?: string | undefined;
        description?: string | undefined;
    }, {
        date?: string | undefined;
        title?: string | undefined;
        author?: string | undefined;
        description?: string | undefined;
    }>>;
    children: z.ZodDefault<z.ZodArray<z.ZodAny, "many">>;
}, "strip", z.ZodTypeAny, {
    type: "GLOSTRootNode";
    lang: string;
    children: any[];
    script: string;
    metadata?: {
        date?: string | undefined;
        title?: string | undefined;
        author?: string | undefined;
        description?: string | undefined;
    } | undefined;
    position?: any;
    level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
}, {
    type: "GLOSTRootNode";
    lang: string;
    script: string;
    children?: any[] | undefined;
    metadata?: {
        date?: string | undefined;
        title?: string | undefined;
        author?: string | undefined;
        description?: string | undefined;
    } | undefined;
    position?: any;
    level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
}>;
/**
 * Union schema for all GLOST node types
 */
export declare const GLOSTNodeSchema: z.ZodUnion<[z.ZodObject<{
    lang: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"th">, z.ZodLiteral<"ja">, z.ZodLiteral<"zh">, z.ZodLiteral<"ko">, z.ZodLiteral<"en">, z.ZodString]>>;
    script: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"thai">, z.ZodLiteral<"hiragana">, z.ZodLiteral<"katakana">, z.ZodLiteral<"kanji">, z.ZodLiteral<"hanzi">, z.ZodLiteral<"hangul">, z.ZodLiteral<"latin">, z.ZodLiteral<"mixed">, z.ZodString]>>;
    position: z.ZodOptional<z.ZodAny>;
} & {
    type: z.ZodLiteral<"GLOSTWordNode">;
    value: z.ZodString;
    transcription: z.ZodRecord<z.ZodString, z.ZodObject<{
        text: z.ZodString;
        system: z.ZodUnion<[z.ZodLiteral<"rtgs">, z.ZodLiteral<"aua">, z.ZodLiteral<"paiboon">, z.ZodLiteral<"romaji">, z.ZodLiteral<"furigana">, z.ZodLiteral<"ipa">, z.ZodLiteral<"pinyin">, z.ZodLiteral<"hangul">, z.ZodString]>;
        variants: z.ZodOptional<z.ZodArray<z.ZodObject<{
            text: z.ZodString;
            context: z.ZodEnum<["formal", "informal", "historical", "regional", "dialectal"]>;
            notes: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }, {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }>, "many">>;
        tone: z.ZodOptional<z.ZodNumber>;
        syllables: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        phonetic: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        text: string;
        system: string;
        tone?: number | undefined;
        variants?: {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }[] | undefined;
        syllables?: string[] | undefined;
        phonetic?: string | undefined;
    }, {
        text: string;
        system: string;
        tone?: number | undefined;
        variants?: {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }[] | undefined;
        syllables?: string[] | undefined;
        phonetic?: string | undefined;
    }>>;
    metadata: z.ZodObject<{
        /** @deprecated Use extras.translations instead */
        meaning: z.ZodOptional<z.ZodString>;
        partOfSpeech: z.ZodString;
        usage: z.ZodOptional<z.ZodString>;
        etymology: z.ZodOptional<z.ZodString>;
        examples: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        frequency: z.ZodOptional<z.ZodEnum<["high", "medium", "low"]>>;
        formality: z.ZodOptional<z.ZodEnum<["formal", "neutral", "informal"]>>;
        register: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        partOfSpeech: string;
        examples?: string[] | undefined;
        frequency?: "high" | "medium" | "low" | undefined;
        meaning?: string | undefined;
        usage?: string | undefined;
        etymology?: string | undefined;
        formality?: "neutral" | "formal" | "informal" | undefined;
        register?: string | undefined;
    }, {
        partOfSpeech: string;
        examples?: string[] | undefined;
        frequency?: "high" | "medium" | "low" | undefined;
        meaning?: string | undefined;
        usage?: string | undefined;
        etymology?: string | undefined;
        formality?: "neutral" | "formal" | "informal" | undefined;
        register?: string | undefined;
    }>;
    level: z.ZodEnum<["character", "syllable", "word", "phrase", "sentence", "paragraph"]>;
    children: z.ZodDefault<z.ZodArray<z.ZodAny, "many">>;
}, "strip", z.ZodTypeAny, {
    value: string;
    type: "GLOSTWordNode";
    children: any[];
    transcription: Record<string, {
        text: string;
        system: string;
        tone?: number | undefined;
        variants?: {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }[] | undefined;
        syllables?: string[] | undefined;
        phonetic?: string | undefined;
    }>;
    metadata: {
        partOfSpeech: string;
        examples?: string[] | undefined;
        frequency?: "high" | "medium" | "low" | undefined;
        meaning?: string | undefined;
        usage?: string | undefined;
        etymology?: string | undefined;
        formality?: "neutral" | "formal" | "informal" | undefined;
        register?: string | undefined;
    };
    level: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph";
    lang?: string | undefined;
    position?: any;
    script?: string | undefined;
}, {
    value: string;
    type: "GLOSTWordNode";
    transcription: Record<string, {
        text: string;
        system: string;
        tone?: number | undefined;
        variants?: {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }[] | undefined;
        syllables?: string[] | undefined;
        phonetic?: string | undefined;
    }>;
    metadata: {
        partOfSpeech: string;
        examples?: string[] | undefined;
        frequency?: "high" | "medium" | "low" | undefined;
        meaning?: string | undefined;
        usage?: string | undefined;
        etymology?: string | undefined;
        formality?: "neutral" | "formal" | "informal" | undefined;
        register?: string | undefined;
    };
    level: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph";
    lang?: string | undefined;
    children?: any[] | undefined;
    position?: any;
    script?: string | undefined;
}>, z.ZodObject<{
    level: z.ZodOptional<z.ZodEnum<["character", "syllable", "word", "phrase", "sentence", "paragraph"]>>;
    position: z.ZodOptional<z.ZodAny>;
} & {
    type: z.ZodLiteral<"GLOSTSentenceNode">;
    originalText: z.ZodString;
    lang: z.ZodUnion<[z.ZodLiteral<"th">, z.ZodLiteral<"ja">, z.ZodLiteral<"zh">, z.ZodLiteral<"ko">, z.ZodLiteral<"en">, z.ZodString]>;
    script: z.ZodUnion<[z.ZodLiteral<"thai">, z.ZodLiteral<"hiragana">, z.ZodLiteral<"katakana">, z.ZodLiteral<"kanji">, z.ZodLiteral<"hanzi">, z.ZodLiteral<"hangul">, z.ZodLiteral<"latin">, z.ZodLiteral<"mixed">, z.ZodString]>;
    transcription: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        text: z.ZodString;
        system: z.ZodUnion<[z.ZodLiteral<"rtgs">, z.ZodLiteral<"aua">, z.ZodLiteral<"paiboon">, z.ZodLiteral<"romaji">, z.ZodLiteral<"furigana">, z.ZodLiteral<"ipa">, z.ZodLiteral<"pinyin">, z.ZodLiteral<"hangul">, z.ZodString]>;
        variants: z.ZodOptional<z.ZodArray<z.ZodObject<{
            text: z.ZodString;
            context: z.ZodEnum<["formal", "informal", "historical", "regional", "dialectal"]>;
            notes: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }, {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }>, "many">>;
        tone: z.ZodOptional<z.ZodNumber>;
        syllables: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        phonetic: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        text: string;
        system: string;
        tone?: number | undefined;
        variants?: {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }[] | undefined;
        syllables?: string[] | undefined;
        phonetic?: string | undefined;
    }, {
        text: string;
        system: string;
        tone?: number | undefined;
        variants?: {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }[] | undefined;
        syllables?: string[] | undefined;
        phonetic?: string | undefined;
    }>>>;
    children: z.ZodDefault<z.ZodArray<z.ZodAny, "many">>;
}, "strip", z.ZodTypeAny, {
    type: "GLOSTSentenceNode";
    lang: string;
    children: any[];
    script: string;
    originalText: string;
    transcription?: Record<string, {
        text: string;
        system: string;
        tone?: number | undefined;
        variants?: {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }[] | undefined;
        syllables?: string[] | undefined;
        phonetic?: string | undefined;
    }> | undefined;
    position?: any;
    level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
}, {
    type: "GLOSTSentenceNode";
    lang: string;
    script: string;
    originalText: string;
    children?: any[] | undefined;
    transcription?: Record<string, {
        text: string;
        system: string;
        tone?: number | undefined;
        variants?: {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }[] | undefined;
        syllables?: string[] | undefined;
        phonetic?: string | undefined;
    }> | undefined;
    position?: any;
    level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
}>, z.ZodObject<{
    level: z.ZodOptional<z.ZodEnum<["character", "syllable", "word", "phrase", "sentence", "paragraph"]>>;
    position: z.ZodOptional<z.ZodAny>;
} & {
    type: z.ZodLiteral<"GLOSTParagraphNode">;
    lang: z.ZodUnion<[z.ZodLiteral<"th">, z.ZodLiteral<"ja">, z.ZodLiteral<"zh">, z.ZodLiteral<"ko">, z.ZodLiteral<"en">, z.ZodString]>;
    script: z.ZodUnion<[z.ZodLiteral<"thai">, z.ZodLiteral<"hiragana">, z.ZodLiteral<"katakana">, z.ZodLiteral<"kanji">, z.ZodLiteral<"hanzi">, z.ZodLiteral<"hangul">, z.ZodLiteral<"latin">, z.ZodLiteral<"mixed">, z.ZodString]>;
    children: z.ZodDefault<z.ZodArray<z.ZodAny, "many">>;
}, "strip", z.ZodTypeAny, {
    type: "GLOSTParagraphNode";
    lang: string;
    children: any[];
    script: string;
    position?: any;
    level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
}, {
    type: "GLOSTParagraphNode";
    lang: string;
    script: string;
    children?: any[] | undefined;
    position?: any;
    level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
}>, z.ZodObject<{
    level: z.ZodOptional<z.ZodEnum<["character", "syllable", "word", "phrase", "sentence", "paragraph"]>>;
    position: z.ZodOptional<z.ZodAny>;
} & {
    type: z.ZodLiteral<"GLOSTRootNode">;
    lang: z.ZodUnion<[z.ZodLiteral<"th">, z.ZodLiteral<"ja">, z.ZodLiteral<"zh">, z.ZodLiteral<"ko">, z.ZodLiteral<"en">, z.ZodString]>;
    script: z.ZodUnion<[z.ZodLiteral<"thai">, z.ZodLiteral<"hiragana">, z.ZodLiteral<"katakana">, z.ZodLiteral<"kanji">, z.ZodLiteral<"hanzi">, z.ZodLiteral<"hangul">, z.ZodLiteral<"latin">, z.ZodLiteral<"mixed">, z.ZodString]>;
    metadata: z.ZodOptional<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        author: z.ZodOptional<z.ZodString>;
        date: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        date?: string | undefined;
        title?: string | undefined;
        author?: string | undefined;
        description?: string | undefined;
    }, {
        date?: string | undefined;
        title?: string | undefined;
        author?: string | undefined;
        description?: string | undefined;
    }>>;
    children: z.ZodDefault<z.ZodArray<z.ZodAny, "many">>;
}, "strip", z.ZodTypeAny, {
    type: "GLOSTRootNode";
    lang: string;
    children: any[];
    script: string;
    metadata?: {
        date?: string | undefined;
        title?: string | undefined;
        author?: string | undefined;
        description?: string | undefined;
    } | undefined;
    position?: any;
    level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
}, {
    type: "GLOSTRootNode";
    lang: string;
    script: string;
    children?: any[] | undefined;
    metadata?: {
        date?: string | undefined;
        title?: string | undefined;
        author?: string | undefined;
        description?: string | undefined;
    } | undefined;
    position?: any;
    level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
}>]>;
/**
 * Validate an GLOST word node
 */
export declare function validateGLOSTWordNode(data: unknown): data is z.infer<typeof GLOSTWordNodeSchema>;
/**
 * Validate an GLOST sentence node
 */
export declare function validateGLOSTSentenceNode(data: unknown): data is z.infer<typeof GLOSTSentenceNodeSchema>;
/**
 * Validate an GLOST paragraph node
 */
export declare function validateGLOSTParagraphNode(data: unknown): data is z.infer<typeof GLOSTParagraphNodeSchema>;
/**
 * Validate an GLOST root node
 */
export declare function validateGLOSTRootNode(data: unknown): data is z.infer<typeof GLOSTRootNodeSchema>;
/**
 * Validate any GLOST node
 */
export declare function validateGLOSTNode(data: unknown): data is z.infer<typeof GLOSTNodeSchema>;
/**
 * Parse and validate GLOST data with error details
 */
export declare function parseGLOSTNode(data: unknown): z.SafeParseReturnType<{
    value: string;
    type: "GLOSTWordNode";
    transcription: Record<string, {
        text: string;
        system: string;
        tone?: number | undefined;
        variants?: {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }[] | undefined;
        syllables?: string[] | undefined;
        phonetic?: string | undefined;
    }>;
    metadata: {
        partOfSpeech: string;
        examples?: string[] | undefined;
        frequency?: "high" | "medium" | "low" | undefined;
        meaning?: string | undefined;
        usage?: string | undefined;
        etymology?: string | undefined;
        formality?: "neutral" | "formal" | "informal" | undefined;
        register?: string | undefined;
    };
    level: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph";
    lang?: string | undefined;
    children?: any[] | undefined;
    position?: any;
    script?: string | undefined;
} | {
    type: "GLOSTSentenceNode";
    lang: string;
    script: string;
    originalText: string;
    children?: any[] | undefined;
    transcription?: Record<string, {
        text: string;
        system: string;
        tone?: number | undefined;
        variants?: {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }[] | undefined;
        syllables?: string[] | undefined;
        phonetic?: string | undefined;
    }> | undefined;
    position?: any;
    level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
} | {
    type: "GLOSTParagraphNode";
    lang: string;
    script: string;
    children?: any[] | undefined;
    position?: any;
    level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
} | {
    type: "GLOSTRootNode";
    lang: string;
    script: string;
    children?: any[] | undefined;
    metadata?: {
        date?: string | undefined;
        title?: string | undefined;
        author?: string | undefined;
        description?: string | undefined;
    } | undefined;
    position?: any;
    level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
}, {
    value: string;
    type: "GLOSTWordNode";
    children: any[];
    transcription: Record<string, {
        text: string;
        system: string;
        tone?: number | undefined;
        variants?: {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }[] | undefined;
        syllables?: string[] | undefined;
        phonetic?: string | undefined;
    }>;
    metadata: {
        partOfSpeech: string;
        examples?: string[] | undefined;
        frequency?: "high" | "medium" | "low" | undefined;
        meaning?: string | undefined;
        usage?: string | undefined;
        etymology?: string | undefined;
        formality?: "neutral" | "formal" | "informal" | undefined;
        register?: string | undefined;
    };
    level: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph";
    lang?: string | undefined;
    position?: any;
    script?: string | undefined;
} | {
    type: "GLOSTSentenceNode";
    lang: string;
    children: any[];
    script: string;
    originalText: string;
    transcription?: Record<string, {
        text: string;
        system: string;
        tone?: number | undefined;
        variants?: {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }[] | undefined;
        syllables?: string[] | undefined;
        phonetic?: string | undefined;
    }> | undefined;
    position?: any;
    level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
} | {
    type: "GLOSTParagraphNode";
    lang: string;
    children: any[];
    script: string;
    position?: any;
    level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
} | {
    type: "GLOSTRootNode";
    lang: string;
    children: any[];
    script: string;
    metadata?: {
        date?: string | undefined;
        title?: string | undefined;
        author?: string | undefined;
        description?: string | undefined;
    } | undefined;
    position?: any;
    level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
}>;
/**
 * Parse and validate GLOST word node with error details
 */
export declare function parseGLOSTWordNode(data: unknown): z.SafeParseReturnType<{
    value: string;
    type: "GLOSTWordNode";
    transcription: Record<string, {
        text: string;
        system: string;
        tone?: number | undefined;
        variants?: {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }[] | undefined;
        syllables?: string[] | undefined;
        phonetic?: string | undefined;
    }>;
    metadata: {
        partOfSpeech: string;
        examples?: string[] | undefined;
        frequency?: "high" | "medium" | "low" | undefined;
        meaning?: string | undefined;
        usage?: string | undefined;
        etymology?: string | undefined;
        formality?: "neutral" | "formal" | "informal" | undefined;
        register?: string | undefined;
    };
    level: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph";
    lang?: string | undefined;
    children?: any[] | undefined;
    position?: any;
    script?: string | undefined;
}, {
    value: string;
    type: "GLOSTWordNode";
    children: any[];
    transcription: Record<string, {
        text: string;
        system: string;
        tone?: number | undefined;
        variants?: {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }[] | undefined;
        syllables?: string[] | undefined;
        phonetic?: string | undefined;
    }>;
    metadata: {
        partOfSpeech: string;
        examples?: string[] | undefined;
        frequency?: "high" | "medium" | "low" | undefined;
        meaning?: string | undefined;
        usage?: string | undefined;
        etymology?: string | undefined;
        formality?: "neutral" | "formal" | "informal" | undefined;
        register?: string | undefined;
    };
    level: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph";
    lang?: string | undefined;
    position?: any;
    script?: string | undefined;
}>;
/**
 * Parse and validate GLOST sentence node with error details
 */
export declare function parseGLOSTSentenceNode(data: unknown): z.SafeParseReturnType<{
    type: "GLOSTSentenceNode";
    lang: string;
    script: string;
    originalText: string;
    children?: any[] | undefined;
    transcription?: Record<string, {
        text: string;
        system: string;
        tone?: number | undefined;
        variants?: {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }[] | undefined;
        syllables?: string[] | undefined;
        phonetic?: string | undefined;
    }> | undefined;
    position?: any;
    level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
}, {
    type: "GLOSTSentenceNode";
    lang: string;
    children: any[];
    script: string;
    originalText: string;
    transcription?: Record<string, {
        text: string;
        system: string;
        tone?: number | undefined;
        variants?: {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }[] | undefined;
        syllables?: string[] | undefined;
        phonetic?: string | undefined;
    }> | undefined;
    position?: any;
    level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
}>;
/**
 * Parse and validate GLOST paragraph node with error details
 */
export declare function parseGLOSTParagraphNode(data: unknown): z.SafeParseReturnType<{
    type: "GLOSTParagraphNode";
    lang: string;
    script: string;
    children?: any[] | undefined;
    position?: any;
    level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
}, {
    type: "GLOSTParagraphNode";
    lang: string;
    children: any[];
    script: string;
    position?: any;
    level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
}>;
/**
 * Parse and validate GLOST root node with error details
 */
export declare function parseGLOSTRootNode(data: unknown): z.SafeParseReturnType<{
    type: "GLOSTRootNode";
    lang: string;
    script: string;
    children?: any[] | undefined;
    metadata?: {
        date?: string | undefined;
        title?: string | undefined;
        author?: string | undefined;
        description?: string | undefined;
    } | undefined;
    position?: any;
    level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
}, {
    type: "GLOSTRootNode";
    lang: string;
    children: any[];
    script: string;
    metadata?: {
        date?: string | undefined;
        title?: string | undefined;
        author?: string | undefined;
        description?: string | undefined;
    } | undefined;
    position?: any;
    level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
}>;
/**
 * Validate an entire GLOST tree/document
 */
export declare function validateGLOSTTree(data: unknown): string[];
export declare const schemas: {
    LinguisticLevel: z.ZodEnum<["character", "syllable", "word", "phrase", "sentence", "paragraph"]>;
    PronunciationContext: z.ZodEnum<["formal", "informal", "historical", "regional", "dialectal"]>;
    TranscriptionSystem: z.ZodUnion<[z.ZodLiteral<"rtgs">, z.ZodLiteral<"aua">, z.ZodLiteral<"paiboon">, z.ZodLiteral<"romaji">, z.ZodLiteral<"furigana">, z.ZodLiteral<"ipa">, z.ZodLiteral<"pinyin">, z.ZodLiteral<"hangul">, z.ZodString]>;
    LanguageCode: z.ZodUnion<[z.ZodLiteral<"th">, z.ZodLiteral<"ja">, z.ZodLiteral<"zh">, z.ZodLiteral<"ko">, z.ZodLiteral<"en">, z.ZodString]>;
    ScriptSystem: z.ZodUnion<[z.ZodLiteral<"thai">, z.ZodLiteral<"hiragana">, z.ZodLiteral<"katakana">, z.ZodLiteral<"kanji">, z.ZodLiteral<"hanzi">, z.ZodLiteral<"hangul">, z.ZodLiteral<"latin">, z.ZodLiteral<"mixed">, z.ZodString]>;
    PronunciationVariant: z.ZodObject<{
        text: z.ZodString;
        context: z.ZodEnum<["formal", "informal", "historical", "regional", "dialectal"]>;
        notes: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        text: string;
        context: "formal" | "informal" | "historical" | "regional" | "dialectal";
        notes?: string | undefined;
    }, {
        text: string;
        context: "formal" | "informal" | "historical" | "regional" | "dialectal";
        notes?: string | undefined;
    }>;
    TranscriptionInfo: z.ZodObject<{
        text: z.ZodString;
        system: z.ZodUnion<[z.ZodLiteral<"rtgs">, z.ZodLiteral<"aua">, z.ZodLiteral<"paiboon">, z.ZodLiteral<"romaji">, z.ZodLiteral<"furigana">, z.ZodLiteral<"ipa">, z.ZodLiteral<"pinyin">, z.ZodLiteral<"hangul">, z.ZodString]>;
        variants: z.ZodOptional<z.ZodArray<z.ZodObject<{
            text: z.ZodString;
            context: z.ZodEnum<["formal", "informal", "historical", "regional", "dialectal"]>;
            notes: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }, {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }>, "many">>;
        tone: z.ZodOptional<z.ZodNumber>;
        syllables: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        phonetic: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        text: string;
        system: string;
        tone?: number | undefined;
        variants?: {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }[] | undefined;
        syllables?: string[] | undefined;
        phonetic?: string | undefined;
    }, {
        text: string;
        system: string;
        tone?: number | undefined;
        variants?: {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }[] | undefined;
        syllables?: string[] | undefined;
        phonetic?: string | undefined;
    }>;
    TransliterationData: z.ZodRecord<z.ZodString, z.ZodObject<{
        text: z.ZodString;
        system: z.ZodUnion<[z.ZodLiteral<"rtgs">, z.ZodLiteral<"aua">, z.ZodLiteral<"paiboon">, z.ZodLiteral<"romaji">, z.ZodLiteral<"furigana">, z.ZodLiteral<"ipa">, z.ZodLiteral<"pinyin">, z.ZodLiteral<"hangul">, z.ZodString]>;
        variants: z.ZodOptional<z.ZodArray<z.ZodObject<{
            text: z.ZodString;
            context: z.ZodEnum<["formal", "informal", "historical", "regional", "dialectal"]>;
            notes: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }, {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }>, "many">>;
        tone: z.ZodOptional<z.ZodNumber>;
        syllables: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        phonetic: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        text: string;
        system: string;
        tone?: number | undefined;
        variants?: {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }[] | undefined;
        syllables?: string[] | undefined;
        phonetic?: string | undefined;
    }, {
        text: string;
        system: string;
        tone?: number | undefined;
        variants?: {
            text: string;
            context: "formal" | "informal" | "historical" | "regional" | "dialectal";
            notes?: string | undefined;
        }[] | undefined;
        syllables?: string[] | undefined;
        phonetic?: string | undefined;
    }>>;
    LinguisticMetadata: z.ZodObject<{
        /** @deprecated Use extras.translations instead */
        meaning: z.ZodOptional<z.ZodString>;
        partOfSpeech: z.ZodString;
        usage: z.ZodOptional<z.ZodString>;
        etymology: z.ZodOptional<z.ZodString>;
        examples: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        frequency: z.ZodOptional<z.ZodEnum<["high", "medium", "low"]>>;
        formality: z.ZodOptional<z.ZodEnum<["formal", "neutral", "informal"]>>;
        register: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        partOfSpeech: string;
        examples?: string[] | undefined;
        frequency?: "high" | "medium" | "low" | undefined;
        meaning?: string | undefined;
        usage?: string | undefined;
        etymology?: string | undefined;
        formality?: "neutral" | "formal" | "informal" | undefined;
        register?: string | undefined;
    }, {
        partOfSpeech: string;
        examples?: string[] | undefined;
        frequency?: "high" | "medium" | "low" | undefined;
        meaning?: string | undefined;
        usage?: string | undefined;
        etymology?: string | undefined;
        formality?: "neutral" | "formal" | "informal" | undefined;
        register?: string | undefined;
    }>;
    GLOSTNode: z.ZodUnion<[z.ZodObject<{
        lang: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"th">, z.ZodLiteral<"ja">, z.ZodLiteral<"zh">, z.ZodLiteral<"ko">, z.ZodLiteral<"en">, z.ZodString]>>;
        script: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"thai">, z.ZodLiteral<"hiragana">, z.ZodLiteral<"katakana">, z.ZodLiteral<"kanji">, z.ZodLiteral<"hanzi">, z.ZodLiteral<"hangul">, z.ZodLiteral<"latin">, z.ZodLiteral<"mixed">, z.ZodString]>>;
        position: z.ZodOptional<z.ZodAny>;
    } & {
        type: z.ZodLiteral<"GLOSTWordNode">;
        value: z.ZodString;
        transcription: z.ZodRecord<z.ZodString, z.ZodObject<{
            text: z.ZodString;
            system: z.ZodUnion<[z.ZodLiteral<"rtgs">, z.ZodLiteral<"aua">, z.ZodLiteral<"paiboon">, z.ZodLiteral<"romaji">, z.ZodLiteral<"furigana">, z.ZodLiteral<"ipa">, z.ZodLiteral<"pinyin">, z.ZodLiteral<"hangul">, z.ZodString]>;
            variants: z.ZodOptional<z.ZodArray<z.ZodObject<{
                text: z.ZodString;
                context: z.ZodEnum<["formal", "informal", "historical", "regional", "dialectal"]>;
                notes: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                text: string;
                context: "formal" | "informal" | "historical" | "regional" | "dialectal";
                notes?: string | undefined;
            }, {
                text: string;
                context: "formal" | "informal" | "historical" | "regional" | "dialectal";
                notes?: string | undefined;
            }>, "many">>;
            tone: z.ZodOptional<z.ZodNumber>;
            syllables: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            phonetic: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            text: string;
            system: string;
            tone?: number | undefined;
            variants?: {
                text: string;
                context: "formal" | "informal" | "historical" | "regional" | "dialectal";
                notes?: string | undefined;
            }[] | undefined;
            syllables?: string[] | undefined;
            phonetic?: string | undefined;
        }, {
            text: string;
            system: string;
            tone?: number | undefined;
            variants?: {
                text: string;
                context: "formal" | "informal" | "historical" | "regional" | "dialectal";
                notes?: string | undefined;
            }[] | undefined;
            syllables?: string[] | undefined;
            phonetic?: string | undefined;
        }>>;
        metadata: z.ZodObject<{
            /** @deprecated Use extras.translations instead */
            meaning: z.ZodOptional<z.ZodString>;
            partOfSpeech: z.ZodString;
            usage: z.ZodOptional<z.ZodString>;
            etymology: z.ZodOptional<z.ZodString>;
            examples: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            frequency: z.ZodOptional<z.ZodEnum<["high", "medium", "low"]>>;
            formality: z.ZodOptional<z.ZodEnum<["formal", "neutral", "informal"]>>;
            register: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            partOfSpeech: string;
            examples?: string[] | undefined;
            frequency?: "high" | "medium" | "low" | undefined;
            meaning?: string | undefined;
            usage?: string | undefined;
            etymology?: string | undefined;
            formality?: "neutral" | "formal" | "informal" | undefined;
            register?: string | undefined;
        }, {
            partOfSpeech: string;
            examples?: string[] | undefined;
            frequency?: "high" | "medium" | "low" | undefined;
            meaning?: string | undefined;
            usage?: string | undefined;
            etymology?: string | undefined;
            formality?: "neutral" | "formal" | "informal" | undefined;
            register?: string | undefined;
        }>;
        level: z.ZodEnum<["character", "syllable", "word", "phrase", "sentence", "paragraph"]>;
        children: z.ZodDefault<z.ZodArray<z.ZodAny, "many">>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: "GLOSTWordNode";
        children: any[];
        transcription: Record<string, {
            text: string;
            system: string;
            tone?: number | undefined;
            variants?: {
                text: string;
                context: "formal" | "informal" | "historical" | "regional" | "dialectal";
                notes?: string | undefined;
            }[] | undefined;
            syllables?: string[] | undefined;
            phonetic?: string | undefined;
        }>;
        metadata: {
            partOfSpeech: string;
            examples?: string[] | undefined;
            frequency?: "high" | "medium" | "low" | undefined;
            meaning?: string | undefined;
            usage?: string | undefined;
            etymology?: string | undefined;
            formality?: "neutral" | "formal" | "informal" | undefined;
            register?: string | undefined;
        };
        level: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph";
        lang?: string | undefined;
        position?: any;
        script?: string | undefined;
    }, {
        value: string;
        type: "GLOSTWordNode";
        transcription: Record<string, {
            text: string;
            system: string;
            tone?: number | undefined;
            variants?: {
                text: string;
                context: "formal" | "informal" | "historical" | "regional" | "dialectal";
                notes?: string | undefined;
            }[] | undefined;
            syllables?: string[] | undefined;
            phonetic?: string | undefined;
        }>;
        metadata: {
            partOfSpeech: string;
            examples?: string[] | undefined;
            frequency?: "high" | "medium" | "low" | undefined;
            meaning?: string | undefined;
            usage?: string | undefined;
            etymology?: string | undefined;
            formality?: "neutral" | "formal" | "informal" | undefined;
            register?: string | undefined;
        };
        level: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph";
        lang?: string | undefined;
        children?: any[] | undefined;
        position?: any;
        script?: string | undefined;
    }>, z.ZodObject<{
        level: z.ZodOptional<z.ZodEnum<["character", "syllable", "word", "phrase", "sentence", "paragraph"]>>;
        position: z.ZodOptional<z.ZodAny>;
    } & {
        type: z.ZodLiteral<"GLOSTSentenceNode">;
        originalText: z.ZodString;
        lang: z.ZodUnion<[z.ZodLiteral<"th">, z.ZodLiteral<"ja">, z.ZodLiteral<"zh">, z.ZodLiteral<"ko">, z.ZodLiteral<"en">, z.ZodString]>;
        script: z.ZodUnion<[z.ZodLiteral<"thai">, z.ZodLiteral<"hiragana">, z.ZodLiteral<"katakana">, z.ZodLiteral<"kanji">, z.ZodLiteral<"hanzi">, z.ZodLiteral<"hangul">, z.ZodLiteral<"latin">, z.ZodLiteral<"mixed">, z.ZodString]>;
        transcription: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            text: z.ZodString;
            system: z.ZodUnion<[z.ZodLiteral<"rtgs">, z.ZodLiteral<"aua">, z.ZodLiteral<"paiboon">, z.ZodLiteral<"romaji">, z.ZodLiteral<"furigana">, z.ZodLiteral<"ipa">, z.ZodLiteral<"pinyin">, z.ZodLiteral<"hangul">, z.ZodString]>;
            variants: z.ZodOptional<z.ZodArray<z.ZodObject<{
                text: z.ZodString;
                context: z.ZodEnum<["formal", "informal", "historical", "regional", "dialectal"]>;
                notes: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                text: string;
                context: "formal" | "informal" | "historical" | "regional" | "dialectal";
                notes?: string | undefined;
            }, {
                text: string;
                context: "formal" | "informal" | "historical" | "regional" | "dialectal";
                notes?: string | undefined;
            }>, "many">>;
            tone: z.ZodOptional<z.ZodNumber>;
            syllables: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            phonetic: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            text: string;
            system: string;
            tone?: number | undefined;
            variants?: {
                text: string;
                context: "formal" | "informal" | "historical" | "regional" | "dialectal";
                notes?: string | undefined;
            }[] | undefined;
            syllables?: string[] | undefined;
            phonetic?: string | undefined;
        }, {
            text: string;
            system: string;
            tone?: number | undefined;
            variants?: {
                text: string;
                context: "formal" | "informal" | "historical" | "regional" | "dialectal";
                notes?: string | undefined;
            }[] | undefined;
            syllables?: string[] | undefined;
            phonetic?: string | undefined;
        }>>>;
        children: z.ZodDefault<z.ZodArray<z.ZodAny, "many">>;
    }, "strip", z.ZodTypeAny, {
        type: "GLOSTSentenceNode";
        lang: string;
        children: any[];
        script: string;
        originalText: string;
        transcription?: Record<string, {
            text: string;
            system: string;
            tone?: number | undefined;
            variants?: {
                text: string;
                context: "formal" | "informal" | "historical" | "regional" | "dialectal";
                notes?: string | undefined;
            }[] | undefined;
            syllables?: string[] | undefined;
            phonetic?: string | undefined;
        }> | undefined;
        position?: any;
        level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
    }, {
        type: "GLOSTSentenceNode";
        lang: string;
        script: string;
        originalText: string;
        children?: any[] | undefined;
        transcription?: Record<string, {
            text: string;
            system: string;
            tone?: number | undefined;
            variants?: {
                text: string;
                context: "formal" | "informal" | "historical" | "regional" | "dialectal";
                notes?: string | undefined;
            }[] | undefined;
            syllables?: string[] | undefined;
            phonetic?: string | undefined;
        }> | undefined;
        position?: any;
        level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
    }>, z.ZodObject<{
        level: z.ZodOptional<z.ZodEnum<["character", "syllable", "word", "phrase", "sentence", "paragraph"]>>;
        position: z.ZodOptional<z.ZodAny>;
    } & {
        type: z.ZodLiteral<"GLOSTParagraphNode">;
        lang: z.ZodUnion<[z.ZodLiteral<"th">, z.ZodLiteral<"ja">, z.ZodLiteral<"zh">, z.ZodLiteral<"ko">, z.ZodLiteral<"en">, z.ZodString]>;
        script: z.ZodUnion<[z.ZodLiteral<"thai">, z.ZodLiteral<"hiragana">, z.ZodLiteral<"katakana">, z.ZodLiteral<"kanji">, z.ZodLiteral<"hanzi">, z.ZodLiteral<"hangul">, z.ZodLiteral<"latin">, z.ZodLiteral<"mixed">, z.ZodString]>;
        children: z.ZodDefault<z.ZodArray<z.ZodAny, "many">>;
    }, "strip", z.ZodTypeAny, {
        type: "GLOSTParagraphNode";
        lang: string;
        children: any[];
        script: string;
        position?: any;
        level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
    }, {
        type: "GLOSTParagraphNode";
        lang: string;
        script: string;
        children?: any[] | undefined;
        position?: any;
        level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
    }>, z.ZodObject<{
        level: z.ZodOptional<z.ZodEnum<["character", "syllable", "word", "phrase", "sentence", "paragraph"]>>;
        position: z.ZodOptional<z.ZodAny>;
    } & {
        type: z.ZodLiteral<"GLOSTRootNode">;
        lang: z.ZodUnion<[z.ZodLiteral<"th">, z.ZodLiteral<"ja">, z.ZodLiteral<"zh">, z.ZodLiteral<"ko">, z.ZodLiteral<"en">, z.ZodString]>;
        script: z.ZodUnion<[z.ZodLiteral<"thai">, z.ZodLiteral<"hiragana">, z.ZodLiteral<"katakana">, z.ZodLiteral<"kanji">, z.ZodLiteral<"hanzi">, z.ZodLiteral<"hangul">, z.ZodLiteral<"latin">, z.ZodLiteral<"mixed">, z.ZodString]>;
        metadata: z.ZodOptional<z.ZodObject<{
            title: z.ZodOptional<z.ZodString>;
            author: z.ZodOptional<z.ZodString>;
            date: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            date?: string | undefined;
            title?: string | undefined;
            author?: string | undefined;
            description?: string | undefined;
        }, {
            date?: string | undefined;
            title?: string | undefined;
            author?: string | undefined;
            description?: string | undefined;
        }>>;
        children: z.ZodDefault<z.ZodArray<z.ZodAny, "many">>;
    }, "strip", z.ZodTypeAny, {
        type: "GLOSTRootNode";
        lang: string;
        children: any[];
        script: string;
        metadata?: {
            date?: string | undefined;
            title?: string | undefined;
            author?: string | undefined;
            description?: string | undefined;
        } | undefined;
        position?: any;
        level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
    }, {
        type: "GLOSTRootNode";
        lang: string;
        script: string;
        children?: any[] | undefined;
        metadata?: {
            date?: string | undefined;
            title?: string | undefined;
            author?: string | undefined;
            description?: string | undefined;
        } | undefined;
        position?: any;
        level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
    }>]>;
    GLOSTWordNode: z.ZodObject<{
        lang: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"th">, z.ZodLiteral<"ja">, z.ZodLiteral<"zh">, z.ZodLiteral<"ko">, z.ZodLiteral<"en">, z.ZodString]>>;
        script: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"thai">, z.ZodLiteral<"hiragana">, z.ZodLiteral<"katakana">, z.ZodLiteral<"kanji">, z.ZodLiteral<"hanzi">, z.ZodLiteral<"hangul">, z.ZodLiteral<"latin">, z.ZodLiteral<"mixed">, z.ZodString]>>;
        position: z.ZodOptional<z.ZodAny>;
    } & {
        type: z.ZodLiteral<"GLOSTWordNode">;
        value: z.ZodString;
        transcription: z.ZodRecord<z.ZodString, z.ZodObject<{
            text: z.ZodString;
            system: z.ZodUnion<[z.ZodLiteral<"rtgs">, z.ZodLiteral<"aua">, z.ZodLiteral<"paiboon">, z.ZodLiteral<"romaji">, z.ZodLiteral<"furigana">, z.ZodLiteral<"ipa">, z.ZodLiteral<"pinyin">, z.ZodLiteral<"hangul">, z.ZodString]>;
            variants: z.ZodOptional<z.ZodArray<z.ZodObject<{
                text: z.ZodString;
                context: z.ZodEnum<["formal", "informal", "historical", "regional", "dialectal"]>;
                notes: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                text: string;
                context: "formal" | "informal" | "historical" | "regional" | "dialectal";
                notes?: string | undefined;
            }, {
                text: string;
                context: "formal" | "informal" | "historical" | "regional" | "dialectal";
                notes?: string | undefined;
            }>, "many">>;
            tone: z.ZodOptional<z.ZodNumber>;
            syllables: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            phonetic: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            text: string;
            system: string;
            tone?: number | undefined;
            variants?: {
                text: string;
                context: "formal" | "informal" | "historical" | "regional" | "dialectal";
                notes?: string | undefined;
            }[] | undefined;
            syllables?: string[] | undefined;
            phonetic?: string | undefined;
        }, {
            text: string;
            system: string;
            tone?: number | undefined;
            variants?: {
                text: string;
                context: "formal" | "informal" | "historical" | "regional" | "dialectal";
                notes?: string | undefined;
            }[] | undefined;
            syllables?: string[] | undefined;
            phonetic?: string | undefined;
        }>>;
        metadata: z.ZodObject<{
            /** @deprecated Use extras.translations instead */
            meaning: z.ZodOptional<z.ZodString>;
            partOfSpeech: z.ZodString;
            usage: z.ZodOptional<z.ZodString>;
            etymology: z.ZodOptional<z.ZodString>;
            examples: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            frequency: z.ZodOptional<z.ZodEnum<["high", "medium", "low"]>>;
            formality: z.ZodOptional<z.ZodEnum<["formal", "neutral", "informal"]>>;
            register: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            partOfSpeech: string;
            examples?: string[] | undefined;
            frequency?: "high" | "medium" | "low" | undefined;
            meaning?: string | undefined;
            usage?: string | undefined;
            etymology?: string | undefined;
            formality?: "neutral" | "formal" | "informal" | undefined;
            register?: string | undefined;
        }, {
            partOfSpeech: string;
            examples?: string[] | undefined;
            frequency?: "high" | "medium" | "low" | undefined;
            meaning?: string | undefined;
            usage?: string | undefined;
            etymology?: string | undefined;
            formality?: "neutral" | "formal" | "informal" | undefined;
            register?: string | undefined;
        }>;
        level: z.ZodEnum<["character", "syllable", "word", "phrase", "sentence", "paragraph"]>;
        children: z.ZodDefault<z.ZodArray<z.ZodAny, "many">>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: "GLOSTWordNode";
        children: any[];
        transcription: Record<string, {
            text: string;
            system: string;
            tone?: number | undefined;
            variants?: {
                text: string;
                context: "formal" | "informal" | "historical" | "regional" | "dialectal";
                notes?: string | undefined;
            }[] | undefined;
            syllables?: string[] | undefined;
            phonetic?: string | undefined;
        }>;
        metadata: {
            partOfSpeech: string;
            examples?: string[] | undefined;
            frequency?: "high" | "medium" | "low" | undefined;
            meaning?: string | undefined;
            usage?: string | undefined;
            etymology?: string | undefined;
            formality?: "neutral" | "formal" | "informal" | undefined;
            register?: string | undefined;
        };
        level: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph";
        lang?: string | undefined;
        position?: any;
        script?: string | undefined;
    }, {
        value: string;
        type: "GLOSTWordNode";
        transcription: Record<string, {
            text: string;
            system: string;
            tone?: number | undefined;
            variants?: {
                text: string;
                context: "formal" | "informal" | "historical" | "regional" | "dialectal";
                notes?: string | undefined;
            }[] | undefined;
            syllables?: string[] | undefined;
            phonetic?: string | undefined;
        }>;
        metadata: {
            partOfSpeech: string;
            examples?: string[] | undefined;
            frequency?: "high" | "medium" | "low" | undefined;
            meaning?: string | undefined;
            usage?: string | undefined;
            etymology?: string | undefined;
            formality?: "neutral" | "formal" | "informal" | undefined;
            register?: string | undefined;
        };
        level: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph";
        lang?: string | undefined;
        children?: any[] | undefined;
        position?: any;
        script?: string | undefined;
    }>;
    GLOSTSentenceNode: z.ZodObject<{
        level: z.ZodOptional<z.ZodEnum<["character", "syllable", "word", "phrase", "sentence", "paragraph"]>>;
        position: z.ZodOptional<z.ZodAny>;
    } & {
        type: z.ZodLiteral<"GLOSTSentenceNode">;
        originalText: z.ZodString;
        lang: z.ZodUnion<[z.ZodLiteral<"th">, z.ZodLiteral<"ja">, z.ZodLiteral<"zh">, z.ZodLiteral<"ko">, z.ZodLiteral<"en">, z.ZodString]>;
        script: z.ZodUnion<[z.ZodLiteral<"thai">, z.ZodLiteral<"hiragana">, z.ZodLiteral<"katakana">, z.ZodLiteral<"kanji">, z.ZodLiteral<"hanzi">, z.ZodLiteral<"hangul">, z.ZodLiteral<"latin">, z.ZodLiteral<"mixed">, z.ZodString]>;
        transcription: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            text: z.ZodString;
            system: z.ZodUnion<[z.ZodLiteral<"rtgs">, z.ZodLiteral<"aua">, z.ZodLiteral<"paiboon">, z.ZodLiteral<"romaji">, z.ZodLiteral<"furigana">, z.ZodLiteral<"ipa">, z.ZodLiteral<"pinyin">, z.ZodLiteral<"hangul">, z.ZodString]>;
            variants: z.ZodOptional<z.ZodArray<z.ZodObject<{
                text: z.ZodString;
                context: z.ZodEnum<["formal", "informal", "historical", "regional", "dialectal"]>;
                notes: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                text: string;
                context: "formal" | "informal" | "historical" | "regional" | "dialectal";
                notes?: string | undefined;
            }, {
                text: string;
                context: "formal" | "informal" | "historical" | "regional" | "dialectal";
                notes?: string | undefined;
            }>, "many">>;
            tone: z.ZodOptional<z.ZodNumber>;
            syllables: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            phonetic: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            text: string;
            system: string;
            tone?: number | undefined;
            variants?: {
                text: string;
                context: "formal" | "informal" | "historical" | "regional" | "dialectal";
                notes?: string | undefined;
            }[] | undefined;
            syllables?: string[] | undefined;
            phonetic?: string | undefined;
        }, {
            text: string;
            system: string;
            tone?: number | undefined;
            variants?: {
                text: string;
                context: "formal" | "informal" | "historical" | "regional" | "dialectal";
                notes?: string | undefined;
            }[] | undefined;
            syllables?: string[] | undefined;
            phonetic?: string | undefined;
        }>>>;
        children: z.ZodDefault<z.ZodArray<z.ZodAny, "many">>;
    }, "strip", z.ZodTypeAny, {
        type: "GLOSTSentenceNode";
        lang: string;
        children: any[];
        script: string;
        originalText: string;
        transcription?: Record<string, {
            text: string;
            system: string;
            tone?: number | undefined;
            variants?: {
                text: string;
                context: "formal" | "informal" | "historical" | "regional" | "dialectal";
                notes?: string | undefined;
            }[] | undefined;
            syllables?: string[] | undefined;
            phonetic?: string | undefined;
        }> | undefined;
        position?: any;
        level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
    }, {
        type: "GLOSTSentenceNode";
        lang: string;
        script: string;
        originalText: string;
        children?: any[] | undefined;
        transcription?: Record<string, {
            text: string;
            system: string;
            tone?: number | undefined;
            variants?: {
                text: string;
                context: "formal" | "informal" | "historical" | "regional" | "dialectal";
                notes?: string | undefined;
            }[] | undefined;
            syllables?: string[] | undefined;
            phonetic?: string | undefined;
        }> | undefined;
        position?: any;
        level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
    }>;
    GLOSTParagraphNode: z.ZodObject<{
        level: z.ZodOptional<z.ZodEnum<["character", "syllable", "word", "phrase", "sentence", "paragraph"]>>;
        position: z.ZodOptional<z.ZodAny>;
    } & {
        type: z.ZodLiteral<"GLOSTParagraphNode">;
        lang: z.ZodUnion<[z.ZodLiteral<"th">, z.ZodLiteral<"ja">, z.ZodLiteral<"zh">, z.ZodLiteral<"ko">, z.ZodLiteral<"en">, z.ZodString]>;
        script: z.ZodUnion<[z.ZodLiteral<"thai">, z.ZodLiteral<"hiragana">, z.ZodLiteral<"katakana">, z.ZodLiteral<"kanji">, z.ZodLiteral<"hanzi">, z.ZodLiteral<"hangul">, z.ZodLiteral<"latin">, z.ZodLiteral<"mixed">, z.ZodString]>;
        children: z.ZodDefault<z.ZodArray<z.ZodAny, "many">>;
    }, "strip", z.ZodTypeAny, {
        type: "GLOSTParagraphNode";
        lang: string;
        children: any[];
        script: string;
        position?: any;
        level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
    }, {
        type: "GLOSTParagraphNode";
        lang: string;
        script: string;
        children?: any[] | undefined;
        position?: any;
        level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
    }>;
    GLOSTRootNode: z.ZodObject<{
        level: z.ZodOptional<z.ZodEnum<["character", "syllable", "word", "phrase", "sentence", "paragraph"]>>;
        position: z.ZodOptional<z.ZodAny>;
    } & {
        type: z.ZodLiteral<"GLOSTRootNode">;
        lang: z.ZodUnion<[z.ZodLiteral<"th">, z.ZodLiteral<"ja">, z.ZodLiteral<"zh">, z.ZodLiteral<"ko">, z.ZodLiteral<"en">, z.ZodString]>;
        script: z.ZodUnion<[z.ZodLiteral<"thai">, z.ZodLiteral<"hiragana">, z.ZodLiteral<"katakana">, z.ZodLiteral<"kanji">, z.ZodLiteral<"hanzi">, z.ZodLiteral<"hangul">, z.ZodLiteral<"latin">, z.ZodLiteral<"mixed">, z.ZodString]>;
        metadata: z.ZodOptional<z.ZodObject<{
            title: z.ZodOptional<z.ZodString>;
            author: z.ZodOptional<z.ZodString>;
            date: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            date?: string | undefined;
            title?: string | undefined;
            author?: string | undefined;
            description?: string | undefined;
        }, {
            date?: string | undefined;
            title?: string | undefined;
            author?: string | undefined;
            description?: string | undefined;
        }>>;
        children: z.ZodDefault<z.ZodArray<z.ZodAny, "many">>;
    }, "strip", z.ZodTypeAny, {
        type: "GLOSTRootNode";
        lang: string;
        children: any[];
        script: string;
        metadata?: {
            date?: string | undefined;
            title?: string | undefined;
            author?: string | undefined;
            description?: string | undefined;
        } | undefined;
        position?: any;
        level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
    }, {
        type: "GLOSTRootNode";
        lang: string;
        script: string;
        children?: any[] | undefined;
        metadata?: {
            date?: string | undefined;
            title?: string | undefined;
            author?: string | undefined;
            description?: string | undefined;
        } | undefined;
        position?: any;
        level?: "phrase" | "word" | "sentence" | "character" | "syllable" | "paragraph" | undefined;
    }>;
};
//# sourceMappingURL=validators.d.ts.map