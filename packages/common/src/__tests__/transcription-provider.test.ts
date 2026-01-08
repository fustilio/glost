import { describe, it, expect } from "vitest";
import {
  type TranscriptionProvider,
  createMappingProvider,
  createLookupProvider,
  createFallbackProvider,
} from "../transcription-provider";

describe("TranscriptionProvider interface", () => {
  const mockProvider: TranscriptionProvider = {
    getTranscription: (text, scheme) => {
      if (scheme === "ipa") return `[${text}]`;
      if (scheme === "simple") return text.toLowerCase();
      return undefined;
    },
    getDefaultScheme: () => "ipa",
    hasScheme: (scheme) => ["ipa", "simple"].includes(scheme),
    getAvailableSchemes: () => ["ipa", "simple"],
    getSchemeDisplayName: (scheme) =>
      scheme === "ipa" ? "IPA" : "Simplified",
  };

  it("gets transcription for supported scheme", () => {
    expect(mockProvider.getTranscription("hello", "ipa")).toBe("[hello]");
    expect(mockProvider.getTranscription("HELLO", "simple")).toBe("hello");
  });

  it("returns undefined for unsupported scheme", () => {
    expect(mockProvider.getTranscription("hello", "unknown")).toBeUndefined();
  });

  it("gets default scheme", () => {
    expect(mockProvider.getDefaultScheme()).toBe("ipa");
  });

  it("checks if scheme is supported", () => {
    expect(mockProvider.hasScheme("ipa")).toBe(true);
    expect(mockProvider.hasScheme("simple")).toBe(true);
    expect(mockProvider.hasScheme("unknown")).toBe(false);
  });

  it("lists available schemes", () => {
    const schemes = mockProvider.getAvailableSchemes();
    expect(schemes).toContain("ipa");
    expect(schemes).toContain("simple");
    expect(schemes).toHaveLength(2);
  });

  it("gets scheme display name", () => {
    expect(mockProvider.getSchemeDisplayName("ipa")).toBe("IPA");
    expect(mockProvider.getSchemeDisplayName("simple")).toBe("Simplified");
  });
});

describe("createMappingProvider", () => {
  const mappings: Record<string, Record<string, string>> = {
    upper: { a: "A", b: "B", c: "C" },
    lower: { A: "a", B: "b", C: "c" },
  };

  const provider = createMappingProvider({
    transliterate: (text, scheme) => {
      return Array.from(text)
        .map((char) => mappings[scheme][char] ?? char)
        .join("");
    },
    availableSchemes: ["upper", "lower"] as const,
    defaultScheme: "upper" as const,
    schemeDisplayNames: {
      upper: "Uppercase",
      lower: "Lowercase",
    },
  });

  it("transliterates using mapping", () => {
    expect(provider.getTranscription("abc", "upper")).toBe("ABC");
    expect(provider.getTranscription("ABC", "lower")).toBe("abc");
  });

  it("preserves unknown characters", () => {
    expect(provider.getTranscription("a1b2c3", "upper")).toBe("A1B2C3");
  });

  it("returns undefined for unsupported scheme", () => {
    expect(provider.getTranscription("abc", "unknown")).toBeUndefined();
  });

  it("returns default scheme", () => {
    expect(provider.getDefaultScheme()).toBe("upper");
  });

  it("checks scheme support", () => {
    expect(provider.hasScheme("upper")).toBe(true);
    expect(provider.hasScheme("lower")).toBe(true);
    expect(provider.hasScheme("unknown")).toBe(false);
  });

  it("lists available schemes", () => {
    const schemes = provider.getAvailableSchemes();
    expect(schemes).toEqual(["upper", "lower"]);
  });

  it("gets display names", () => {
    expect(provider.getSchemeDisplayName("upper")).toBe("Uppercase");
    expect(provider.getSchemeDisplayName("lower")).toBe("Lowercase");
    expect(provider.getSchemeDisplayName("unknown")).toBe("unknown");
  });
});

