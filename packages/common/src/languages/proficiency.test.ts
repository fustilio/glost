import { describe, it, expect } from "vitest";
import {
  // CEFR
  CEFR_LEVELS,
  CEFR_TO_NUMERIC,
  cefrToNumeric,
  numericToCEFR,

  // ILR
  ILR_LEVELS,
  ilrToNumeric,
  numericToILR,

  // ACTFL
  ACTFL_LEVELS,
  actflToNumeric,
  numericToACTFL,

  // HSK
  HSK_LEVELS,
  hskToNumeric,
  numericToHSK,

  // JLPT
  JLPT_LEVELS,
  jlptToNumeric,
  numericToJLPT,

  // TOPIK
  TOPIK_LEVELS,
  topikToNumeric,
  numericToTOPIK,

  // IELTS
  ieltsToNumeric,
  numericToIELTS,

  // TOEFL
  toeflToNumeric,
  numericToTOEFL,

  // Cambridge
  CAMBRIDGE_LEVELS,
  cambridgeToNumeric,
  numericToCambridge,

  // Goethe
  GOETHE_LEVELS,
  goetheToNumeric,
  numericToGoethe,

  // Universal
  toNumericLevel,
  fromNumericLevel,
  getProficiencyInfo,

  // Utilities
  meetsLevel,
  levelProgress,
  levelsBetween,
} from "./languages";

describe("CEFR Levels", () => {
  it("should have all CEFR levels", () => {
    expect(CEFR_LEVELS).toEqual(["Pre-A1", "A1", "A2", "B1", "B2", "C1", "C2"]);
  });

  it("should convert CEFR to numeric", () => {
    expect(cefrToNumeric("Pre-A1")).toBe(0);
    expect(cefrToNumeric("A1")).toBe(1);
    expect(cefrToNumeric("A2")).toBe(2);
    expect(cefrToNumeric("B1")).toBe(3);
    expect(cefrToNumeric("B2")).toBe(4);
    expect(cefrToNumeric("C1")).toBe(5);
    expect(cefrToNumeric("C2")).toBe(6);
  });

  it("should convert numeric to CEFR", () => {
    expect(numericToCEFR(0)).toBe("Pre-A1");
    expect(numericToCEFR(1)).toBe("A1");
    expect(numericToCEFR(2)).toBe("A2");
    expect(numericToCEFR(3)).toBe("B1");
    expect(numericToCEFR(4)).toBe("B2");
    expect(numericToCEFR(5)).toBe("C1");
    expect(numericToCEFR(6)).toBe("C2");
  });

  it("should round decimals when converting to CEFR", () => {
    expect(numericToCEFR(1.4)).toBe("A1");
    expect(numericToCEFR(1.5)).toBe("A2");
    expect(numericToCEFR(2.7)).toBe("B1");
  });

  it("should clamp out-of-range values", () => {
    expect(numericToCEFR(-1)).toBe("Pre-A1");
    expect(numericToCEFR(10)).toBe("C2");
  });
});

describe("ILR Levels", () => {
  it("should have all ILR levels", () => {
    expect(ILR_LEVELS).toContain("0");
    expect(ILR_LEVELS).toContain("5");
    expect(ILR_LEVELS.length).toBe(11);
  });

  it("should convert ILR to numeric", () => {
    expect(ilrToNumeric("0")).toBe(0);
    expect(ilrToNumeric("1")).toBe(1);
    expect(ilrToNumeric("2")).toBe(2.5);
    expect(ilrToNumeric("3")).toBe(4);
    expect(ilrToNumeric("4")).toBe(5);
    expect(ilrToNumeric("5")).toBe(6);
  });

  it("should convert numeric to ILR", () => {
    expect(numericToILR(0)).toBe("0");
    expect(numericToILR(1)).toBe("1");
    expect(numericToILR(6)).toBe("5");
  });
});

describe("ACTFL Levels", () => {
  it("should have all ACTFL levels", () => {
    expect(ACTFL_LEVELS).toContain("Novice Low");
    expect(ACTFL_LEVELS).toContain("Distinguished");
  });

  it("should convert ACTFL to numeric", () => {
    expect(actflToNumeric("Novice Low")).toBe(0);
    expect(actflToNumeric("Intermediate Mid")).toBe(2);
    expect(actflToNumeric("Advanced High")).toBe(4);
    expect(actflToNumeric("Distinguished")).toBe(6);
  });

  it("should convert numeric to ACTFL", () => {
    expect(numericToACTFL(0)).toBe("Novice Low");
    expect(numericToACTFL(2)).toBe("Intermediate Mid");
    expect(numericToACTFL(6)).toBe("Distinguished");
  });
});

