# glost-cli

Command-line tools for GLOST plugin management and discovery.

## Installation

```bash
npm install -g glost-cli
# or
pnpm add -g glost-cli
```

## Usage

```bash
glost plugins <command> [options]
```

## Commands

### List Plugins

List all available plugins:

```bash
glost plugins list
```

With filters:

```bash
# Filter by category
glost plugins list --category=enhancer

# Filter by language
glost plugins list --language=th

# Verbose output
glost plugins list --verbose
glost plugins list -v

# Combined
glost plugins list --category=enhancer --language=th --verbose
```

### Search Plugins

Search for plugins by keyword:

```bash
glost plugins search transcription
glost plugins search "thai language"
```

With filters:

```bash
glost plugins search transcription --category=enhancer
glost plugins search transcription --language=th
```

### Plugin Information

Show detailed information about a plugin:

```bash
glost plugins info glost-transcription
glost plugins info transcription
```

Output includes:
- Version and metadata
- Capabilities (async, parallel, languages, node types)
- Requirements and dependencies
- Conflicts
- Examples

### Validate Plugin Combinations

Check for conflicts and validate dependencies:

```bash
glost plugins validate transcription translation frequency
glost plugins validate plugin1 plugin2 plugin3
```

Output includes:
- Missing plugins check
- Conflict detection
- Dependency resolution
- Execution order

### Registry Statistics

Show statistics about the plugin registry:

```bash
glost plugins stats
```

Output includes:
- Total plugin count
- Plugins by category
- Plugins by language
- Top tags

### Create Plugin Template

Generate a plugin template:

```bash
glost plugins create MyCustomPlugin
```

Outputs a complete plugin template to stdout.

## Options

- `--category=<category>` - Filter by category
  - Values: `transformer`, `enhancer`, `generator`, `analyzer`, `utility`
- `--language=<lang>` - Filter by language support
  - Values: `th`, `ja`, `ko`, `en`, etc.
- `--verbose`, `-v` - Show detailed information
- `--tags=<tag1,tag2>` - Filter by tags (comma-separated)

## Examples

### Find all transcription plugins

```bash
glost plugins search transcription
```

### List all enhancers for Thai

```bash
glost plugins list --category=enhancer --language=th --verbose
```

### Check if plugins work together

```bash
glost plugins validate transcription translation frequency difficulty
```

Output:

```
Validating plugins: transcription, translation, frequency, difficulty

✓ All plugins found
✓ No conflicts detected
✓ Dependency resolution successful

Execution order: transcription → translation → frequency → difficulty
```

### Get plugin details

```bash
glost plugins info transcription
```

Output:

```
Transcription

ID: transcription
Version: 1.0.0
Category: enhancer
Description: Adds transcription support

Capabilities:
  Async: Yes
  Parallel: No
  Languages: th, ja, ko

Tags: transcription, phonetics, ipa

Examples:

  Basic Usage
  
  ```typescript
  import { transcription } from "glost-transcription";
  
  const processor = glost()
    .use(transcription, { scheme: "ipa" });
  ```
```

### View registry overview

```bash
glost plugins stats
```

Output:

```
GLOST Plugin Registry Statistics
===================================

Total Plugins: 12

By Category:
  transformer     2
  enhancer        5
  generator       3
  analyzer        2

By Language:
  th              8
  ja              6
  ko              4
  en              12

Top Tags:
  transcription   5
  translation     3
  frequency       2
```

## Programmatic Usage

You can also use the CLI functions programmatically:

```typescript
import {
  listPlugins,
  searchPlugins,
  showPluginInfo,
  validatePlugins,
  showStats,
  createPluginTemplate
} from "glost-cli";

// List all plugins
listPlugins({ verbose: true });

// Search
searchPlugins("transcription", { language: "th" });

// Show info
showPluginInfo("transcription");

// Validate
validatePlugins(["transcription", "translation", "frequency"]);

// Stats
showStats();

// Create template
createPluginTemplate("MyPlugin");
```

## License

MIT
