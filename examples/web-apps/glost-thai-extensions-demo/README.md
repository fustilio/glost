# GLOST Thai Extensions Visual Demo (HTMX)

A visual browser-based demo for testing and viewing Thai GLOST extensions rendering using HTMX for server-side processing.

## Features

- **HTMX Integration**: Uses HTMX for seamless server-side processing without page reloads
- **Visual Rendering**: See Thai text rendered with transcriptions, translations, and clause segmentation
- **Multiple Pipelines**: Test different extension combinations
- **Interactive**: Type Thai text and see real-time rendering (with debounce)
- **Clause Visualization**: See how sentences are segmented into clauses with color coding

## Running the Demo

### Development Server (HTMX)

```bash
cd examples/web-apps/glost-thai-extensions-demo
pnpm install
pnpm server
```

Then open http://localhost:3000 in your browser.

**Note:** If port 3000 is already in use, the server will automatically try port 3001. You can also specify a custom port:
```bash
PORT=8080 pnpm server
```

The server will:
- Serve the HTML file with HTMX
- Process Thai text server-side
- Return rendered HTML fragments

### Alternative: Vite Dev Server (Client-side)

If you prefer client-side processing:

```bash
pnpm dev
```

Then open http://localhost:5173 in your browser.

## Usage

1. Enter Thai text in the textarea (e.g., "สวัสดีครับ" or "ฉันไปตลาดเพราะต้องการซื้อของ")
2. **Select a preset** (recommended):
   - **Quick Start** (default): Transcription + Translation - perfect for getting started
   - **Minimal**: Fast, basic transcription only
   - **Pronunciation**: Syllables + IPA - for pronunciation practice
   - **Grammar**: Clause analysis - for understanding sentence structure
   - **Learning**: Everything - comprehensive analysis
3. Or select "Custom" and choose a pipeline manually
4. Select transcription system (RTGS, IPA, or Both)
5. Click "Process Text" or press Ctrl/Cmd + Enter
6. The output will update automatically via HTMX (no page reload!)

## Presets

Presets are pre-configured extension combinations that work well together:

- **Quick Start**: Best for most users - balanced features
- **Minimal**: Fastest option - just the essentials
- **Pronunciation**: Focused on pronunciation learning
- **Grammar**: Focused on sentence structure analysis
- **Learning**: Most comprehensive - all features enabled

## HTMX Features Used

- `hx-post`: Submits form data to server
- `hx-target`: Updates the output div
- `hx-swap`: Replaces innerHTML with server response
- `hx-trigger`: Auto-submits on form submit or textarea keyup (with 500ms delay)
- `hx-indicator`: Shows loading state

## What You'll See

- **Words** with Thai text
- **Transcriptions** (RTGS/IPA) as ruby annotations
- **Translations** below words (if available in demo data)
- **Clauses** color-coded by type:
  - Main clause (yellow)
  - Subordinate clause (blue)
  - Relative clause (light blue)
  - Adverbial clause (green)

## Example Sentences

Try these Thai sentences:

- `สวัสดีครับ` - Hello (polite)
- `ฉันไปตลาดเพราะต้องการซื้อของ` - I go to market because I want to buy things
- `ถ้าฝนตกฉันจะอยู่บ้าน` - If it rains, I will stay home

## Architecture

**Minimal example** - just tests data flow, no complex logic:

1. **Text Input** → Simple segmentation using `Intl.Segmenter`
2. **Create GLOST Document** → Using `createSimpleDocument` from `glost`
3. **Apply Preset** → Uses presets from `glost-th/presets` package
4. **Simple Rendering** → Basic HTML output to verify data structure

- **Frontend**: HTML with HTMX attributes (no JavaScript needed!)
- **Backend**: Express.js server - minimal orchestration only
- **Processing**: All logic in `glost-th/presets` - no duplication
- **Rendering**: Simple inline rendering - just to verify data flow

This is a **lean example** that demonstrates the data flow through the GLOST system without complex logic. All real functionality lives in the packages/extensions.
