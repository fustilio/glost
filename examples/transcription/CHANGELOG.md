# Changelog

## 0.0.3

### Patch Changes

- Updated dependencies
  - glost@0.3.0
  - glost-extensions@0.2.0
  - @examples/en-ipa-to-phonemic@1.0.1
  - @examples/en-transcription-ipa@1.0.1

## [0.0.3] - Migrated to Extension Packages

### Changed

- ✅ Now uses `@examples/en-transcription-ipa` package instead of inline extension
- ✅ Now uses `@examples/en-ipa-to-phonemic` package instead of inline extension
- ✅ Removed `src/extensions/` folder (extensions are now proper packages)
- ✅ Updated imports to use workspace packages
- ✅ Added README with comparison to composition-demo

### Migration

Old inline extensions have been replaced with proper packages:

- `src/extensions/transcription.ts` → `@examples/en-transcription-ipa`
- `src/extensions/ipa-respelling.ts` → `@examples/en-ipa-to-phonemic`

### Note

For a more comprehensive demo, see `examples/composition-demo/`

## [0.0.2] - Initial Version

Initial transcription demo with inline extensions.
