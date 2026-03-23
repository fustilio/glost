/**
 * Get transcription system config from a language config
 */
export function getTranscriptionSystem(config, system) {
    const systemId = system ?? config.defaultTranscriptionSystem;
    return config.transcriptionSystems[systemId];
}
/**
 * Get available transcription system IDs
 */
export function getAvailableTranscriptionSystems(config) {
    return Object.keys(config.transcriptionSystems);
}
/**
 * Check if transcription should be hidden (when same as text)
 */
export function shouldHideTranscription(config, system, text, transcription) {
    const systemConfig = config.transcriptionSystems[system];
    if (!systemConfig?.hideWhenSameAsText)
        return false;
    return text === transcription;
}
//# sourceMappingURL=language-config.js.map