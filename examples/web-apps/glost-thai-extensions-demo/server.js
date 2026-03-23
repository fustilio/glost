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
import { createThaiTranscriptionExtension, createThaiTranslationExtension, createThaiWordJoinerExtension } from '../../demos/glost-th-extensions-suite-example/src/index.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'public')));
/**
 * Simple text segmentation using Intl.Segmenter
 * Preserves all segments including punctuation and whitespace
 */
function segmentThaiText(text) {
    const trimmed = text.trim();
    if (typeof Intl === 'undefined' || !('Segmenter' in Intl)) {
        // Fallback: split by whitespace, treat all as words
        return trimmed.split(/\s+/).filter(w => w.length > 0).map(t => ({ text: t, isWord: true }));
    }
    try {
        // @ts-ignore - Intl.Segmenter may not be in TypeScript types yet
        const segmenter = new Intl.Segmenter('th', { granularity: 'word' });
        const segments = segmenter.segment(trimmed);
        const result = [];
        for (const segment of segments) {
            const segText = segment.segment;
            if (segText.length > 0) {
                // Preserve whitespace as non-word, but skip pure whitespace between words
                if (/^\s+$/.test(segText)) {
                    // Add space as separator (will be rendered as space)
                    result.push({ text: ' ', isWord: false });
                }
                else {
                    result.push({ text: segText, isWord: segment.isWordLike });
                }
            }
        }
        return result.length > 0 ? result : [{ text: trimmed, isWord: true }];
    }
    catch {
        return trimmed.split(/\s+/).filter(w => w.length > 0).map(t => ({ text: t, isWord: true }));
    }
}
/**
 * Render a single word with transcription and translation
 */
function renderWord(word, transcriptionScheme, showTranscription, showTranslation) {
    const text = getWordText(word);
    const isComposite = word.extras?.isComposite === true;
    const originalChunks = word.extras?.originalChunks;
    const originalTranscriptions = word.extras?.originalTranscriptions;
    const translation = word.extras?.translations?.["en"] || word.extras?.translations?.["en-US"];
    const shouldShowTranslation = translation && isThaiText(text, true);
    if (isComposite && originalChunks && originalChunks.length > 1) {
        const hasThaiChunk = originalChunks.some(chunk => isThaiText(chunk, true));
        const shouldShowPhraseTranslation = translation && hasThaiChunk;
        const phraseTranscription = transcriptionScheme === 'ipa'
            ? word.transcription?.ipa?.text
            : word.transcription?.rtgs?.text;
        const hasIndividualTranscriptions = originalTranscriptions && originalTranscriptions.some(t => t && Object.keys(t).length > 0);
        const titleAttr = translation ? ` title="${translation}"` : '';
        let html = `<span class="ruby-container"${titleAttr}>`;
        if (phraseTranscription && showTranscription && hasThaiChunk) {
            html += `<span class="ruby-annotation">${phraseTranscription}</span>`;
            html += `<span class="ruby-base">${text}</span>`;
        }
        else if (hasIndividualTranscriptions && showTranscription) {
            const annotations = originalChunks.map((chunk, idx) => {
                const t = originalTranscriptions?.[idx]?.[transcriptionScheme];
                return t || '';
            }).join(' ');
            html += `<span class="ruby-annotation">${annotations}</span>`;
            html += `<span class="ruby-base">${text}</span>`;
        }
        else {
            html += `<span class="ruby-annotation" style="visibility: hidden;">&nbsp;</span>`;
            html += `<span class="ruby-base">${text}</span>`;
        }
        if (shouldShowPhraseTranslation && showTranslation) {
            html += `<span class="translation">${translation}</span>`;
        }
        html += `</span>`;
        return html;
    }
    else {
        const transcription = transcriptionScheme === 'ipa'
            ? word.transcription?.ipa?.text
            : word.transcription?.rtgs?.text;
        const isNumber = /^[\d\u0E50-\u0E59]+$/.test(text);
        const isThai = isThaiText(text, true);
        const titleAttr = (shouldShowTranslation && translation) ? ` title="${translation}"` : '';
        let html = `<span class="ruby-container"${titleAttr}>`;
        if (transcription && (isThai || isNumber) && showTranscription) {
            html += `<span class="ruby-annotation">${transcription}</span>`;
        }
        else {
            html += `<span class="ruby-annotation" style="visibility: hidden;">&nbsp;</span>`;
        }
        html += `<span class="ruby-base">${text}</span>`;
        if (shouldShowTranslation && showTranslation && isThai) {
            html += `<span class="translation">${translation}</span>`;
        }
        html += `</span>`;
        return html;
    }
}
/**
 * Render GLOST document with proper ruby annotations
 * Preserves original segments (punctuation, whitespace) while rendering words with transcription/translation
 */
