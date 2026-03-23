/**
 * GLOST Extension Composition Demo
 *
 * This demo showcases how GLOST extensions compose together:
 *
 * 1. EnglishIPAExtension (GENERATOR)
 *    - Provides IPA transcription for English words
 *    - Standalone: Can be used alone to just show IPA
 *
 * 2. EnglishIPAToPhonemic Extension (ENHANCER)
 *    - Requires IPA from step 1
 *    - Converts IPA to user-friendly phonemic respelling
 *    - Cannot work alone - needs IPA data
 *
 * Key Concepts Demonstrated:
 * - Extension dependencies
 * - Data flow between extensions
 * - Modular, composable architecture
 * - Toggle extensions on/off to see composition
 */
export {};
//# sourceMappingURL=main.d.ts.map