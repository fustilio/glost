# GLOST Transcription Example (Simple)

Simple transcription demo using extension packages.

## What This Demonstrates

Basic usage of composed extensions:
- `@examples/en-transcription-ipa` - Provides IPA
- `@examples/en-ipa-to-phonemic` - Converts IPA to phonemic respelling

## Running

```bash
npm install
npm run dev
```

Open `http://localhost:5173`

## Note

**For a more comprehensive demo with:**
- Interactive extension toggling
- Visual pipeline representation
- Dependency error demonstration
- Better UI

**See**: [`examples/composition-demo`](../composition-demo/)

## What's Different from composition-demo?

| Feature | This Demo | composition-demo |
|---------|-----------|------------------|
| Purpose | Simple usage | Full composition showcase |
| UI | Basic | Beautiful with pipeline viz |
| Interactivity | None | Toggle extensions on/off |
| Visualization | No | Yes - see data flow |
| Dependencies | Shows usage | Shows errors too |
| Documentation | Basic | Comprehensive |

## Migration Note

This example was updated to use the new extension packages instead of inline extensions. The old inline extensions are now proper packages:

- `src/extensions/transcription.ts` → `@examples/en-transcription-ipa`
- `src/extensions/ipa-respelling.ts` → `@examples/en-ipa-to-phonemic`

## Recommended Path

1. **Start here** - Simple usage example
2. **Then try** [`composition-demo`](../composition-demo/) - Interactive showcase
3. **Read packages** - Extension source code in `examples/extensions/languages/en/`
