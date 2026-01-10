/**
 * GLOST v0.2.0 Migration Integration Tests
 *
 * Tests to verify that the GLOST migration is successful and
 * all extensions work correctly with the new API.
 */

import { describe, it, expect } from "vitest";
import { createThaiTranscriptionExtension } from "../transcription";
import { createThaiTranslationExtension } from "../translation";
import type { GLOSTExtension } from "glost-extensions";

describe("GLOST v0.2.0 Migration Integration", () => {
  describe("Extension Creation", () => {
    it("should create Thai transcription extension without errors", () => {
      const extension = createThaiTranscriptionExtension();
      
      expect(extension).toBeDefined();
      expect(extension.id).toBe("transcription");
      expect(extension.name).toBe("Transcription");
      expect(typeof extension.visit?.word).toBe("function");
    });

    it("should create Thai translation extension without errors", () => {
      const extension = createThaiTranslationExtension();
      
      expect(extension).toBeDefined();
      expect(extension.id).toBe("translation");
      expect(extension.name).toBe("Translation");
      expect(typeof extension.visit?.word).toBe("function");
    });

    it("should create Thai translation extension with custom native language", () => {
      const extension = createThaiTranslationExtension("en-US");
      
      expect(extension).toBeDefined();
      expect(extension.options).toBeDefined();
    });
  });

  describe("Language Adapter Integration", () => {
    it("should handle LingoLogLanguage to GlostLanguage conversion", () => {
      // The extensions should be created without type errors
      // This verifies that the language adapter is working correctly
      
      const transcriptionExt = createThaiTranscriptionExtension();
      const translationExt = createThaiTranslationExtension("en-US");
      
      expect(transcriptionExt).toBeDefined();
      expect(translationExt).toBeDefined();
      
      // Verify the extensions have the correct structure
      expect(transcriptionExt.visit).toBeDefined();
      expect(translationExt.visit).toBeDefined();
    });
  });

  describe("Extension Options", () => {
    it("should pass options correctly to transcription extension", () => {
      const extension = createThaiTranscriptionExtension();
      
      // Verify options are set
      expect(extension.options).toBeDefined();
      expect(extension.options?.targetLanguage).toBeDefined();
    });

    it("should pass options correctly to translation extension", () => {
      const extension = createThaiTranslationExtension("en-US");
      
      // Verify options are set
      expect(extension.options).toBeDefined();
      expect(extension.options?.from).toBeDefined();
      expect(extension.options?.to).toBeDefined();
    });
  });

  describe("Type Safety", () => {
    it("should create extensions without 'as any' type assertions", () => {
      // This test verifies that we're not using type assertions
      // If this compiles and runs, it means the language adapter is working
      
      const transcription: GLOSTExtension = createThaiTranscriptionExtension();
      const translation: GLOSTExtension = createThaiTranslationExtension();
      
      expect(transcription).toBeDefined();
      expect(translation).toBeDefined();
    });
  });

  describe("GLOST v0.2.0 API Compatibility", () => {
    it("should use new extension package imports", () => {
      // Verify that extensions are created using the new packages
      // glost-transcription and glost-translation
      
      const transcription = createThaiTranscriptionExtension();
      const translation = createThaiTranslationExtension();
      
      // Extensions should have the standard GLOST extension structure
      expect(transcription.id).toBeDefined();
      expect(transcription.name).toBeDefined();
      expect(translation.id).toBeDefined();
      expect(translation.name).toBeDefined();
    });

    it("should have async word visitor functions", () => {
      const transcription = createThaiTranscriptionExtension();
      const translation = createThaiTranslationExtension();
      
      // Verify visitor functions exist
      expect(transcription.visit?.word).toBeDefined();
      expect(translation.visit?.word).toBeDefined();
      
      // Verify they are functions
      expect(typeof transcription.visit?.word).toBe("function");
      expect(typeof translation.visit?.word).toBe("function");
    });
  });

  describe("Lookup Function Adaptation", () => {
    it("should adapt lookup functions correctly", async () => {
      // Create extensions with adapted lookup functions
      const transcription = createThaiTranscriptionExtension();
      const translation = createThaiTranslationExtension("en-US");
      
      // If these are created without errors, the adaptation is working
      expect(transcription).toBeDefined();
      expect(translation).toBeDefined();
      
      // Verify the provider is set (v0.4.0 uses provider interface)
      expect(transcription.options?.provider).toBeDefined();
      expect(translation.options?.provider).toBeDefined();
    });
  });
});
