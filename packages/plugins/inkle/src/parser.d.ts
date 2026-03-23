import type { GLOSTRoot, LanguageCode, ScriptSystem } from "glost";
type InkJSON = Record<string, unknown>;
interface ParseOptions {
    language?: LanguageCode;
    script?: ScriptSystem;
    defaultSpeaker?: string;
    sections?: string[];
}
export declare function parseInkJSON(json: InkJSON, options?: ParseOptions): GLOSTRoot;
export {};
//# sourceMappingURL=parser.d.ts.map