function renderDocumentWithSegments(document, originalSegments, transcriptionScheme = 'rtgs', showTranscription = true, showTranslation = true) {
    const processedWords = getAllWords(document);
    if (processedWords.length === 0 && originalSegments.every(s => !s.isWord)) {
        return '<div class="empty-state">No words found</div>';
    }
    // Get only word segments (for matching with processed words)
    const wordSegments = originalSegments
        .map((seg, idx) => ({ ...seg, originalIndex: idx }))
        .filter(seg => seg.isWord && seg.text.trim().length > 0);
    // Build a map: for each word segment index, which processed word does it belong to?
    // Also track which processed word starts at which segment index
    const segmentToWord = new Map();
    let wordSegIdx = 0;
    for (const processedWord of processedWords) {
        const wordText = getWordText(processedWord);
        const isComposite = processedWord.extras?.isComposite === true;
        const originalChunks = processedWord.extras?.originalChunks;
        if (isComposite && originalChunks && originalChunks.length > 1) {
            // Composite word - spans multiple segments
            const segmentCount = originalChunks.length;
            for (let i = 0; i < segmentCount && wordSegIdx + i < wordSegments.length; i++) {
                const segIdx = wordSegments[wordSegIdx + i].originalIndex;
                segmentToWord.set(segIdx, {
                    word: processedWord,
                    isStart: i === 0,
                    segmentCount
                });
            }
            wordSegIdx += segmentCount;
        }
        else {
            // Single word - one segment
            if (wordSegIdx < wordSegments.length) {
                const segIdx = wordSegments[wordSegIdx].originalIndex;
                segmentToWord.set(segIdx, {
                    word: processedWord,
                    isStart: true,
                    segmentCount: 1
                });
            }
            wordSegIdx++;
        }
    }
    // Now render segments in order
    const result = [];
    for (let i = 0; i < originalSegments.length; i++) {
        const segment = originalSegments[i];
        if (!segment.isWord) {
            // Punctuation/whitespace - render as-is
            result.push(`<span class="punctuation">${escapeHtml(segment.text)}</span>`);
        }
        else {
            // Word segment - check if it's mapped to a processed word
            const mapping = segmentToWord.get(i);
            if (mapping) {
                if (mapping.isStart) {
                    // This is the start of a word (or composite) - render it
                    result.push(renderWord(mapping.word, transcriptionScheme, showTranscription, showTranslation));
                }
                // If not isStart, this segment was consumed by a composite word - skip it
            }
            else {
                // No mapping - render as plain text
                const wordText = segment.text.trim();
                if (wordText.length > 0) {
                    result.push(`<span class="ruby-container"><span class="ruby-annotation" style="visibility: hidden;">&nbsp;</span><span class="ruby-base">${escapeHtml(wordText)}</span></span>`);
                }
            }
        }
    }
    return result.join('');
}
/**
 * Escape HTML special characters
 */
function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
/**
 * Render GLOST document with proper ruby annotations (legacy - without segments)
 */
function renderDocument(document, transcriptionScheme = 'rtgs', showTranscription = true, showTranslation = true) {
    const words = getAllWords(document);
    if (words.length === 0) {
        return '<div class="empty-state">No words found</div>';
    }
    return words.map((word) => renderWord(word, transcriptionScheme, showTranscription, showTranslation)).join(' ');
}
/**
 * Process endpoint - returns rendered HTML
 */
