/**
 * Default rendering strategy with sensible defaults
 */
export const defaultRenderingStrategy = {
    shouldHideTranscription: () => false,
    getTranscriptionPosition: () => "below",
    getTranscriptionClassName: () => "",
    getRubyPosition: () => "over",
    shouldShowTranscription: () => true,
    getTranscriptionPlaceholder: () => "",
};
/**
 * Create a rendering strategy by merging with defaults
 */
export function createRenderingStrategy(overrides) {
    return {
        ...defaultRenderingStrategy,
        ...overrides,
    };
}
//# sourceMappingURL=rendering-strategy.js.map