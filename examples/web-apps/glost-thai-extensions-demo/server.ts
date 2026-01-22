/**
 * Express server for HTMX demo
 * Minimal example - just tests data flow using presets from glost-th/presets
 */

import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { processGLOSTWithExtensionsAsync } from 'glost-plugins';
import { createSimpleDocument, getAllWords, getWordText } from 'glost';
import { createThaiWord } from 'glost-th';
import { isThaiText } from 'glost-th/constants';

// Import demo extensions that have actual data (presets use skeleton providers without data)
import { 
  createThaiTranscriptionExtension,
  createThaiTranslationExtension,
  createThaiWordJoinerExtension
} from '../../demos/glost-th-extensions-suite-example/src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'public')));

/**
 * Simple text segmentation using Intl.Segmenter
 */
function segmentThaiText(text: string): string[] {
  const trimmed = text.trim();
  if (typeof Intl === 'undefined' || !('Segmenter' in Intl)) {
    return trimmed.split(/\s+/).filter(w => w.length > 0);
  }
  try {
    // @ts-ignore - Intl.Segmenter may not be in TypeScript types yet
    const segmenter = new Intl.Segmenter('th', { granularity: 'word' });
    const segments = segmenter.segment(trimmed);
    const words: string[] = [];
    for (const segment of segments) {
      if (segment.isWordLike) {
        const word = segment.segment.trim();
        if (word.length > 0) words.push(word);
      }
    }
    return words.length > 0 ? words : [trimmed];
  } catch {
    return trimmed.split(/\s+/).filter(w => w.length > 0);
  }
}

/**
 * Render GLOST document with proper ruby annotations
 * For composite words (phrases), shows transcriptions on individual words but translation on the phrase
 * Only shows translations for Thai text, not English
 */
function renderDocument(document: any, transcriptionScheme: string = 'rtgs'): string {
  const words = getAllWords(document);
  
  if (words.length === 0) {
    return '<div class="empty-state">No words found</div>';
  }

  return words.map((word: any) => {
    const text = getWordText(word);
    const isComposite = word.extras?.isComposite === true;
    const originalChunks = word.extras?.originalChunks as string[] | undefined;
    const originalTranscriptions = word.extras?.originalTranscriptions as Array<Record<string, string>> | undefined;
    // Try both "en-US" and "en" for translation lookup (translation extension uses "en")
    const translation = word.extras?.translations?.["en"] 
      || word.extras?.translations?.["en-US"];
    
    // Only show translations for Thai text, not English
    const shouldShowTranslation = translation && isThaiText(text, true);
    
    // For composite words (phrases), we want to show:
    // - Individual word transcriptions (from original chunks)
    // - Phrase-level translation (only if phrase contains Thai)
    if (isComposite && originalChunks && originalChunks.length > 1 && originalTranscriptions) {
      // Check if any chunk is Thai to determine if we should show translation
      const hasThaiChunk = originalChunks.some(chunk => isThaiText(chunk, true));
      const shouldShowPhraseTranslation = translation && hasThaiChunk;
      
      // Render individual words with their transcriptions
      const wordParts = originalChunks.map((chunk, idx) => {
        const chunkTranscription = originalTranscriptions[idx]?.[transcriptionScheme];
        const isThai = isThaiText(chunk, true);
        
        // Only show transcription for Thai chunks
        if (chunkTranscription && isThai) {
          return `<span class="ruby-container">
            <span class="ruby-annotation">${chunkTranscription}</span>
            <span class="ruby-base">${chunk}</span>
          </span>`;
        } else {
          return `<span class="ruby-base">${chunk}</span>`;
        }
      }).join('');
      
      // Wrap phrase in a container that groups all words together
      // Translation should appear below all words in the phrase, centered
      let html = `<span style="display: inline-flex; flex-direction: column; align-items: center; vertical-align: baseline; gap: 0.1rem;">`;
      // First, render all word parts in a flex container (horizontal)
      html += `<span style="display: inline-flex; align-items: baseline; gap: 0.25rem; flex-wrap: wrap; justify-content: center;">${wordParts}</span>`;
      if (shouldShowPhraseTranslation) {
        // Show translation below all word parts - it applies to the entire phrase
        // Center it under the words
        html += `<span class="translation" style="display: block; margin-left: 0; margin-top: 0.1rem; text-align: center; width: 100%;">${translation}</span>`;
      }
      html += `</span>`;
      return html;
    } else {
      // Regular word - show transcription and translation (only for Thai)
      const transcription = transcriptionScheme === 'ipa' 
        ? word.transcription?.ipa?.text 
        : word.transcription?.rtgs?.text;
      
      // Only show transcription for Thai text
      if (transcription && isThaiText(text, true)) {
        let html = `<span class="ruby-container">`;
        html += `<span class="ruby-annotation">${transcription}</span>`;
        html += `<span class="ruby-base">${text}</span>`;
        if (shouldShowTranslation) {
          // No brackets - translation is already differentiated by italics
          html += `<span class="translation">${translation}</span>`;
        }
        html += `</span>`;
        return html;
      } else {
        // No transcription or not Thai - just show word (no translation for English)
        return `<span class="word">${text}</span>`;
      }
    }
  }).join(' ');
}

