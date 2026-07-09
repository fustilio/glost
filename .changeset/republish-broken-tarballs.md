---
"@glotblocks/glost-extensions": patch
"@glotblocks/glost-plugins": patch
---

Republish with complete `dist/` output. The copies of these packages on npm are broken for plain-Node consumers: `glost-extensions@0.6.2` shipped a `dist/` containing only `example-data/` (no `index.js`, breaking `@glotblocks/glost-processor` and the `@glotblocks/glost` facade at import time), and `glost-plugins@0.6.6` resolved to raw TypeScript source. The workspace manifests already point at `dist/` with `"files": ["dist"]` — this bump exists purely to get correctly-packed tarballs onto the registry.
