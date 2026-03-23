/**
 * Minimal Preset
 *
 * Just the essentials: transcription and translation.
 *
 * @packageDocumentation
 */
/**
 * Minimal Preset
 *
 * Lightweight preset with just transcription and translation.
 *
 * Includes:
 * - Transcription
 * - Translation
 *
 * @example
 * ```typescript
 * import { glost } from "glost-processor";
 * import { minimalPreset } from "glost-presets";
 *
 * const processor = glost()
 *   .use(minimalPreset);
 *
 * const result = await processor.process(document);
 * ```
 */
export const minimalPreset = {
    id: "minimal",
    name: "Minimal",
    description: "Just transcription and translation - the essentials",
    plugins: [
        ["transcription", { scheme: "auto" }],
        ["translation", { target: "en" }],
    ],
};
/**
 * Create a customized minimal preset
 *
 * @param options - Customization options
 * @returns Customized preset
 */
export function createMinimalPreset(options) {
    const { transcriptionScheme = "auto", translationTarget = "en", } = options || {};
    return {
        id: "minimal-custom",
        name: "Minimal (Custom)",
        description: "Customized minimal preset",
        plugins: [
            ["transcription", { scheme: transcriptionScheme }],
            ["translation", { target: translationTarget }],
        ],
    };
}
//# sourceMappingURL=minimal.js.map