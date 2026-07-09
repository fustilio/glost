---
"@glotblocks/glost-cli": patch
"@glotblocks/glost-presets": patch
"@glotblocks/glost-processor": patch
"@glotblocks/glost-registry": patch
---

Add the `repository` field (with `directory`) to these four packages. They were the only publishable packages missing it, which caused npm to reject their OIDC provenance publish with `E422 ... "repository.url" is "", expected to match "https://github.com/fustilio/glost"`. Every other package already carries this field.
