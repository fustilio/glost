/**
 * Transcription Extension
 *
 * Adds IPA transcription to words.
 * Demo extension with a sample dictionary.
 */

import type { GLOSTExtension } from "glost-extensions";
import type { GLOSTWord } from "glost";

/**
 * Sample IPA dictionary
 */
const IPA_DICTIONARY: Record<string, string> = {
  hello: "/həˈloʊ/",
  world: "/wɜːrld/",
  the: "/ðə/",
  a: "/ə/",
  is: "/ɪz/",
  it: "/ɪt/",
  to: "/tuː/",
  and: "/ænd/",
  ecclesiastical: "/ɪˌkliː.ziˈæs.tɪk.əl/",
  phenomenon: "/fəˈnɒm.ɪ.nən/",
  pronunciation: "/prəˌnʌn.siˈeɪ.ʃən/",
  worcestershire: "/ˈwʊs.tər.ʃər/",
  pneumonia: "/njuːˈmoʊ.niə/",
  colonel: "/ˈkɜːr.nəl/",
  queue: "/kjuː/",
  psychology: "/saɪˈkɒl.ə.dʒi/",
  knight: "/naɪt/",
  subtle: "/ˈsʌt.əl/",
};

function getWordText(word: GLOSTWord): string {
  const textNode = word.children.find((c) => c.type === "TextNode");
  return textNode && "value" in textNode ? textNode.value : "";
}

export const TranscriptionExtension: GLOSTExtension = {
  id: "transcription",
  name: "Transcription",
  description: "Adds IPA transcription to words",

  provides: {
    extras: ["transcription"],
  },

  enhanceMetadata: (node: GLOSTWord) => {
    const text = getWordText(node).toLowerCase();
    if (!text) return;

    const ipa = IPA_DICTIONARY[text];
    if (!ipa) return;

    return {
      transcription: {
        ipa,
        source: "dictionary" as const,
      },
    };
  },
};
