---
"@glotblocks/glost-utils": patch
---

Point `main`/`types`/all `exports` subpaths at compiled `dist/*.js` + `dist/*.d.ts` instead of `src/*.ts`, and add `files: ["dist"]` so the published tarball ships only build output. The published `0.3.5` resolved consumers to raw TypeScript source (same defect as `glost-common`). Adds a `publint` `prepublishOnly` gate so this cannot regress.