describe("createLookupProvider", () => {
  const dictionary: Record<string, Record<string, string>> = {
    hello: { ipa: "həˈloʊ", simple: "huh-LOW" },
    goodbye: { ipa: "ɡʊdˈbaɪ", simple: "good-BYE" },
  };

  const provider = createLookupProvider({
    lookup: (word, scheme) => dictionary[word]?.[scheme],
    availableSchemes: ["ipa", "simple"] as const,
    defaultScheme: "ipa" as const,
    schemeDisplayNames: {
      ipa: "IPA",
      simple: "Simplified",
    },
  });

  it("looks up known words", () => {
    expect(provider.getTranscription("hello", "ipa")).toBe("həˈloʊ");
    expect(provider.getTranscription("goodbye", "simple")).toBe("good-BYE");
  });

  it("returns undefined for unknown words", () => {
    expect(provider.getTranscription("unknown", "ipa")).toBeUndefined();
  });

  it("returns undefined for word without scheme", () => {
    expect(provider.getTranscription("hello", "unknown")).toBeUndefined();
  });

  it("returns default scheme", () => {
    expect(provider.getDefaultScheme()).toBe("ipa");
  });

  it("checks scheme support", () => {
    expect(provider.hasScheme("ipa")).toBe(true);
    expect(provider.hasScheme("simple")).toBe(true);
    expect(provider.hasScheme("unknown")).toBe(false);
  });

  it("lists available schemes", () => {
    const schemes = provider.getAvailableSchemes();
    expect(schemes).toEqual(["ipa", "simple"]);
  });

  it("gets display names", () => {
    expect(provider.getSchemeDisplayName("ipa")).toBe("IPA");
    expect(provider.getSchemeDisplayName("simple")).toBe("Simplified");
  });
});

describe("createFallbackProvider", () => {
  const primary = createLookupProvider({
    lookup: (word, scheme) => {
      const dict: Record<string, Record<string, string>> = {
        special: { ipa: "ˈspɛʃəl", simple: "SPESH-uhl" },
      };
      return dict[word]?.[scheme];
    },
    availableSchemes: ["ipa", "simple"] as const,
    defaultScheme: "ipa" as const,
    schemeDisplayNames: {
      ipa: "IPA",
      simple: "Simplified",
    },
  });

  const fallback = createMappingProvider({
    transliterate: (text, scheme) => {
      if (scheme === "ipa") return `[${text}]`;
      if (scheme === "simple") return text.toUpperCase();
      return text;
    },
    availableSchemes: ["ipa", "simple"] as const,
    defaultScheme: "ipa" as const,
    schemeDisplayNames: {
      ipa: "IPA",
      simple: "Simplified",
    },
  });

  const provider = createFallbackProvider([primary, fallback]);

  it("uses primary provider when available", () => {
    expect(provider.getTranscription("special", "ipa")).toBe("ˈspɛʃəl");
  });

  it("falls back to secondary provider", () => {
    expect(provider.getTranscription("regular", "ipa")).toBe("[regular]");
  });

  it("returns undefined when no provider has result", () => {
    expect(provider.getTranscription("test", "unknown")).toBeUndefined();
  });

  it("gets default scheme from first provider", () => {
    expect(provider.getDefaultScheme()).toBe("ipa");
  });

  it("combines available schemes from all providers", () => {
    const schemes = provider.getAvailableSchemes();
    expect(schemes).toContain("ipa");
    expect(schemes).toContain("simple");
  });

  it("checks scheme support across all providers", () => {
    expect(provider.hasScheme("ipa")).toBe(true);
    expect(provider.hasScheme("simple")).toBe(true);
    expect(provider.hasScheme("unknown")).toBe(false);
  });

  it("gets display name from first supporting provider", () => {
    expect(provider.getSchemeDisplayName("ipa")).toBe("IPA");
  });

  it("throws error with no providers", () => {
    expect(() => createFallbackProvider([])).toThrow(
      "At least one provider is required"
    );
  });
});
