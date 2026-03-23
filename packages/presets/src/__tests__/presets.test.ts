/**
 * Tests for GLOST presets
 */

import { describe, it, expect } from "vitest";
import {
  minimalPreset,
  createMinimalPreset,
  languageLearningPreset,
  createLanguageLearningPreset,
  readingAppPreset,
  createReadingAppPreset,
  vocabularyBuilderPreset,
  createVocabularyBuilderPreset,
  grammarAnalyzerPreset,
  createGrammarAnalyzerPreset,
} from "../index.js";
import type { Preset } from "glost-processor";

describe("GLOST Presets", () => {
  describe("minimalPreset", () => {
    it("should have correct structure", () => {
      expect(minimalPreset.id).toBe("minimal");
      expect(minimalPreset.name).toBe("Minimal");
      expect(minimalPreset.description).toContain("essentials");
      expect(minimalPreset.plugins).toBeDefined();
    });

    it("should include transcription and translation plugins", () => {
      expect(minimalPreset.plugins).toHaveLength(2);
      expect(minimalPreset.plugins[0]).toEqual([
        "transcription",
        { scheme: "auto" },
      ]);
      expect(minimalPreset.plugins[1]).toEqual([
        "translation",
        { target: "en" },
      ]);
    });
  });

  describe("createMinimalPreset", () => {
    it("should create preset with default options", () => {
      const preset = createMinimalPreset();

      expect(preset.id).toBe("minimal-custom");
      expect(preset.plugins).toHaveLength(2);
      expect(preset.plugins[0]).toEqual([
        "transcription",
        { scheme: "auto" },
      ]);
    });

    it("should accept custom transcription scheme", () => {
      const preset = createMinimalPreset({
        transcriptionScheme: "ipa",
      });

      expect(preset.plugins[0]).toEqual([
        "transcription",
        { scheme: "ipa" },
      ]);
    });

    it("should accept custom translation target", () => {
      const preset = createMinimalPreset({
        translationTarget: "es",
      });

      expect(preset.plugins[1]).toEqual([
        "translation",
        { target: "es" },
      ]);
    });

    it("should accept both custom options", () => {
      const preset = createMinimalPreset({
        transcriptionScheme: "romaji",
        translationTarget: "fr",
      });

      expect(preset.plugins[0]).toEqual([
        "transcription",
        { scheme: "romaji" },
      ]);
      expect(preset.plugins[1]).toEqual([
        "translation",
        { target: "fr" },
      ]);
    });
  });

  describe("languageLearningPreset", () => {
    it("should have correct structure", () => {
      expect(languageLearningPreset.id).toBe("language-learning");
      expect(languageLearningPreset.name).toBe("Language Learning");
      expect(languageLearningPreset.description).toContain(
        "language learning"
      );
    });

    it("should include all learning features", () => {
      expect(languageLearningPreset.plugins).toHaveLength(5);
      expect(languageLearningPreset.plugins).toContainEqual([
        "transcription",
        { scheme: "auto" },
      ]);
      expect(languageLearningPreset.plugins).toContainEqual([
        "translation",
        { target: "en" },
      ]);
      expect(languageLearningPreset.plugins).toContain("frequency");
      expect(languageLearningPreset.plugins).toContain("difficulty");
      expect(languageLearningPreset.plugins).toContain("pos");
    });
  });

  describe("createLanguageLearningPreset", () => {
    it("should create preset with all features by default", () => {
      const preset = createLanguageLearningPreset();

      expect(preset.plugins).toHaveLength(5);
      expect(preset.plugins).toContain("frequency");
      expect(preset.plugins).toContain("difficulty");
      expect(preset.plugins).toContain("pos");
    });

    it("should exclude frequency when disabled", () => {
      const preset = createLanguageLearningPreset({
        includeFrequency: false,
      });

      expect(preset.plugins).not.toContain("frequency");
      expect(preset.plugins).toContain("difficulty");
      expect(preset.plugins).toContain("pos");
    });

    it("should exclude difficulty when disabled", () => {
      const preset = createLanguageLearningPreset({
        includeDifficulty: false,
      });

      expect(preset.plugins).toContain("frequency");
      expect(preset.plugins).not.toContain("difficulty");
      expect(preset.plugins).toContain("pos");
    });

    it("should exclude POS when disabled", () => {
      const preset = createLanguageLearningPreset({
        includePos: false,
      });

      expect(preset.plugins).toContain("frequency");
      expect(preset.plugins).toContain("difficulty");
      expect(preset.plugins).not.toContain("pos");
    });

    it("should allow custom transcription and translation", () => {
      const preset = createLanguageLearningPreset({
        transcriptionScheme: "ipa",
        translationTarget: "es",
      });

      expect(preset.plugins[0]).toEqual([
        "transcription",
        { scheme: "ipa" },
      ]);
      expect(preset.plugins[1]).toEqual([
        "translation",
        { target: "es" },
      ]);
    });

    it("should create minimal preset when all features disabled", () => {
      const preset = createLanguageLearningPreset({
        includeFrequency: false,
        includeDifficulty: false,
        includePos: false,
      });

      expect(preset.plugins).toHaveLength(2);
      expect(preset.plugins[0]).toEqual([
        "transcription",
        { scheme: "auto" },
      ]);
      expect(preset.plugins[1]).toEqual([
        "translation",
        { target: "en" },
      ]);
    });
  });

  describe("readingAppPreset", () => {
    it("should have correct structure", () => {
      expect(readingAppPreset.id).toBe("reading-app");
      expect(readingAppPreset.name).toBe("Reading App");
      expect(readingAppPreset.description).toContain("reading");
    });

    it("should include reading-specific plugins", () => {
      expect(readingAppPreset.plugins).toHaveLength(3);
      expect(readingAppPreset.plugins).toContainEqual([
        "transcription",
        { scheme: "auto" },
      ]);
      expect(readingAppPreset.plugins).toContainEqual([
        "translation",
        { target: "en" },
      ]);
      expect(readingAppPreset.plugins).toContain("clause-segmenter");
    });
  });

  describe("createReadingAppPreset", () => {
    it("should create preset with clause segmenter by default", () => {
      const preset = createReadingAppPreset();

      expect(preset.plugins).toContain("clause-segmenter");
    });

    it("should exclude clause segmenter when disabled", () => {
      const preset = createReadingAppPreset({
        includeClauseSegmenter: false,
      });

      expect(preset.plugins).not.toContain("clause-segmenter");
      expect(preset.plugins).toHaveLength(2);
    });

    it("should allow custom options", () => {
      const preset = createReadingAppPreset({
        transcriptionScheme: "romaji",
        translationTarget: "fr",
        includeClauseSegmenter: true,
      });

      expect(preset.plugins[0]).toEqual([
        "transcription",
        { scheme: "romaji" },
      ]);
      expect(preset.plugins[1]).toEqual([
        "translation",
        { target: "fr" },
      ]);
      expect(preset.plugins).toContain("clause-segmenter");
    });
  });

  describe("vocabularyBuilderPreset", () => {
    it("should have correct structure", () => {
      expect(vocabularyBuilderPreset.id).toBe("vocabulary-builder");
      expect(vocabularyBuilderPreset.name).toBe("Vocabulary Builder");
      expect(vocabularyBuilderPreset.description).toContain("vocabulary");
    });

    it("should include vocabulary-specific plugins", () => {
      expect(vocabularyBuilderPreset.plugins).toHaveLength(3);
      expect(vocabularyBuilderPreset.plugins).toContain("frequency");
      expect(vocabularyBuilderPreset.plugins).toContain("difficulty");
      expect(vocabularyBuilderPreset.plugins).toContainEqual([
        "translation",
        { target: "en" },
      ]);
    });
  });

  describe("createVocabularyBuilderPreset", () => {
    it("should create preset with translation by default", () => {
      const preset = createVocabularyBuilderPreset();

      expect(preset.plugins).toHaveLength(3);
      expect(preset.plugins).toContainEqual([
        "translation",
        { target: "en" },
      ]);
    });

    it("should exclude translation when disabled", () => {
      const preset = createVocabularyBuilderPreset({
        includeTranslation: false,
      });

      expect(preset.plugins).toHaveLength(2);
      expect(preset.plugins).toContain("frequency");
      expect(preset.plugins).toContain("difficulty");
      expect(preset.plugins).not.toContainEqual([
        "translation",
        { target: "en" },
      ]);
    });

    it("should allow custom translation target", () => {
      const preset = createVocabularyBuilderPreset({
        translationTarget: "de",
      });

      expect(preset.plugins).toContainEqual([
        "translation",
        { target: "de" },
      ]);
    });
  });

  describe("grammarAnalyzerPreset", () => {
    it("should have correct structure", () => {
      expect(grammarAnalyzerPreset.id).toBe("grammar-analyzer");
      expect(grammarAnalyzerPreset.name).toBe("Grammar Analyzer");
      expect(grammarAnalyzerPreset.description).toContain("grammar");
    });

    it("should include grammar-specific plugins", () => {
      expect(grammarAnalyzerPreset.plugins).toHaveLength(3);
      expect(grammarAnalyzerPreset.plugins).toContain("pos");
      expect(grammarAnalyzerPreset.plugins).toContain("clause-segmenter");
      expect(grammarAnalyzerPreset.plugins).toContain("gender");
    });
  });

  describe("createGrammarAnalyzerPreset", () => {
    it("should create preset with gender by default", () => {
      const preset = createGrammarAnalyzerPreset();

      expect(preset.plugins).toHaveLength(3);
      expect(preset.plugins).toContain("gender");
    });

    it("should exclude gender when disabled", () => {
      const preset = createGrammarAnalyzerPreset({
        includeGender: false,
      });

      expect(preset.plugins).toHaveLength(2);
      expect(preset.plugins).toContain("pos");
      expect(preset.plugins).toContain("clause-segmenter");
      expect(preset.plugins).not.toContain("gender");
    });
  });

  describe("Preset Type Compatibility", () => {
    it("all presets should conform to Preset type", () => {
      const presets: Preset[] = [
        minimalPreset,
        languageLearningPreset,
        readingAppPreset,
        vocabularyBuilderPreset,
        grammarAnalyzerPreset,
      ];

      presets.forEach((preset) => {
        expect(preset).toHaveProperty("id");
        expect(preset).toHaveProperty("name");
        expect(preset).toHaveProperty("description");
        expect(preset).toHaveProperty("plugins");
        expect(Array.isArray(preset.plugins)).toBe(true);
      });
    });

    it("custom presets should conform to Preset type", () => {
      const customPresets: Preset[] = [
        createMinimalPreset(),
        createLanguageLearningPreset(),
        createReadingAppPreset(),
        createVocabularyBuilderPreset(),
        createGrammarAnalyzerPreset(),
      ];

      customPresets.forEach((preset) => {
        expect(preset).toHaveProperty("id");
        expect(preset).toHaveProperty("name");
        expect(preset).toHaveProperty("description");
        expect(preset).toHaveProperty("plugins");
      });
    });
  });

  describe("Preset plugin array format", () => {
    it("should handle plugin strings", () => {
      const presets = [
        languageLearningPreset,
        vocabularyBuilderPreset,
        grammarAnalyzerPreset,
      ];

      presets.forEach((preset) => {
        const hasStringPlugins = preset.plugins.some(
          (p) => typeof p === "string"
        );
        expect(hasStringPlugins).toBe(true);
      });
    });

    it("should handle plugin tuples with options", () => {
      const presets = [
        minimalPreset,
        languageLearningPreset,
        readingAppPreset,
      ];

      presets.forEach((preset) => {
        const hasTuplePlugins = preset.plugins.some((p) => Array.isArray(p));
        expect(hasTuplePlugins).toBe(true);
      });
    });
  });
});
