import { describe, it, expect } from "vitest";
import {
  // ISO-639 mappings
  ISO639_1_TO_3,
  ISO639_3_TO_1,
  LANGUAGE_DATA,

  // Core utilities
  toISO639_3,
  toISO639_1,
  getLanguageName,
  getNativeLanguageName,
  isValidLanguageCode,

  // BCP-47 utilities
  parseBCP47,
  buildBCP47,
  normalizeBCP47,
  isValidBCP47,
  toBCP47WithRegion,

  // Regions & special codes
  DEFAULT_REGIONS,
  SPECIAL_CODES,

  // Info helper
  getLanguageInfo,

  // Display helpers
  getLanguageDisplayName,
  isSpecialCode,

  // Constants
  CEFR_LEVELS,

  // Schema
  languageCodeSchema,
} from "./languages";

describe("ISO-639 Mappings", () => {
  it("should have ISO-639-1 to ISO-639-3 mappings", () => {
    expect(ISO639_1_TO_3["en"]).toBe("eng");
    expect(ISO639_1_TO_3["th"]).toBe("tha");
    expect(ISO639_1_TO_3["ja"]).toBe("jpn");
    expect(ISO639_1_TO_3["zh"]).toBe("zho");
  });

  it("should have reverse ISO-639-3 to ISO-639-1 mappings", () => {
    expect(ISO639_3_TO_1["eng"]).toBe("en");
    expect(ISO639_3_TO_1["tha"]).toBe("th");
    expect(ISO639_3_TO_1["jpn"]).toBe("ja");
    expect(ISO639_3_TO_1["zho"]).toBe("zh");
  });

  it("should have 184 ISO-639-1 codes mapped", () => {
    expect(Object.keys(ISO639_1_TO_3).length).toBe(184);
  });
});

describe("LANGUAGE_DATA", () => {
  it("should have common languages", () => {
    expect(LANGUAGE_DATA["eng"]).toEqual({ name: "English", nativeName: "English", iso1: "en" });
    expect(LANGUAGE_DATA["tha"]).toEqual({ name: "Thai", nativeName: "ไทย", iso1: "th" });
    expect(LANGUAGE_DATA["jpn"]).toEqual({ name: "Japanese", nativeName: "日本語", iso1: "ja" });
  });

  it("should have Chinese varieties", () => {
    expect(LANGUAGE_DATA["cmn"]).toEqual({ name: "Mandarin Chinese", nativeName: "普通话" });
    expect(LANGUAGE_DATA["yue"]).toEqual({ name: "Cantonese", nativeName: "粵語" });
    expect(LANGUAGE_DATA["nan"]).toEqual({ name: "Min Nan Chinese", nativeName: "閩南語" });
  });
});

describe("toISO639_3", () => {
  it("should convert ISO-639-1 to ISO-639-3", () => {
    expect(toISO639_3("en")).toBe("eng");
    expect(toISO639_3("th")).toBe("tha");
    expect(toISO639_3("ja")).toBe("jpn");
    expect(toISO639_3("zh")).toBe("zho");
  });

  it("should return ISO-639-3 codes unchanged", () => {
    expect(toISO639_3("eng")).toBe("eng");
    expect(toISO639_3("cmn")).toBe("cmn");
    expect(toISO639_3("yue")).toBe("yue");
  });

  it("should extract language from BCP-47 tags", () => {
    expect(toISO639_3("en-US")).toBe("eng");
    expect(toISO639_3("zh-Hans-CN")).toBe("zho");
    expect(toISO639_3("th-TH")).toBe("tha");
  });
});

describe("toISO639_1", () => {
  it("should convert ISO-639-3 to ISO-639-1", () => {
    expect(toISO639_1("eng")).toBe("en");
    expect(toISO639_1("tha")).toBe("th");
    expect(toISO639_1("jpn")).toBe("ja");
  });

  it("should convert from BCP-47", () => {
    expect(toISO639_1("en-US")).toBe("en");
    expect(toISO639_1("zh-Hans-CN")).toBe("zh");
  });

  it("should return undefined for codes without ISO-639-1 equivalent", () => {
    expect(toISO639_1("cmn")).toBeUndefined(); // Mandarin has no ISO-639-1
    expect(toISO639_1("yue")).toBeUndefined(); // Cantonese has no ISO-639-1
  });
});