app.post('/process', async (req, res) => {
    try {
        const { text, transcription: transcriptionScheme = 'rtgs', showTranscription, showTranslation } = req.body;
        // Checkboxes only send 'on' when checked, undefined when unchecked
        const shouldShowTranscription = showTranscription === 'on' || showTranscription === true;
        const shouldShowTranslation = showTranslation === 'on' || showTranslation === true;
        if (!text || !text.trim()) {
            return res.send('<div class="empty-state">Please enter some Thai text...</div>');
        }
        // Convert text to GLOST document (minimal - just for testing)
        // Preserves punctuation and special characters
        const segments = segmentThaiText(text);
        const words = [];
        for (const segment of segments) {
            if (segment.isWord) {
                // It's a word - create a word node (don't strip punctuation from word text)
                const wordText = segment.text.trim();
                if (wordText.length > 0) {
                    words.push(createThaiWord({ text: wordText }));
                }
            }
            else {
                // It's punctuation/whitespace - create a simple marker that will be rendered as-is
                // We store it in a special structure that the renderer will recognize
                words.push({
                    type: 'PunctuationNode',
                    text: segment.text,
                    isPunctuation: true
                });
            }
        }
        // Create document from word nodes only (filtering out punctuation markers)
        const wordNodes = words.filter(w => !w.isPunctuation);
        const document = createSimpleDocument(wordNodes, "th", "thai");
        // Use demo extensions with actual data (presets use skeleton providers without data)
        // Order matters: 
        // 1. Transcription first (for individual words)
        // 2. Word joiner (to combine phrases)
        // 3. Transcription again (for composite words created by word joiner)
        // 4. Translation (on phrases)
        const extensions = [];
        const appliedExtensions = [];
        if (shouldShowTranscription) {
            extensions.push(createThaiTranscriptionExtension());
            appliedExtensions.push('transcription');
        }
        // Word joiner is only needed when translation is enabled (for phrase-level translations)
        if (shouldShowTranslation) {
            extensions.push(createThaiWordJoinerExtension());
            appliedExtensions.push('thai-word-joiner');
            // Run transcription extension again after word joiner to get transcriptions
            // for composite words that were just created
            if (shouldShowTranscription) {
                extensions.push(createThaiTranscriptionExtension());
                appliedExtensions.push('transcription-post-joiner');
            }
        }
        if (shouldShowTranslation) {
            extensions.push(createThaiTranslationExtension("en-US"));
            appliedExtensions.push('translation');
        }
        // Process with demo extensions (even if empty array, this will just return the document as-is)
        const result = await processGLOSTWithExtensionsAsync(document, extensions);
        // Debug logging
        console.log('[Process] showTranscription:', shouldShowTranscription, 'showTranslation:', shouldShowTranslation);
        console.log('[Process] Applied extensions:', appliedExtensions);
        // Render with original segments preserved (punctuation, whitespace)
        const html = renderDocumentWithSegments(result.document, segments, transcriptionScheme, shouldShowTranscription, shouldShowTranslation);
        // Use our tracked extensions instead of result.metadata (which might include all extensions)
        const appliedExts = appliedExtensions.length > 0 ? appliedExtensions : result.metadata.appliedExtensions || [];
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
            console.log(`[Summary] ${wordsWithoutTranscription.length} word(s) without transcription:`, wordsWithoutTranscription.map(w => getWordText(w)).join(", "));
        }
        else {
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
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send(`
      <div class="error">Error: ${error instanceof Error ? error.message : String(error)}</div>
    `);
    }
});
/**
 * Start server with automatic port fallback
 */
function startServer(port) {
    const server = app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
        console.log(`Open http://localhost:${port} in your browser`);
    });
    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${port} is in use, trying ${port + 1}...`);
            startServer(port + 1);
        }
        else {
            console.error('Server error:', err);
            process.exit(1);
        }
    });
}
startServer(PORT);
//# sourceMappingURL=server.js.map