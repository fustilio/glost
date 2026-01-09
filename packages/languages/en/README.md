# glost-en

English language support for GLOST.

## Features

- **Clause Segmenter Provider**: English-specific clause segmentation rules

## Installation

```bash
npm install glost-en glost-clause-segmenter
```

## Usage

### Clause Segmentation

```typescript
import { createClauseSegmenterExtension } from "glost-clause-segmenter";
import { englishSegmenterProvider } from "glost-en/segmenter";

const segmenter = createClauseSegmenterExtension({
  targetLanguage: "en",
  provider: englishSegmenterProvider
});
```

## Documentation

See the [main GLOST documentation](https://github.com/fustilio/glost) for more information.

## License

MIT