describe("getLanguageName", () => {
  it("should return language name for ISO-639-1 codes", () => {
    expect(getLanguageName("en")).toBe("English");
    expect(getLanguageName("th")).toBe("Thai");
    expect(getLanguageName("fr")).toBe("French");
  });

  it("should return language name for ISO-639-3 codes", () => {
    expect(getLanguageName("eng")).toBe("English");
    expect(getLanguageName("tha")).toBe("Thai");
    expect(getLanguageName("cmn")).toBe("Mandarin Chinese");
    expect(getLanguageName("yue")).toBe("Cantonese");
  });

  it("should return code itself for unknown codes", () => {
    expect(getLanguageName("xyz")).toBe("xyz");
  });
});

describe("getNativeLanguageName", () => {
  it("should return native language name", () => {
    expect(getNativeLanguageName("en")).toBe("English");
    expect(getNativeLanguageName("th")).toBe("ไทย");
    expect(getNativeLanguageName("ja")).toBe("日本語");
    expect(getNativeLanguageName("cmn")).toBe("普通话");
  });
});

describe("isValidLanguageCode", () => {
  it("should return true for known codes", () => {
    expect(isValidLanguageCode("en")).toBe(true);
    expect(isValidLanguageCode("eng")).toBe(true);
    expect(isValidLanguageCode("cmn")).toBe(true);
    expect(isValidLanguageCode("en-US")).toBe(true);
  });

  it("should return false for unknown codes", () => {
    expect(isValidLanguageCode("xyz")).toBe(false);
  });
});

describe("BCP-47 Parsing", () => {
  it("should parse simple language codes", () => {
    expect(parseBCP47("en")).toEqual({ language: "en" });
    expect(parseBCP47("eng")).toEqual({ language: "eng" });
  });

  it("should parse language-region codes", () => {
    expect(parseBCP47("en-US")).toEqual({ language: "en", region: "US" });
    expect(parseBCP47("th-TH")).toEqual({ language: "th", region: "TH" });
    expect(parseBCP47("zh-CN")).toEqual({ language: "zh", region: "CN" });
  });

  it("should parse language-script-region codes", () => {
    expect(parseBCP47("zh-Hans-CN")).toEqual({ language: "zh", script: "Hans", region: "CN" });
    expect(parseBCP47("sr-Latn-RS")).toEqual({ language: "sr", script: "Latn", region: "RS" });
  });

  it("should normalize case", () => {
    expect(parseBCP47("EN-us")).toEqual({ language: "en", region: "US" });
    expect(parseBCP47("ZH-hans-cn")).toEqual({ language: "zh", script: "Hans", region: "CN" });
  });
});

describe("buildBCP47", () => {
  it("should build BCP-47 tags from components", () => {
    expect(buildBCP47({ language: "en" })).toBe("en");
    expect(buildBCP47({ language: "en", region: "US" })).toBe("en-US");
    expect(buildBCP47({ language: "zh", script: "Hans", region: "CN" })).toBe("zh-Hans-CN");
  });
});

describe("normalizeBCP47", () => {
  it("should normalize BCP-47 tags", () => {
    expect(normalizeBCP47("EN-us")).toBe("en-US");
    expect(normalizeBCP47("zh-HANS-cn")).toBe("zh-Hans-CN");
  });
});

describe("isValidBCP47", () => {
  it("should validate BCP-47 tags", () => {
    expect(isValidBCP47("en")).toBe(true);
    expect(isValidBCP47("en-US")).toBe(true);
    expect(isValidBCP47("zh-Hans-CN")).toBe(true);
    expect(isValidBCP47("eng")).toBe(true); // ISO-639-3
  });

  it("should reject invalid tags", () => {
    expect(isValidBCP47("")).toBe(false);
    expect(isValidBCP47("x")).toBe(false); // Too short
    expect(isValidBCP47("toolong")).toBe(false); // Too long for language
  });
});

describe("toBCP47WithRegion", () => {
  it("should add default region", () => {
    expect(toBCP47WithRegion("en")).toBe("en-US");
    expect(toBCP47WithRegion("th")).toBe("th-TH");
    expect(toBCP47WithRegion("ja")).toBe("ja-JP");
    expect(toBCP47WithRegion("eng")).toBe("eng-US");
  });

  it("should return code without change if no default region", () => {
    expect(toBCP47WithRegion("xyz")).toBe("xyz");
  });
});

