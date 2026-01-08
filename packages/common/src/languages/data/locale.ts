/**
 * Language Code Management
 *
 * Internal format: BCP-47 with ISO-639-3 (three-letter codes) for precise identification
 * - ISO-639-3: Three-letter codes covering 7000+ languages
 * - ISO-639-1: Two-letter codes (184 languages) - supported for convenience
 * - BCP-47: Full language tags with script/region (e.g., "cmn-Hans-CN")
 */

// ============================================================================
// ISO-639-1 to ISO-639-3 Mapping
// ============================================================================

/**
 * Map ISO-639-1 (two-letter) to ISO-639-3 (three-letter) codes
 * ISO-639-3 is more precise - e.g., "zh" maps to multiple languages
 */
export const ISO639_1_TO_3: Record<string, string> = {
  aa: "aar", ab: "abk", ae: "ave", af: "afr", ak: "aka", am: "amh", an: "arg",
  ar: "ara", as: "asm", av: "ava", ay: "aym", az: "aze", ba: "bak", be: "bel",
  bg: "bul", bh: "bih", bi: "bis", bm: "bam", bn: "ben", bo: "bod", br: "bre",
  bs: "bos", ca: "cat", ce: "che", ch: "cha", co: "cos", cr: "cre", cs: "ces",
  cu: "chu", cv: "chv", cy: "cym", da: "dan", de: "deu", dv: "div", dz: "dzo",
  ee: "ewe", el: "ell", en: "eng", eo: "epo", es: "spa", et: "est", eu: "eus",
  fa: "fas", ff: "ful", fi: "fin", fj: "fij", fo: "fao", fr: "fra", fy: "fry",
  ga: "gle", gd: "gla", gl: "glg", gn: "grn", gu: "guj", gv: "glv", ha: "hau",
  he: "heb", hi: "hin", ho: "hmo", hr: "hrv", ht: "hat", hu: "hun", hy: "hye",
  hz: "her", ia: "ina", id: "ind", ie: "ile", ig: "ibo", ii: "iii", ik: "ipk",
  io: "ido", is: "isl", it: "ita", iu: "iku", ja: "jpn", jv: "jav", ka: "kat",
  kg: "kon", ki: "kik", kj: "kua", kk: "kaz", kl: "kal", km: "khm", kn: "kan",
  ko: "kor", kr: "kau", ks: "kas", ku: "kur", kv: "kom", kw: "cor", ky: "kir",
  la: "lat", lb: "ltz", lg: "lug", li: "lim", ln: "lin", lo: "lao", lt: "lit",
  lu: "lub", lv: "lav", mg: "mlg", mh: "mah", mi: "mri", mk: "mkd", ml: "mal",
  mn: "mon", mr: "mar", ms: "msa", mt: "mlt", my: "mya", na: "nau", nb: "nob",
  nd: "nde", ne: "nep", ng: "ndo", nl: "nld", nn: "nno", no: "nor", nr: "nbl",
  nv: "nav", ny: "nya", oc: "oci", oj: "oji", om: "orm", or: "ori", os: "oss",
  pa: "pan", pi: "pli", pl: "pol", ps: "pus", pt: "por", qu: "que", rm: "roh",
  rn: "run", ro: "ron", ru: "rus", rw: "kin", sa: "san", sc: "srd", sd: "snd",
  se: "sme", sg: "sag", si: "sin", sk: "slk", sl: "slv", sm: "smo", sn: "sna",
  so: "som", sq: "sqi", sr: "srp", ss: "ssw", st: "sot", su: "sun", sv: "swe",
  sw: "swa", ta: "tam", te: "tel", tg: "tgk", th: "tha", ti: "tir", tk: "tuk",
  tl: "tgl", tn: "tsn", to: "ton", tr: "tur", ts: "tso", tt: "tat", tw: "twi",
  ty: "tah", ug: "uig", uk: "ukr", ur: "urd", uz: "uzb", ve: "ven", vi: "vie",
  vo: "vol", wa: "wln", wo: "wol", xh: "xho", yi: "yid", yo: "yor", za: "zha",
  zh: "zho", zu: "zul",
};