describe("HSK Levels", () => {
  it("should have all HSK levels", () => {
    expect(HSK_LEVELS).toEqual(["HSK 1", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6"]);
  });

  it("should convert HSK to numeric (CEFR aligned)", () => {
    expect(hskToNumeric("HSK 1")).toBe(1); // A1
    expect(hskToNumeric("HSK 3")).toBe(3); // B1
    expect(hskToNumeric("HSK 6")).toBe(6); // C2
  });

  it("should convert numeric to HSK", () => {
    expect(numericToHSK(1)).toBe("HSK 1");
    expect(numericToHSK(4)).toBe("HSK 4");
    expect(numericToHSK(6)).toBe("HSK 6");
  });
});

describe("JLPT Levels", () => {
  it("should have all JLPT levels (N5=easiest, N1=hardest)", () => {
    expect(JLPT_LEVELS).toEqual(["N5", "N4", "N3", "N2", "N1"]);
  });

  it("should convert JLPT to numeric", () => {
    expect(jlptToNumeric("N5")).toBe(1);
    expect(jlptToNumeric("N3")).toBe(3);
    expect(jlptToNumeric("N1")).toBe(5.5);
  });

  it("should convert numeric to JLPT", () => {
    expect(numericToJLPT(1)).toBe("N5");
    expect(numericToJLPT(3)).toBe("N3");
    expect(numericToJLPT(6)).toBe("N1");
  });
});

describe("TOPIK Levels", () => {
  it("should have all TOPIK levels", () => {
    expect(TOPIK_LEVELS).toContain("TOPIK I-1");
    expect(TOPIK_LEVELS).toContain("TOPIK II-6");
  });

  it("should convert TOPIK to numeric", () => {
    expect(topikToNumeric("TOPIK I-1")).toBe(1);
    expect(topikToNumeric("TOPIK II-3")).toBe(3);
    expect(topikToNumeric("TOPIK II-6")).toBe(6);
  });

  it("should convert numeric to TOPIK", () => {
    expect(numericToTOPIK(1)).toBe("TOPIK I-1");
    expect(numericToTOPIK(6)).toBe("TOPIK II-6");
  });
});

describe("IELTS", () => {
  it("should convert IELTS bands to numeric", () => {
    expect(ieltsToNumeric(4)).toBe(1);    // A1
    expect(ieltsToNumeric(5.5)).toBe(3);  // B1
    expect(ieltsToNumeric(7)).toBe(5);    // C1
    expect(ieltsToNumeric(9)).toBe(6);    // C2
  });

  it("should convert numeric to IELTS", () => {
    expect(numericToIELTS(1)).toBe(4);
    expect(numericToIELTS(3)).toBe(5.5);
    expect(numericToIELTS(5)).toBe(8);
    expect(numericToIELTS(6)).toBe(9);
  });
});

describe("TOEFL", () => {
  it("should convert TOEFL scores to numeric", () => {
    expect(toeflToNumeric(30)).toBe(0);   // Pre-A1
    expect(toeflToNumeric(50)).toBe(2);   // A2
    expect(toeflToNumeric(80)).toBe(3);   // B1
    expect(toeflToNumeric(100)).toBe(4);  // B2
    expect(toeflToNumeric(120)).toBe(6);  // C2
  });

  it("should convert numeric to TOEFL", () => {
    expect(numericToTOEFL(0)).toBe(31);
    expect(numericToTOEFL(3)).toBe(86);
    expect(numericToTOEFL(6)).toBe(120);
  });
});

describe("Cambridge English", () => {
  it("should have all Cambridge levels", () => {
    expect(CAMBRIDGE_LEVELS).toEqual(["KET", "PET", "FCE", "CAE", "CPE"]);
  });

  it("should convert Cambridge to numeric", () => {
    expect(cambridgeToNumeric("KET")).toBe(2);  // A2
    expect(cambridgeToNumeric("FCE")).toBe(4);  // B2
    expect(cambridgeToNumeric("CPE")).toBe(6);  // C2
  });

  it("should convert numeric to Cambridge", () => {
    expect(numericToCambridge(2)).toBe("KET");
    expect(numericToCambridge(4)).toBe("FCE");
    expect(numericToCambridge(6)).toBe("CPE");
  });
});

describe("Goethe German", () => {
  it("should have all Goethe levels", () => {
    expect(GOETHE_LEVELS).toContain("Start Deutsch 1");
    expect(GOETHE_LEVELS).toContain("Goethe-Zertifikat C2");
  });

  it("should convert Goethe to numeric", () => {
    expect(goetheToNumeric("Start Deutsch 1")).toBe(1);
    expect(goetheToNumeric("Goethe-Zertifikat B2")).toBe(4);
    expect(goetheToNumeric("Goethe-Zertifikat C2")).toBe(6);
  });

  it("should convert numeric to Goethe", () => {
    expect(numericToGoethe(1)).toBe("Start Deutsch 1");
    expect(numericToGoethe(4)).toBe("Goethe-Zertifikat B2");
    expect(numericToGoethe(6)).toBe("Goethe-Zertifikat C2");
  });
});

describe("Universal Conversion", () => {
  it("should convert from various standards to numeric", () => {
    expect(toNumericLevel("B1", "cefr")).toBe(3);
    expect(toNumericLevel("3", "ilr")).toBe(4);
    expect(toNumericLevel("HSK 4", "hsk")).toBe(4);
    expect(toNumericLevel("N3", "jlpt")).toBe(3);
    expect(toNumericLevel(3.5, "numeric")).toBe(3.5);
  });

  it("should convert from numeric to various standards", () => {
    expect(fromNumericLevel(3, "cefr")).toBe("B1");
    expect(fromNumericLevel(4, "ilr")).toBe("3");
    expect(fromNumericLevel(4, "hsk")).toBe("HSK 4");
    expect(fromNumericLevel(3, "jlpt")).toBe("N3");
    expect(fromNumericLevel(3.5, "numeric")).toBe(3.5);
  });
});

describe("getProficiencyInfo", () => {
  it("should return complete proficiency info", () => {
    const info = getProficiencyInfo(3);
    expect(info.numeric).toBe(3);
    expect(info.cefr).toBe("B1");
    expect(info.description).toBe("B1 - Intermediate");
    expect(info.canDo).toContain("Deal with most situations while traveling");
  });

  it("should handle decimal levels", () => {
    const info = getProficiencyInfo(2.5);
    expect(info.numeric).toBe(2.5);
    expect(info.cefr).toBe("B1"); // Rounds to nearest
    expect(info.description).toBe("B1 - Intermediate");
  });
});

describe("Utility Functions", () => {
  describe("meetsLevel", () => {
    it("should check if level meets requirement", () => {
      expect(meetsLevel(3, 2)).toBe(true);
      expect(meetsLevel(3, 3)).toBe(true);
      expect(meetsLevel(3, 4)).toBe(false);
    });
  });

  describe("levelProgress", () => {
    it("should calculate progress between levels", () => {
      expect(levelProgress(2.5, 2, 3)).toBe(50);
      expect(levelProgress(2, 2, 3)).toBe(0);
      expect(levelProgress(3, 2, 3)).toBe(100);
    });

    it("should clamp values", () => {
      expect(levelProgress(1, 2, 3)).toBe(0);
      expect(levelProgress(4, 2, 3)).toBe(100);
    });
  });

  describe("levelsBetween", () => {
    it("should return CEFR levels between two numeric levels", () => {
      expect(levelsBetween(1, 3)).toEqual(["A1", "A2", "B1"]);
      expect(levelsBetween(0, 6)).toEqual(["Pre-A1", "A1", "A2", "B1", "B2", "C1", "C2"]);
    });

    it("should handle decimal inputs", () => {
      expect(levelsBetween(1.5, 3.5)).toEqual(["A2", "B1"]);
    });
  });
});

describe("Cross-standard Conversions", () => {
  it("should maintain consistency across standards", () => {
    // A level 3 (B1) should convert consistently
    const b1Numeric = 3;

    expect(numericToCEFR(b1Numeric)).toBe("B1");
    expect(numericToHSK(b1Numeric)).toBe("HSK 3");
    expect(numericToJLPT(b1Numeric)).toBe("N3");
    expect(numericToTOPIK(b1Numeric)).toBe("TOPIK II-3");
    expect(numericToCambridge(b1Numeric)).toBe("PET");
    expect(numericToGoethe(b1Numeric)).toBe("Goethe-Zertifikat B1");
  });

  it("should convert between different language-specific tests", () => {
    // HSK 4 (B2) should be equivalent to JLPT N2
    const hskLevel = hskToNumeric("HSK 4"); // 4
    const jlptEquivalent = numericToJLPT(hskLevel);
    expect(jlptEquivalent).toBe("N2");

    // JLPT N1 should be equivalent to HSK 5-6
    const jlptLevel = jlptToNumeric("N1"); // 5.5
    const hskEquivalent = numericToHSK(jlptLevel);
    expect(hskEquivalent).toBe("HSK 6");
  });
});
