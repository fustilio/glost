# GLOST Migration Guides

## Current Version: v0.5.0

This document contains the latest migration guide for upgrading to the current GLOST version.

## Latest Migration

### v0.4 → v0.5 (Current)

**See:** [Migration Guide v0.4 to v0.5](./migration/MIGRATION_v0.4_to_v0.5.md)

**Key Changes:**
- Unified-style processor API with fluent `.use()` chaining
- Package restructure: `glost` (core) → `glost-core`, new `glost` facade package
- Enhanced plugin registry with discovery and validation
- New packages: `glost-processor`, `glost-registry`, `glost-presets`, `glost-cli`
- Async-only processing (add `await` to all `.process()` calls)

**Quick Start:**
```typescript
// Old (v0.4)
import { processGLOSTWithExtensions } from "glost-extensions";
const result = processGLOSTWithExtensions(doc, [ext1, ext2]);

// New (v0.5)
import { glost } from "glost";
const result = await glost().use(ext1).use(ext2).process(doc);
```

---

## Related Documentation

- [Full Migration Guide](./migration/MIGRATION_v0.4_to_v0.5.md) - Complete details and examples
- [Release Notes](./releases/RELEASE_NOTES_v0.5.0.md) - What's new in v0.5.0
- [Extensions Guide](./EXTENSIONS_GUIDE.md) - Working with the extension system
- [Provider Philosophy](./PROVIDER_PHILOSOPHY.md) - Understanding data quality principles

## Need Help?

- **Documentation:** [docs/](./docs/)
- **GitHub Issues:** https://github.com/fustilio/glost/issues
- **GitHub Discussions:** https://github.com/fustilio/glost/discussions