/**
 * Reverse mapping: ISO-639-3 to ISO-639-1
 */
export const ISO639_3_TO_1: Record<string, string> = Object.fromEntries(
  Object.entries(ISO639_1_TO_3).map(([k, v]) => [v, k])
);

// ============================================================================
// Language Names Database (ISO-639-3 based)
// ============================================================================

export type LanguageEntry = {
  name: string;
  nativeName: string;
  iso1?: string; // ISO-639-1 code if exists
};

/**
 * Common languages with names (indexed by ISO-639-3)
 * Extensible - add more as needed
 */
export const LANGUAGE_DATA: Record<string, LanguageEntry> = {
  // Major world languages
  eng: { name: "English", nativeName: "English", iso1: "en" },
  spa: { name: "Spanish", nativeName: "Español", iso1: "es" },
  fra: { name: "French", nativeName: "Français", iso1: "fr" },
  deu: { name: "German", nativeName: "Deutsch", iso1: "de" },
  ita: { name: "Italian", nativeName: "Italiano", iso1: "it" },
  por: { name: "Portuguese", nativeName: "Português", iso1: "pt" },
  rus: { name: "Russian", nativeName: "Русский", iso1: "ru" },
  ara: { name: "Arabic", nativeName: "العربية", iso1: "ar" },
  hin: { name: "Hindi", nativeName: "हिन्दी", iso1: "hi" },
  ben: { name: "Bengali", nativeName: "বাংলা", iso1: "bn" },
  jpn: { name: "Japanese", nativeName: "日本語", iso1: "ja" },
  kor: { name: "Korean", nativeName: "한국어", iso1: "ko" },
  vie: { name: "Vietnamese", nativeName: "Tiếng Việt", iso1: "vi" },
  tha: { name: "Thai", nativeName: "ไทย", iso1: "th" },
  ind: { name: "Indonesian", nativeName: "Bahasa Indonesia", iso1: "id" },
  msa: { name: "Malay", nativeName: "Bahasa Melayu", iso1: "ms" },
  nld: { name: "Dutch", nativeName: "Nederlands", iso1: "nl" },
  pol: { name: "Polish", nativeName: "Polski", iso1: "pl" },
  tur: { name: "Turkish", nativeName: "Türkçe", iso1: "tr" },
  ukr: { name: "Ukrainian", nativeName: "Українська", iso1: "uk" },
  swe: { name: "Swedish", nativeName: "Svenska", iso1: "sv" },
  ell: { name: "Greek", nativeName: "Ελληνικά", iso1: "el" },
  ces: { name: "Czech", nativeName: "Čeština", iso1: "cs" },
  ron: { name: "Romanian", nativeName: "Română", iso1: "ro" },
  hun: { name: "Hungarian", nativeName: "Magyar", iso1: "hu" },
  fin: { name: "Finnish", nativeName: "Suomi", iso1: "fi" },
  dan: { name: "Danish", nativeName: "Dansk", iso1: "da" },
  nor: { name: "Norwegian", nativeName: "Norsk", iso1: "no" },
  heb: { name: "Hebrew", nativeName: "עברית", iso1: "he" },
  kat: { name: "Georgian", nativeName: "ქართული", iso1: "ka" },

  // Chinese varieties (ISO-639-3 distinguishes these)
  zho: { name: "Chinese", nativeName: "中文", iso1: "zh" },
  cmn: { name: "Mandarin Chinese", nativeName: "普通话" },
  yue: { name: "Cantonese", nativeName: "粵語" },
  nan: { name: "Min Nan Chinese", nativeName: "閩南語" },
  wuu: { name: "Wu Chinese", nativeName: "吴语" },
  hak: { name: "Hakka Chinese", nativeName: "客家話" },

  // Southeast Asian languages
  khm: { name: "Khmer", nativeName: "ខ្មែរ", iso1: "km" },
  lao: { name: "Lao", nativeName: "ພາສາລາວ", iso1: "lo" },
  mya: { name: "Burmese", nativeName: "ဗမာစာ", iso1: "my" },
  tgl: { name: "Tagalog", nativeName: "Tagalog", iso1: "tl" },

  // South Asian languages
  tam: { name: "Tamil", nativeName: "தமிழ்", iso1: "ta" },
  tel: { name: "Telugu", nativeName: "తెలుగు", iso1: "te" },
  mal: { name: "Malayalam", nativeName: "മലയാളം", iso1: "ml" },
  kan: { name: "Kannada", nativeName: "ಕನ್ನಡ", iso1: "kn" },
  mar: { name: "Marathi", nativeName: "मराठी", iso1: "mr" },
  guj: { name: "Gujarati", nativeName: "ગુજરાતી", iso1: "gu" },
  pan: { name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", iso1: "pa" },
  urd: { name: "Urdu", nativeName: "اردو", iso1: "ur" },
  sin: { name: "Sinhala", nativeName: "සිංහල", iso1: "si" },
  nep: { name: "Nepali", nativeName: "नेपाली", iso1: "ne" },

  // African languages
  swa: { name: "Swahili", nativeName: "Kiswahili", iso1: "sw" },
  hau: { name: "Hausa", nativeName: "Hausa", iso1: "ha" },
  yor: { name: "Yoruba", nativeName: "Yorùbá", iso1: "yo" },
  ibo: { name: "Igbo", nativeName: "Igbo", iso1: "ig" },
  amh: { name: "Amharic", nativeName: "አማርኛ", iso1: "am" },
  zul: { name: "Zulu", nativeName: "isiZulu", iso1: "zu" },
  xho: { name: "Xhosa", nativeName: "isiXhosa", iso1: "xh" },
  afr: { name: "Afrikaans", nativeName: "Afrikaans", iso1: "af" },

  // Other notable languages
  fas: { name: "Persian", nativeName: "فارسی", iso1: "fa" },
  cat: { name: "Catalan", nativeName: "Català", iso1: "ca" },
  eus: { name: "Basque", nativeName: "Euskara", iso1: "eu" },
  glg: { name: "Galician", nativeName: "Galego", iso1: "gl" },
  lat: { name: "Latin", nativeName: "Latina", iso1: "la" },
  san: { name: "Sanskrit", nativeName: "संस्कृतम्", iso1: "sa" },
};

// ============================================================================
// Core Utilities
// ============================================================================

/**
 * Normalize any language code to ISO-639-3
 */
export function toISO639_3(code: string): string {
  if (!code) return code;
  const lower = code.toLowerCase();

  // Already ISO-639-3 (3 chars)?
  if (lower.length === 3 && !lower.includes("-")) {
    return lower;
  }

  // ISO-639-1 (2 chars)?
  if (lower.length === 2) {
    return ISO639_1_TO_3[lower] || lower;
  }

  // BCP-47 tag? Extract language part
  const lang = lower.split("-")[0];
  if (lang.length === 2) {
    return ISO639_1_TO_3[lang] || lang;
  }
  return lang;
}

/**
 * Normalize to ISO-639-1 if possible
 */
export function toISO639_1(code: string): string | undefined {
  const iso3 = toISO639_3(code);
  return ISO639_3_TO_1[iso3];
}

/**
 * Get language name from any code format
 */
export function getLanguageName(code: string): string {
  const iso3 = toISO639_3(code);
  return LANGUAGE_DATA[iso3]?.name || code;
}

/**
 * Get native language name from any code format
 */
export function getNativeLanguageName(code: string): string {
  const iso3 = toISO639_3(code);
  return LANGUAGE_DATA[iso3]?.nativeName || code;
}

/**
 * Check if code is valid (known in our database)
 */
export function isValidLanguageCode(code: string): boolean {
  const iso3 = toISO639_3(code);
  return iso3 in LANGUAGE_DATA || iso3 in ISO639_3_TO_1;
}

// ============================================================================
// BCP-47 Utilities
// ============================================================================

export type BCP47Components = {
  language: string;  // ISO-639 code (2 or 3 letter)
  script?: string;   // ISO-15924 script code (4 letter)
  region?: string;   // ISO-3166-1 region code (2 letter) or UN M.49 (3 digit)
};

/**
 * Parse BCP-47 tag into components
 */
export function parseBCP47(tag: string): BCP47Components {
  const parts = tag.split("-");
  const result: BCP47Components = { language: parts[0].toLowerCase() };

  let i = 1;
  // Script (4 letters, title case)
  if (parts[i] && /^[A-Za-z]{4}$/.test(parts[i])) {
    result.script = parts[i].charAt(0).toUpperCase() + parts[i].slice(1).toLowerCase();
    i++;
  }
  // Region (2 letters or 3 digits)
  if (parts[i] && (/^[A-Za-z]{2}$/.test(parts[i]) || /^\d{3}$/.test(parts[i]))) {
    result.region = parts[i].toUpperCase();
  }

  return result;
}

/**
 * Build BCP-47 tag from components
 */
export function buildBCP47(components: BCP47Components): string {
  const parts = [components.language];
  if (components.script) parts.push(components.script);
  if (components.region) parts.push(components.region);
  return parts.join("-");
}

/**
 * Normalize BCP-47 tag (consistent casing)
 */
export function normalizeBCP47(tag: string): string {
  return buildBCP47(parseBCP47(tag));
}

/**
 * Check if tag is valid BCP-47 format
 */
export function isValidBCP47(tag: string): boolean {
  if (!tag) return false;
  const { language } = parseBCP47(tag);
  return /^[a-z]{2,3}$/.test(language);
}

// ============================================================================
// Default Regions (for convenience)
// ============================================================================

/**
 * Common default regions for languages
 */
export const DEFAULT_REGIONS: Record<string, string> = {
  eng: "US", spa: "ES", fra: "FR", deu: "DE", ita: "IT", por: "PT",
  rus: "RU", ara: "SA", hin: "IN", jpn: "JP", kor: "KR", vie: "VN",
  tha: "TH", ind: "ID", msa: "MY", cmn: "CN", yue: "HK", zho: "CN",
  khm: "KH", lao: "LA", mya: "MM", kat: "GE", nld: "NL", pol: "PL",
  tur: "TR", ukr: "UA", swe: "SE", tam: "IN", mal: "IN", tel: "IN",
  // ISO-639-1 shortcuts
  en: "US", es: "ES", fr: "FR", de: "DE", it: "IT", pt: "PT",
  ru: "RU", ar: "SA", hi: "IN", ja: "JP", ko: "KR", vi: "VN",
  th: "TH", id: "ID", ms: "MY", zh: "CN", km: "KH", lo: "LA",
  my: "MM", ka: "GE", nl: "NL", pl: "PL", tr: "TR", uk: "UA",
  sv: "SE", ta: "IN", ml: "IN", te: "IN",
};

/**
 * Get full BCP-47 tag with default region
 */
export function toBCP47WithRegion(code: string): string {
  const iso3 = toISO639_3(code);
  const region = DEFAULT_REGIONS[iso3] || DEFAULT_REGIONS[code];
  return region ? `${code}-${region}` : code;
}

// ============================================================================
// Special Codes
// ============================================================================

export const SPECIAL_CODES = ["ipa", "und", "mul", "zxx"] as const;
export type SpecialCode = (typeof SPECIAL_CODES)[number];

/**
 * Special code meanings:
 * - ipa: International Phonetic Alphabet
 * - und: Undetermined language
 * - mul: Multiple languages
 * - zxx: No linguistic content
 */

// ============================================================================
// Language Info Helper
// ============================================================================

export function getLanguageInfo(code: string) {
  const iso3 = toISO639_3(code);
  const iso1 = toISO639_1(code);
  const entry = LANGUAGE_DATA[iso3];

  return {
    code,
    iso3,
    iso1,
    name: entry?.name || code,
    nativeName: entry?.nativeName || code,
    bcp47: toBCP47WithRegion(iso3),
  };
}
