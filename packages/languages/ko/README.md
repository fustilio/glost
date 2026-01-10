# glost-ko

Korean language support for GLOST (Glossed Syntax Tree).

## Overview

This package provides Korean-specific helper functions for the GLOST framework.

## Installation

```bash
npm install glost-ko glost glost-common
# or
pnpm add glost-ko glost glost-common
```

## Features

- **Helper Functions**: Convenience functions for creating Korean GLOST word nodes
- **Romanization Support**: Built-in support for Revised Romanization (RR)

## Usage

### Creating Korean Words

```typescript
import { createKoreanWord } from 'glost-ko';

const word = createKoreanWord({
  text: '안녕하세요',
  romanization: 'annyeonghaseyo',
  partOfSpeech: 'interjection'
});
```

## License

MIT
