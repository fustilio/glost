/**
 * Language Code Management
 *
 * Internal format: BCP-47 with ISO-639-3 (three-letter codes) for precise identification
 * - ISO-639-3: Three-letter codes covering 7000+ languages
 * - ISO-639-1: Two-letter codes (184 languages) - supported for convenience
 * - BCP-47: Full language tags with script/region (e.g., "cmn-Hans-CN")
 */

// ============================================================================
// ISO-639-1 to ISO-639-3 Mapping (Complete - all 184 languages)
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
// Language Names Database (ISO-639-3 based) - Complete for all ISO-639-1
// ============================================================================

export type LanguageEntry = {
  name: string;
  nativeName: string;
  iso1?: string;
};

/**
 * Complete language database indexed by ISO-639-3
 * Includes all 184 ISO-639-1 languages plus Chinese varieties
 */
export const LANGUAGE_DATA: Record<string, LanguageEntry> = {
  // A
  aar: { name: "Afar", nativeName: "Afaraf", iso1: "aa" },
  abk: { name: "Abkhazian", nativeName: "Аԥсуа бызшәа", iso1: "ab" },
  afr: { name: "Afrikaans", nativeName: "Afrikaans", iso1: "af" },
  aka: { name: "Akan", nativeName: "Akan", iso1: "ak" },
  amh: { name: "Amharic", nativeName: "አማርኛ", iso1: "am" },
  ara: { name: "Arabic", nativeName: "العربية", iso1: "ar" },
  arg: { name: "Aragonese", nativeName: "Aragonés", iso1: "an" },
  asm: { name: "Assamese", nativeName: "অসমীয়া", iso1: "as" },
  ava: { name: "Avaric", nativeName: "Авар мацӀ", iso1: "av" },
  ave: { name: "Avestan", nativeName: "Avesta", iso1: "ae" },
  aym: { name: "Aymara", nativeName: "Aymar aru", iso1: "ay" },
  aze: { name: "Azerbaijani", nativeName: "Azərbaycan dili", iso1: "az" },

  // B
  bak: { name: "Bashkir", nativeName: "Башҡорт теле", iso1: "ba" },
  bam: { name: "Bambara", nativeName: "Bamanankan", iso1: "bm" },
  bel: { name: "Belarusian", nativeName: "Беларуская", iso1: "be" },
  ben: { name: "Bengali", nativeName: "বাংলা", iso1: "bn" },
  bih: { name: "Bihari", nativeName: "भोजपुरी", iso1: "bh" },
  bis: { name: "Bislama", nativeName: "Bislama", iso1: "bi" },
  bod: { name: "Tibetan", nativeName: "བོད་སྐད", iso1: "bo" },
  bos: { name: "Bosnian", nativeName: "Bosanski", iso1: "bs" },
  bre: { name: "Breton", nativeName: "Brezhoneg", iso1: "br" },
  bul: { name: "Bulgarian", nativeName: "Български", iso1: "bg" },

  // C
  cat: { name: "Catalan", nativeName: "Català", iso1: "ca" },
  ces: { name: "Czech", nativeName: "Čeština", iso1: "cs" },
  cha: { name: "Chamorro", nativeName: "Chamoru", iso1: "ch" },
  che: { name: "Chechen", nativeName: "Нохчийн мотт", iso1: "ce" },
  chu: { name: "Church Slavonic", nativeName: "Ѩзыкъ словѣньскъ", iso1: "cu" },
  chv: { name: "Chuvash", nativeName: "Чӑваш чӗлхи", iso1: "cv" },
  cor: { name: "Cornish", nativeName: "Kernewek", iso1: "kw" },
  cos: { name: "Corsican", nativeName: "Corsu", iso1: "co" },
  cre: { name: "Cree", nativeName: "ᓀᐦᐃᔭᐍᐏᐣ", iso1: "cr" },
  cym: { name: "Welsh", nativeName: "Cymraeg", iso1: "cy" },

  // D
  dan: { name: "Danish", nativeName: "Dansk", iso1: "da" },
  deu: { name: "German", nativeName: "Deutsch", iso1: "de" },
  div: { name: "Divehi", nativeName: "ދިވެހި", iso1: "dv" },
  dzo: { name: "Dzongkha", nativeName: "རྫོང་ཁ", iso1: "dz" },

  // E
  ell: { name: "Greek", nativeName: "Ελληνικά", iso1: "el" },
  eng: { name: "English", nativeName: "English", iso1: "en" },
  epo: { name: "Esperanto", nativeName: "Esperanto", iso1: "eo" },
  est: { name: "Estonian", nativeName: "Eesti", iso1: "et" },
  eus: { name: "Basque", nativeName: "Euskara", iso1: "eu" },
  ewe: { name: "Ewe", nativeName: "Eʋegbe", iso1: "ee" },

  // F
  fao: { name: "Faroese", nativeName: "Føroyskt", iso1: "fo" },
  fas: { name: "Persian", nativeName: "فارسی", iso1: "fa" },
  fij: { name: "Fijian", nativeName: "Vosa Vakaviti", iso1: "fj" },
  fin: { name: "Finnish", nativeName: "Suomi", iso1: "fi" },
  fra: { name: "French", nativeName: "Français", iso1: "fr" },
  fry: { name: "Western Frisian", nativeName: "Frysk", iso1: "fy" },
  ful: { name: "Fulah", nativeName: "Fulfulde", iso1: "ff" },

  // G
  gla: { name: "Scottish Gaelic", nativeName: "Gàidhlig", iso1: "gd" },
  gle: { name: "Irish", nativeName: "Gaeilge", iso1: "ga" },
  glg: { name: "Galician", nativeName: "Galego", iso1: "gl" },
  glv: { name: "Manx", nativeName: "Gaelg", iso1: "gv" },
  grn: { name: "Guarani", nativeName: "Avañe'ẽ", iso1: "gn" },
  guj: { name: "Gujarati", nativeName: "ગુજરાતી", iso1: "gu" },

  // H
  hat: { name: "Haitian Creole", nativeName: "Kreyòl ayisyen", iso1: "ht" },
  hau: { name: "Hausa", nativeName: "Hausa", iso1: "ha" },
  heb: { name: "Hebrew", nativeName: "עברית", iso1: "he" },
  her: { name: "Herero", nativeName: "Otjiherero", iso1: "hz" },
  hin: { name: "Hindi", nativeName: "हिन्दी", iso1: "hi" },
  hmo: { name: "Hiri Motu", nativeName: "Hiri Motu", iso1: "ho" },
  hrv: { name: "Croatian", nativeName: "Hrvatski", iso1: "hr" },
  hun: { name: "Hungarian", nativeName: "Magyar", iso1: "hu" },
  hye: { name: "Armenian", nativeName: "Հայերdelays", iso1: "hy" },

  // I
  ibo: { name: "Igbo", nativeName: "Igbo", iso1: "ig" },
  ido: { name: "Ido", nativeName: "Ido", iso1: "io" },
  iii: { name: "Sichuan Yi", nativeName: "ꆈꌠ꒿", iso1: "ii" },
  iku: { name: "Inuktitut", nativeName: "ᐃᓄᒃᑎᑐᑦ", iso1: "iu" },
  ile: { name: "Interlingue", nativeName: "Interlingue", iso1: "ie" },
  ina: { name: "Interlingua", nativeName: "Interlingua", iso1: "ia" },
  ind: { name: "Indonesian", nativeName: "Bahasa Indonesia", iso1: "id" },
  ipk: { name: "Inupiaq", nativeName: "Iñupiaq", iso1: "ik" },
  isl: { name: "Icelandic", nativeName: "Íslenska", iso1: "is" },
  ita: { name: "Italian", nativeName: "Italiano", iso1: "it" },

  // J
  jav: { name: "Javanese", nativeName: "Basa Jawa", iso1: "jv" },
  jpn: { name: "Japanese", nativeName: "日本語", iso1: "ja" },

  // K
  kal: { name: "Kalaallisut", nativeName: "Kalaallisut", iso1: "kl" },
  kan: { name: "Kannada", nativeName: "ಕನ್ನಡ", iso1: "kn" },
  kas: { name: "Kashmiri", nativeName: "कॉशुर", iso1: "ks" },
  kat: { name: "Georgian", nativeName: "ქართული", iso1: "ka" },
  kau: { name: "Kanuri", nativeName: "Kanuri", iso1: "kr" },
  kaz: { name: "Kazakh", nativeName: "Қазақ тілі", iso1: "kk" },
  khm: { name: "Khmer", nativeName: "ខ្មែរ", iso1: "km" },
  kik: { name: "Kikuyu", nativeName: "Gĩkũyũ", iso1: "ki" },
  kin: { name: "Kinyarwanda", nativeName: "Ikinyarwanda", iso1: "rw" },
  kir: { name: "Kyrgyz", nativeName: "Кыргызча", iso1: "ky" },
  kom: { name: "Komi", nativeName: "Коми кыв", iso1: "kv" },
  kon: { name: "Kongo", nativeName: "Kikongo", iso1: "kg" },
  kor: { name: "Korean", nativeName: "한국어", iso1: "ko" },
  kua: { name: "Kuanyama", nativeName: "Kuanyama", iso1: "kj" },
  kur: { name: "Kurdish", nativeName: "Kurdî", iso1: "ku" },

  // L
  lao: { name: "Lao", nativeName: "ພາສາລາວ", iso1: "lo" },
  lat: { name: "Latin", nativeName: "Latina", iso1: "la" },
  lav: { name: "Latvian", nativeName: "Latviešu", iso1: "lv" },
  lim: { name: "Limburgish", nativeName: "Limburgs", iso1: "li" },
  lin: { name: "Lingala", nativeName: "Lingála", iso1: "ln" },
  lit: { name: "Lithuanian", nativeName: "Lietuvių", iso1: "lt" },
  ltz: { name: "Luxembourgish", nativeName: "Lëtzebuergesch", iso1: "lb" },
  lub: { name: "Luba-Katanga", nativeName: "Kiluba", iso1: "lu" },
  lug: { name: "Ganda", nativeName: "Luganda", iso1: "lg" },

  // M
  mah: { name: "Marshallese", nativeName: "Kajin M̧ajeļ", iso1: "mh" },
  mal: { name: "Malayalam", nativeName: "മലയാളം", iso1: "ml" },
  mar: { name: "Marathi", nativeName: "मराठी", iso1: "mr" },
  mkd: { name: "Macedonian", nativeName: "Македонски", iso1: "mk" },
  mlg: { name: "Malagasy", nativeName: "Malagasy", iso1: "mg" },
  mlt: { name: "Maltese", nativeName: "Malti", iso1: "mt" },
  mon: { name: "Mongolian", nativeName: "Монгол хэл", iso1: "mn" },
  mri: { name: "Maori", nativeName: "Te Reo Māori", iso1: "mi" },
  msa: { name: "Malay", nativeName: "Bahasa Melayu", iso1: "ms" },
  mya: { name: "Burmese", nativeName: "ဗမာစာ", iso1: "my" },

  // N
  nau: { name: "Nauru", nativeName: "Dorerin Naoero", iso1: "na" },
  nav: { name: "Navajo", nativeName: "Diné bizaad", iso1: "nv" },
  nbl: { name: "South Ndebele", nativeName: "isiNdebele", iso1: "nr" },
  nde: { name: "North Ndebele", nativeName: "isiNdebele", iso1: "nd" },
  ndo: { name: "Ndonga", nativeName: "Owambo", iso1: "ng" },
  nep: { name: "Nepali", nativeName: "नेपाली", iso1: "ne" },
  nld: { name: "Dutch", nativeName: "Nederlands", iso1: "nl" },
  nno: { name: "Norwegian Nynorsk", nativeName: "Norsk nynorsk", iso1: "nn" },
  nob: { name: "Norwegian Bokmål", nativeName: "Norsk bokmål", iso1: "nb" },
  nor: { name: "Norwegian", nativeName: "Norsk", iso1: "no" },
  nya: { name: "Chichewa", nativeName: "Chichewa", iso1: "ny" },

  // O
  oci: { name: "Occitan", nativeName: "Occitan", iso1: "oc" },
  oji: { name: "Ojibwe", nativeName: "ᐊᓂᔑᓈᐯᒧᐎᓐ", iso1: "oj" },
  ori: { name: "Odia", nativeName: "ଓଡ଼ିଆ", iso1: "or" },
  orm: { name: "Oromo", nativeName: "Afaan Oromoo", iso1: "om" },
  oss: { name: "Ossetian", nativeName: "Ирон æвзаг", iso1: "os" },

  // P
  pan: { name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", iso1: "pa" },
  pli: { name: "Pali", nativeName: "पालि", iso1: "pi" },
  pol: { name: "Polish", nativeName: "Polski", iso1: "pl" },
  por: { name: "Portuguese", nativeName: "Português", iso1: "pt" },
  pus: { name: "Pashto", nativeName: "پښتو", iso1: "ps" },

  // Q
  que: { name: "Quechua", nativeName: "Runa Simi", iso1: "qu" },

  // R
  roh: { name: "Romansh", nativeName: "Rumantsch", iso1: "rm" },
  ron: { name: "Romanian", nativeName: "Română", iso1: "ro" },
  run: { name: "Kirundi", nativeName: "Ikirundi", iso1: "rn" },
  rus: { name: "Russian", nativeName: "Русский", iso1: "ru" },

  // S
  sag: { name: "Sango", nativeName: "Yângâ tî sängö", iso1: "sg" },
  san: { name: "Sanskrit", nativeName: "संस्कृतम्", iso1: "sa" },
  sin: { name: "Sinhala", nativeName: "සිංහල", iso1: "si" },
  slk: { name: "Slovak", nativeName: "Slovenčina", iso1: "sk" },
  slv: { name: "Slovenian", nativeName: "Slovenščina", iso1: "sl" },
  sme: { name: "Northern Sami", nativeName: "Davvisámegiella", iso1: "se" },
  smo: { name: "Samoan", nativeName: "Gagana Samoa", iso1: "sm" },
  sna: { name: "Shona", nativeName: "ChiShona", iso1: "sn" },
  snd: { name: "Sindhi", nativeName: "سنڌي", iso1: "sd" },
  som: { name: "Somali", nativeName: "Soomaali", iso1: "so" },
  sot: { name: "Southern Sotho", nativeName: "Sesotho", iso1: "st" },
  spa: { name: "Spanish", nativeName: "Español", iso1: "es" },
  sqi: { name: "Albanian", nativeName: "Shqip", iso1: "sq" },
  srd: { name: "Sardinian", nativeName: "Sardu", iso1: "sc" },
  srp: { name: "Serbian", nativeName: "Српски", iso1: "sr" },
  ssw: { name: "Swati", nativeName: "SiSwati", iso1: "ss" },
  sun: { name: "Sundanese", nativeName: "Basa Sunda", iso1: "su" },
  swa: { name: "Swahili", nativeName: "Kiswahili", iso1: "sw" },
  swe: { name: "Swedish", nativeName: "Svenska", iso1: "sv" },

  // T
  tah: { name: "Tahitian", nativeName: "Reo Tahiti", iso1: "ty" },
  tam: { name: "Tamil", nativeName: "தமிழ்", iso1: "ta" },
  tat: { name: "Tatar", nativeName: "Татар теле", iso1: "tt" },
  tel: { name: "Telugu", nativeName: "తెలుగు", iso1: "te" },
  tgk: { name: "Tajik", nativeName: "Тоҷикӣ", iso1: "tg" },
  tgl: { name: "Tagalog", nativeName: "Tagalog", iso1: "tl" },
  tha: { name: "Thai", nativeName: "ไทย", iso1: "th" },
  tir: { name: "Tigrinya", nativeName: "ትግርኛ", iso1: "ti" },
  ton: { name: "Tongan", nativeName: "Lea faka-Tonga", iso1: "to" },
  tsn: { name: "Tswana", nativeName: "Setswana", iso1: "tn" },
  tso: { name: "Tsonga", nativeName: "Xitsonga", iso1: "ts" },
  tuk: { name: "Turkmen", nativeName: "Türkmençe", iso1: "tk" },
  tur: { name: "Turkish", nativeName: "Türkçe", iso1: "tr" },
  twi: { name: "Twi", nativeName: "Twi", iso1: "tw" },

  // U
  uig: { name: "Uyghur", nativeName: "ئۇيغۇرچە", iso1: "ug" },
  ukr: { name: "Ukrainian", nativeName: "Українська", iso1: "uk" },
  urd: { name: "Urdu", nativeName: "اردو", iso1: "ur" },
  uzb: { name: "Uzbek", nativeName: "Oʻzbek", iso1: "uz" },

  // V
  ven: { name: "Venda", nativeName: "Tshivenḓa", iso1: "ve" },
  vie: { name: "Vietnamese", nativeName: "Tiếng Việt", iso1: "vi" },
  vol: { name: "Volapük", nativeName: "Volapük", iso1: "vo" },

  // W
  wln: { name: "Walloon", nativeName: "Walon", iso1: "wa" },
  wol: { name: "Wolof", nativeName: "Wollof", iso1: "wo" },

  // X
  xho: { name: "Xhosa", nativeName: "isiXhosa", iso1: "xh" },

  // Y
  yid: { name: "Yiddish", nativeName: "ייִדיש", iso1: "yi" },
  yor: { name: "Yoruba", nativeName: "Yorùbá", iso1: "yo" },

  // Z
  zha: { name: "Zhuang", nativeName: "Saɯ cueŋƅ", iso1: "za" },
  zho: { name: "Chinese", nativeName: "中文", iso1: "zh" },
  zul: { name: "Zulu", nativeName: "isiZulu", iso1: "zu" },

  // ============================================================================
  // Chinese varieties (ISO-639-3 distinguishes these - no ISO-639-1 equivalent)
  // ============================================================================
  cmn: { name: "Mandarin Chinese", nativeName: "普通话" },
  yue: { name: "Cantonese", nativeName: "粵語" },
  nan: { name: "Min Nan Chinese", nativeName: "閩南語" },
  wuu: { name: "Wu Chinese", nativeName: "吴语" },
  hak: { name: "Hakka Chinese", nativeName: "客家話" },
  hsn: { name: "Xiang Chinese", nativeName: "湘语" },
  gan: { name: "Gan Chinese", nativeName: "贛語" },
  cjy: { name: "Jinyu Chinese", nativeName: "晋语" },
  cpx: { name: "Pu-Xian Chinese", nativeName: "莆仙語" },
  czh: { name: "Huizhou Chinese", nativeName: "徽州話" },
  czo: { name: "Min Zhong Chinese", nativeName: "閩中語" },
  mnp: { name: "Min Bei Chinese", nativeName: "閩北語" },
  cdo: { name: "Min Dong Chinese", nativeName: "閩東語" },
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
  language: string;
  script?: string;
  region?: string;
};

/**
 * Parse BCP-47 tag into components
 */
export function parseBCP47(tag: string): BCP47Components {
  const parts = tag.split("-");
  const result: BCP47Components = { language: parts[0].toLowerCase() };

  let i = 1;
  if (parts[i] && /^[A-Za-z]{4}$/.test(parts[i])) {
    result.script = parts[i].charAt(0).toUpperCase() + parts[i].slice(1).toLowerCase();
    i++;
  }
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
// Default Regions
// ============================================================================

export const DEFAULT_REGIONS: Record<string, string> = {
  // ISO-639-3
  eng: "US", spa: "ES", fra: "FR", deu: "DE", ita: "IT", por: "PT",
  rus: "RU", ara: "SA", hin: "IN", jpn: "JP", kor: "KR", vie: "VN",
  tha: "TH", ind: "ID", msa: "MY", cmn: "CN", yue: "HK", zho: "CN",
  khm: "KH", lao: "LA", mya: "MM", kat: "GE", nld: "NL", pol: "PL",
  tur: "TR", ukr: "UA", swe: "SE", tam: "IN", mal: "IN", tel: "IN",
  ben: "BD", fas: "IR", heb: "IL", ell: "GR", ces: "CZ", ron: "RO",
  hun: "HU", fin: "FI", dan: "DK", nor: "NO", bul: "BG", hrv: "HR",
  slk: "SK", slv: "SI", srp: "RS", lit: "LT", lav: "LV",
  est: "EE", isl: "IS", cat: "ES", eus: "ES", glg: "ES", afr: "ZA",
  // ISO-639-1 shortcuts
  en: "US", es: "ES", fr: "FR", de: "DE", it: "IT", pt: "PT",
  ru: "RU", ar: "SA", hi: "IN", ja: "JP", ko: "KR", vi: "VN",
  th: "TH", id: "ID", ms: "MY", zh: "CN", km: "KH", lo: "LA",
  my: "MM", ka: "GE", nl: "NL", pl: "PL", tr: "TR", uk: "UA",
  sv: "SE", ta: "IN", ml: "IN", te: "IN", bn: "BD", fa: "IR",
  he: "IL", el: "GR", cs: "CZ", ro: "RO", hu: "HU", fi: "FI",
  da: "DK", no: "NO", bg: "BG", hr: "HR", sk: "SK", sl: "SI",
  sr: "RS", lt: "LT", lv: "LV", et: "EE", is: "IS", ca: "ES",
  eu: "ES", gl: "ES", af: "ZA",
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
