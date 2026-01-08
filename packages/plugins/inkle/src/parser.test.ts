import { describe, it, expect } from 'vitest';
import { parseInkJSON } from './parser';
import * as fs from 'fs';
import * as path from 'path';

// Load the sample JSON
const samplePath = '/workspace/features/call-me-fluent/public/lib/th-TH/child/male/child_easy.json';
// Since we are running in a potentially different cwd, use absolute path or verify existence
const jsonContent = fs.existsSync(samplePath) 
    ? JSON.parse(fs.readFileSync(samplePath, 'utf-8'))
    : null;

describe('parseInkJSON', () => {
  it('should parse child_easy.json correctly', () => {
    if (!jsonContent) {
        console.warn('Sample file not found, skipping test with real data');
        return;
    }

    const root = parseInkJSON(jsonContent, { language: 'th-TH' });
    
    expect(root.type).toBe('RootNode');
    expect(root.lang).toBe('th-TH');
    expect(root.children.length).toBeGreaterThan(0);
    
    const texts = root.children.map(p => {
        if (p.children && p.children.length > 0) {
             const sentence = p.children[0];
             if (sentence.type === 'SentenceNode') {
                 return sentence.originalText;
             }
        }
        return '';
    });
    
    // console.log('Extracted texts:', texts);
    
    // Check for main dialogue
    expect(texts).toContain('หวัดดี! อยากมาเล่นของเล่นที่บ้านเรามั้ย?');
    
    // Check for choices
    expect(texts).toContain('ไปสิ เราชอบเล่นมากเลย!');
    
    // Check structure of nodes
    const firstPara = root.children[0];
    expect(firstPara.type).toBe('ParagraphNode');
    
    const firstSent = firstPara.children[0];
    expect(firstSent.type).toBe('SentenceNode');
    
    const words = firstSent.children;
    expect(words.length).toBeGreaterThan(0);
    expect(words[0].type).toBe('WordNode');
  });

  it('should handle simple mock data', () => {
    const mockJson = {
        root: [
            "^Hello world",
            "\n",
            "ev", "str", "^Choice 1", "/str", "/ev", {"*": ".^.c-0"},
            {"c-0": ["^You chose 1", "\n", "done"]}
        ]
    };

    const root = parseInkJSON(mockJson, { language: 'en' });
    
    const texts = root.children.map(p => {
         const sentence = p.children[0] as any;
         return sentence.originalText;
    });

    expect(texts).toContain('Hello world');
    expect(texts).toContain('Choice 1');
    expect(texts).toContain('You chose 1');
    
    // Check if choices are marked in extras
    // Find the paragraph corresponding to "Choice 1"
    const choicePara = root.children.find(p => (p.children[0] as any).originalText === 'Choice 1');
    expect(choicePara?.extras?.type).toBe('choice');
    
    const textPara = root.children.find(p => (p.children[0] as any).originalText === 'Hello world');
    expect(textPara?.extras?.type).toBeUndefined();
  });
});