/**
 * Process endpoint - returns rendered HTML
 */
app.post('/process', async (req, res) => {
  try {
    const { text, transcription: transcriptionScheme = 'rtgs' } = req.body;

    if (!text || !text.trim()) {
      return res.send('<div class="empty-state">Please enter some Thai text...</div>');
    }

    // Convert text to GLOST document (minimal - just for testing)
    const wordTexts = segmentThaiText(text);
    const words = wordTexts
      .map(wordText => {
        const cleanText = wordText.replace(/[.,!?;:]/g, "");
        return cleanText.length > 0 ? createThaiWord({ text: cleanText }) : null;
      })
      .filter((w): w is ReturnType<typeof createThaiWord> => w !== null);

    const document = createSimpleDocument(words, "th", "thai");

    // Use demo extensions with actual data (presets use skeleton providers without data)
    // Order matters: transcription first, then word joiner (to combine phrases), then translation (on phrases)
    const extensions = [
      createThaiTranscriptionExtension(),
      createThaiWordJoinerExtension(), // Combine words into phrases before translation
      createThaiTranslationExtension("en-US"),
    ];

    // Process with demo extensions
    const result = await processGLOSTWithExtensionsAsync(document, extensions);

    // Simple rendering - just to verify data flow
    const html = renderDocument(result.document, transcriptionScheme);
    const appliedExts = result.metadata.appliedExtensions || [];
    
    // Debug: Log words without transcriptions to console
    const allWords = getAllWords(result.document);
    const wordsWithoutTranscription = allWords.filter(w => {
      const hasTranscription = w.transcription && Object.keys(w.transcription).length > 0;
      if (!hasTranscription) {
        const wordText = getWordText(w);
        console.log(`[Missing Transcription] Word: "${wordText}" - No transcription data found`);
      }
      return !hasTranscription;
    });
    
    if (wordsWithoutTranscription.length > 0) {
      console.log(`[Summary] ${wordsWithoutTranscription.length} word(s) without transcription:`, 
        wordsWithoutTranscription.map(w => getWordText(w)).join(", "));
    } else {
      console.log(`[Success] All ${allWords.length} word(s) have transcriptions`);
    }
    
    const debugInfo = wordsWithoutTranscription.length > 0 
      ? `<div class="info" style="margin-top: 1rem; font-size: 0.85rem;">
          <strong>Note:</strong> Demo data has limited vocabulary. ${wordsWithoutTranscription.length} word(s) without transcription: ${wordsWithoutTranscription.slice(0, 10).map(w => getWordText(w)).join(", ")}${wordsWithoutTranscription.length > 10 ? "..." : ""}
        </div>`
      : '';
    
    res.send(`
      ${appliedExts.length > 0 ? `<div class="info">Applied: ${appliedExts.join(", ")}</div>` : ''}
      ${debugInfo}
      <div class="output">${html}</div>
    `);

  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(`
      <div class="error">Error: ${error instanceof Error ? error.message : String(error)}</div>
    `);
  }
});

/**
 * Start server with automatic port fallback
 */
function startServer(port: number) {
  const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Open http://localhost:${port} in your browser`);
  });

  server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is in use, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
      process.exit(1);
    }
  });
}

startServer(PORT);
