/**
 * Framework-Agnostic Text-to-GLOST Converter
 *
 * Provides utilities for converting text (plain strings or RubySegment arrays)
 * into GLOST documents using pluggable language strategies and transcription providers.
 * This ensures consistent GLOST creation across the codebase while remaining framework-agnostic.
 */
import { isRubySegment } from "./script-conversion.js";
import { createGLOSTWordNode, createGLOSTSentenceNode, createGLOSTParagraphNode, createGLOSTRootNode, } from "glost/nodes";
/**
 * Segment text by gender terms using language strategy
 */
function segmentTextByGenderTerms(text, languageStrategy) {
    const genderTerms = languageStrategy.getGenderTerms();
    const male = genderTerms.male;
    const female = genderTerms.female;
    // If no gender terms, return the whole text as a single segment
    if (male.length === 0 && female.length === 0) {
        return [{ text }];
    }
    const parts = [];
    let lastIndex = 0;
    const allTerms = [...male, ...female];
    if (allTerms.length === 0) {
        return [{ text }];
    }
    const pattern = new RegExp(`(${allTerms.join("|")})`, "g");
    let match;
    while ((match = pattern.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push({ text: text.slice(lastIndex, match.index) });
        }
        const term = match[1];
        if (!term)
            continue;
        const gender = male.includes(term) ? "male" : "female";
        parts.push({ text: term, gender });
        lastIndex = pattern.lastIndex;
    }
    if (lastIndex < text.length) {
        parts.push({ text: text.slice(lastIndex) });
    }
    return parts;
}
/**
 * Detect gender in text using language strategy
 */
function detectGenderInText(text, languageStrategy) {
    const genderTerms = languageStrategy.getGenderTerms();
    const male = genderTerms.male;
    const female = genderTerms.female;
    if (male.includes(text))
        return "male";
    if (female.includes(text))
        return "female";
    return undefined;
}
/**
 * Get transcription for text using transcription provider
 */
function getTranscriptionFromProvider(text, transcriptionProvider, transcriptionScheme) {
    const scheme = transcriptionScheme ?? transcriptionProvider.getDefaultScheme();
    return transcriptionProvider.getTranscription(text, scheme);
}
/**
 * Create an GLOST word from a text segment
 */
function createWordFromSegment(text, ruby, language, languageStrategy, transcriptionProvider, transcriptionScheme, gender, genderFilter, fetchTranscription) {
    // Detect gender if not provided
    if (!gender) {
        gender = detectGenderInText(text, languageStrategy);
    }
    // Apply gender filter
    if (genderFilter && gender && gender !== genderFilter) {
        gender = undefined;
    }
    // Build transcription data
    let transcription = {};
    if (ruby && transcriptionScheme) {
        // Use provided ruby transcription
        transcription = {
            [transcriptionScheme]: {
                text: ruby,
            },
        };
    }
    else if (fetchTranscription && transcriptionScheme && transcriptionProvider) {
        // Try to fetch transcription from provider
        const providerTranscription = getTranscriptionFromProvider(text, transcriptionProvider, transcriptionScheme);
        if (providerTranscription) {
            transcription = {
                [transcriptionScheme]: {
                    text: providerTranscription,
                },
            };
        }
    }
    // Get script system from language strategy
    const scriptSystem = languageStrategy.getScriptForLanguage(language);
    // Create word node
    const wordNode = createGLOSTWordNode({
        value: text,
        transcription,
        metadata: { partOfSpeech: "" }, // Placeholder metadata
        lang: language,
        script: scriptSystem,
    });
    // Add gender to extras if present
    if (gender) {
        wordNode.extras = {
            ...wordNode.extras,
            gender,
        };
    }
    return wordNode;
}
/**
 * Convert text (string or RubySegment array) to GLOST document
 *
 * This is the main standardized converter that:
 * - Uses language strategy for script detection and gender terms
 * - Uses transcription providers for fetching transcription data
 * - Uses standardized GLOST node creation utilities
 * - Handles both plain strings and RubySegment arrays
 * - Supports gender filtering
 */
export function convertTextToGLOST(script, options) {
    const { language, languageStrategy, transcriptionProvider, transcriptionScheme, genderFilter, fetchTranscription = false, } = options;
    const langCode = language;
    const scriptSystem = languageStrategy.getScriptForLanguage(language);
    const words = [];
    const segments = Array.isArray(script) ? script : [script];
    segments.forEach((segment) => {
        if (isRubySegment(segment)) {
            // For RubySegment, check if base text contains gender terms
            // If it does, we need to split it (but this is complex with ruby)
            // For now, treat RubySegment as a single word
            const gender = detectGenderInText(segment.base, languageStrategy);
            words.push(createWordFromSegment(segment.base, segment.ruby, language, languageStrategy, transcriptionProvider, transcriptionScheme, gender, genderFilter, fetchTranscription));
        }
        else {
            // Split string segment by gender terms
            const parts = segmentTextByGenderTerms(segment, languageStrategy);
            parts.forEach((part) => {
                words.push(createWordFromSegment(part.text, undefined, language, languageStrategy, transcriptionProvider, transcriptionScheme, part.gender, genderFilter, fetchTranscription));
            });
        }
    });
    // Construct the GLOST tree using standardized utilities
    const originalText = Array.isArray(script)
        ? script.map((s) => (isRubySegment(s) ? s.base : s)).join("")
        : script;
    const sentence = createGLOSTSentenceNode({
        originalText,
        lang: langCode,
        script: scriptSystem,
        children: words,
    });
    const paragraph = createGLOSTParagraphNode([sentence]);
    const root = createGLOSTRootNode({
        lang: langCode,
        script: scriptSystem,
        children: [paragraph],
    });
    return root;
}
//# sourceMappingURL=text-to-glost.js.map