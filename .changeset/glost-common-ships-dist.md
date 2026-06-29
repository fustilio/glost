---
"@glotblocks/glost-common": patch
---

Point `main`/`types`/all `exports` subpaths at compiled `dist/*.js` + `dist/*.d.ts` instead of `src/*.ts`, and add `files: ["dist"]` so the published tarball ships only build output. The published `0.4.2` resolved consumers to raw TypeScript source, which fails any downstream runner that cannot strip types under `node_modules`. Adds a `publint` `prepublishOnly` gate so this cannot regress.
