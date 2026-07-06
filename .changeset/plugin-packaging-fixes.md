---
"@glotblocks/glost-gender": patch
"@glotblocks/glost-inkle": patch
"@glotblocks/glost-translation": patch
"@glotblocks/glost-difficulty": patch
"@glotblocks/glost-frequency": patch
"@glotblocks/glost-pos": patch
"@glotblocks/glost-transcription": patch
---

Fix published packaging: `glost-gender`, `glost-inkle`, and `glost-translation` now ship compiled `dist/` output instead of pointing `main`/`exports` at TypeScript source (which failed the publint release gate and was unusable from plain Node). All seven plugin packages now declare `"files": ["dist"]` so tarballs no longer include source, tests, and tsconfig.
