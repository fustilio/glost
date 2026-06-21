---
"@glotblocks/glost-core": minor
---

Point `main`/`types`/all `exports` subpaths at compiled `dist/*.js` and `dist/*.d.ts` instead of `src/*.ts`. The previous shape forced every downstream test runner to either pre-bundle glost-core's source (via `vitest.config.ts` inline-deps shims) or fail with "Stripping types is currently unsupported for files under node_modules."

After this minor ships, the 4 vitest shims added to `glost-align`, `glost-processor`, `glost-plugins` (and inkle subdir) — plus the equivalent shim in `@polyglot-bundles/parallel-text-base` — become unnecessary and can be removed.

Also adds `files: ["dist"]` to ensure only the build output gets published. Closes #2.