describe("DEFAULT_REGIONS", () => {
  it("should have common default regions", () => {
    expect(DEFAULT_REGIONS["en"]).toBe("US");
    expect(DEFAULT_REGIONS["eng"]).toBe("US");
    expect(DEFAULT_REGIONS["th"]).toBe("TH");
    expect(DEFAULT_REGIONS["tha"]).toBe("TH");
    expect(DEFAULT_REGIONS["cmn"]).toBe("CN");
    expect(DEFAULT_REGIONS["yue"]).toBe("HK");
  });
});

describe("getLanguageInfo", () => {
  it("should return complete language info for ISO-639-1", () => {
    const info = getLanguageInfo("en");
    expect(info.code).toBe("en");
    expect(info.iso3).toBe("eng");
    expect(info.iso1).toBe("en");
    expect(info.name).toBe("English");
    expect(info.nativeName).toBe("English");
    expect(info.bcp47).toBe("eng-US");
  });

  it("should return complete language info for ISO-639-3", () => {
    const info = getLanguageInfo("cmn");
    expect(info.code).toBe("cmn");
    expect(info.iso3).toBe("cmn");
    expect(info.iso1).toBeUndefined();
    expect(info.name).toBe("Mandarin Chinese");
    expect(info.bcp47).toBe("cmn-CN");
  });

  it("should handle BCP-47 input", () => {
    const info = getLanguageInfo("th-TH");
    expect(info.iso3).toBe("tha");
    expect(info.iso1).toBe("th");
    expect(info.name).toBe("Thai");
  });
});

describe("Special Codes", () => {
  it("should have all special codes", () => {
    expect(SPECIAL_CODES).toContain("ipa");
    expect(SPECIAL_CODES).toContain("und");
    expect(SPECIAL_CODES).toContain("mul");
    expect(SPECIAL_CODES).toContain("zxx");
  });

  it("isSpecialCode should identify special codes", () => {
    expect(isSpecialCode("ipa")).toBe(true);
    expect(isSpecialCode("und")).toBe(true);
    expect(isSpecialCode("en")).toBe(false);
    expect(isSpecialCode("eng")).toBe(false);
  });
});

describe("getLanguageDisplayName", () => {
  it("should return display name for language codes", () => {
    expect(getLanguageDisplayName("en")).toBe("English");
    expect(getLanguageDisplayName("eng")).toBe("English");
    expect(getLanguageDisplayName("th")).toBe("Thai");
    expect(getLanguageDisplayName("cmn")).toBe("Mandarin Chinese");
  });

  it("should return display name for BCP-47 tags", () => {
    expect(getLanguageDisplayName("en-US")).toBe("English");
    expect(getLanguageDisplayName("zh-Hans-CN")).toBe("Chinese");
  });

  it("should handle special codes with proper names", () => {
    expect(getLanguageDisplayName("ipa")).toBe("IPA");
    expect(getLanguageDisplayName("und")).toBe("Undetermined");
    expect(getLanguageDisplayName("mul")).toBe("Multiple Languages");
    expect(getLanguageDisplayName("zxx")).toBe("No Linguistic Content");
  });
});

describe("Constants", () => {
  it("should have all CEFR levels", () => {
    expect(CEFR_LEVELS).toEqual(["Pre-A1", "A1", "A2", "B1", "B2", "C1", "C2"]);
  });
});

describe("Zod Schema", () => {
  it("should validate ISO-639-1 codes", () => {
    expect(languageCodeSchema.safeParse("en").success).toBe(true);
    expect(languageCodeSchema.safeParse("th").success).toBe(true);
    expect(languageCodeSchema.safeParse("ja").success).toBe(true);
  });

  it("should validate ISO-639-3 codes", () => {
    expect(languageCodeSchema.safeParse("eng").success).toBe(true);
    expect(languageCodeSchema.safeParse("tha").success).toBe(true);
    expect(languageCodeSchema.safeParse("cmn").success).toBe(true);
    expect(languageCodeSchema.safeParse("yue").success).toBe(true);
  });

  it("should validate special codes", () => {
    expect(languageCodeSchema.safeParse("ipa").success).toBe(true);
    expect(languageCodeSchema.safeParse("und").success).toBe(true);
    expect(languageCodeSchema.safeParse("mul").success).toBe(true);
    expect(languageCodeSchema.safeParse("zxx").success).toBe(true);
  });

  it("should reject invalid codes", () => {
    expect(languageCodeSchema.safeParse("invalid").success).toBe(false);
    expect(languageCodeSchema.safeParse("").success).toBe(false);
  });
});
