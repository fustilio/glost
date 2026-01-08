import { describe, it, expect } from "vitest";
import {
  type StandardGLOSTMetadata,
  type FrequencyLevel,
  type DifficultyLevel,
  type CEFRLevel,
  isValidFrequency,
  isValidDifficulty,
  isValidCEFR,
  isValidGender,
  validateStandardMetadata,
  isStandardMetadata,
  getDefaultMetadata,
  mergeMetadata,
} from "../metadata";

describe("Metadata Types", () => {
  it("accepts valid frequency levels", () => {
    const frequencies: FrequencyLevel[] = [
      "very-common",
      "common",
      "uncommon",
      "rare",
    ];

    frequencies.forEach((freq) => {
      expect(isValidFrequency(freq)).toBe(true);
    });
  });

  it("rejects invalid frequency levels", () => {
    expect(isValidFrequency("invalid")).toBe(false);
    expect(isValidFrequency("")).toBe(false);
    expect(isValidFrequency(null)).toBe(false);
    expect(isValidFrequency(undefined)).toBe(false);
    expect(isValidFrequency(123)).toBe(false);
  });

  it("accepts valid difficulty levels", () => {
    const difficulties: DifficultyLevel[] = [
      "beginner",
      "intermediate",
      "advanced",
    ];

    difficulties.forEach((diff) => {
      expect(isValidDifficulty(diff)).toBe(true);
    });
  });

  it("rejects invalid difficulty levels", () => {
    expect(isValidDifficulty("expert")).toBe(false);
    expect(isValidDifficulty("")).toBe(false);
  });

  it("accepts valid CEFR levels", () => {
    const cefr: CEFRLevel[] = ["Pre-A1", "A1", "A2", "B1", "B2", "C1", "C2"];

    cefr.forEach((level) => {
      expect(isValidCEFR(level)).toBe(true);
    });
  });

  it("rejects invalid CEFR levels", () => {
    expect(isValidCEFR("A3")).toBe(false);
    expect(isValidCEFR("D1")).toBe(false);
  });

  it("accepts valid gender values", () => {
    expect(isValidGender("masculine")).toBe(true);
    expect(isValidGender("feminine")).toBe(true);
    expect(isValidGender("neutral")).toBe(true);
    expect(isValidGender("common")).toBe(true);
  });

  it("rejects invalid gender values", () => {
    expect(isValidGender("male")).toBe(false);
    expect(isValidGender("female")).toBe(false);
  });
});

describe("validateStandardMetadata", () => {
  it("validates correct metadata", () => {
    const metadata: StandardGLOSTMetadata = {
      frequency: "very-common",
      difficulty: "beginner",
      cefr: "A1",
      partOfSpeech: "noun",
      culturalNotes: "Common greeting",
      gender: "masculine",
      lesson: 1,
      unit: "greetings",
      topic: "basic-phrases",
    };

    const result = validateStandardMetadata(metadata);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("validates partial metadata", () => {
    const metadata: StandardGLOSTMetadata = {
      frequency: "common",
    };

    const result = validateStandardMetadata(metadata);
    expect(result.valid).toBe(true);
  });

  it("rejects non-object metadata", () => {
    const result = validateStandardMetadata("not an object");
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("must be an object");
  });

  it("rejects invalid frequency", () => {
    const metadata = { frequency: "super-common" };
    const result = validateStandardMetadata(metadata);
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("Invalid frequency");
  });

  it("rejects invalid difficulty", () => {
    const metadata = { difficulty: "expert" };
    const result = validateStandardMetadata(metadata);
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("Invalid difficulty");
  });

  it("rejects invalid CEFR", () => {
    const metadata = { cefr: "D1" };
    const result = validateStandardMetadata(metadata);
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("Invalid CEFR");
  });

  it("rejects invalid gender", () => {
    const metadata = { gender: "male" };
    const result = validateStandardMetadata(metadata);
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("Invalid gender");
  });

  it("rejects non-string partOfSpeech", () => {
    const metadata = { partOfSpeech: 123 };
    const result = validateStandardMetadata(metadata);
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("partOfSpeech must be a string");
  });

  it("rejects non-number lesson", () => {
    const metadata = { lesson: "one" };
    const result = validateStandardMetadata(metadata);
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("lesson must be a number");
  });

  it("collects multiple errors", () => {
    const metadata = {
      frequency: "invalid",
      difficulty: "expert",
      cefr: "D1",
    };
    const result = validateStandardMetadata(metadata);
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(3);
  });
});

describe("isStandardMetadata", () => {
  it("returns true for valid metadata", () => {
    const metadata: StandardGLOSTMetadata = {
      frequency: "common",
      difficulty: "intermediate",
    };

    expect(isStandardMetadata(metadata)).toBe(true);
  });

  it("returns false for invalid metadata", () => {
    const metadata = { frequency: "invalid" };
    expect(isStandardMetadata(metadata)).toBe(false);
  });
});

describe("getDefaultMetadata", () => {
  it("returns default metadata", () => {
    const metadata = getDefaultMetadata();
    expect(metadata.frequency).toBe("common");
    expect(metadata.difficulty).toBe("intermediate");
  });
});

describe("mergeMetadata", () => {
  it("merges multiple metadata objects", () => {
    const meta1: Partial<StandardGLOSTMetadata> = {
      frequency: "common",
      difficulty: "beginner",
    };

    const meta2: Partial<StandardGLOSTMetadata> = {
      difficulty: "intermediate",
      partOfSpeech: "noun",
    };

    const merged = mergeMetadata(meta1, meta2);

    expect(merged.frequency).toBe("common");
    expect(merged.difficulty).toBe("intermediate"); // Later object wins
    expect(merged.partOfSpeech).toBe("noun");
  });

  it("handles empty merge", () => {
    const merged = mergeMetadata();
    expect(merged).toEqual({});
  });

  it("handles single metadata", () => {
    const meta: Partial<StandardGLOSTMetadata> = {
      frequency: "rare",
    };

    const merged = mergeMetadata(meta);
    expect(merged).toEqual(meta);
  });
});
