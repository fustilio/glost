/**
 * Frequency Extension Demo
 * 
 * Demonstrates vocabulary prioritization for language learning
 */

import { createFrequencyExtension } from "glost-frequency";
import type { FrequencyProvider } from "glost-frequency";

// ============================================================================
// REAL DATA: British National Corpus (Sample)
// ============================================================================

const BNC_FREQUENCY_DATA = new Map<string, number>([
  // Very Common (100,000+ occurrences)
  ["the", 6187925],
  ["of", 3093874],
  ["and", 2682863],
  ["to", 2396423],
  ["a", 2135904],
  ["in", 1918959],
  ["that", 1090099],
  ["is", 998574],
  ["was", 993174],
  ["it", 913276],
  
  // Common (10,000-100,000 occurrences)
  ["nature", 14523],
  ["makes", 45231],
  ["social", 8934],
  ["media", 5821],
  
  // Uncommon (100-10,000 occurrences)
  ["posts", 234],
  ["challenging", 892],
  
  // Rare (<100 occurrences)
  ["ephemeral", 43],
  ["archival", 127],
]);

// ============================================================================
// PROVIDER IMPLEMENTATION
// ============================================================================

class EnglishFrequencyProvider implements FrequencyProvider {
  constructor(private corpusData: Map<string, number>) {}
  
  async getFrequency(word: string, language: string): Promise<number | undefined> {
    const normalized = word.toLowerCase();
    return this.corpusData.get(normalized);
  }
}

// ============================================================================
// DEMO: Vocabulary Prioritization
// ============================================================================

async function demonstrateVocabularyPrioritization() {
  console.log("\n📊 DEMO: Vocabulary Prioritization\n");
  console.log("=" .repeat(70));
  
  const text = "The ephemeral nature of social media posts makes archival challenging.";
  console.log(`\nInput text:\n"${text}"\n`);
  
  // Create provider
  const provider = new EnglishFrequencyProvider(BNC_FREQUENCY_DATA);
  
  // Create extension
  const [generator, enhancer] = createFrequencyExtension({
    targetLanguage: "en",
    provider
  });
  
  // Mock GLOST document with words
  const words = text.split(/\s+/).map(w => w.replace(/[.,!?]/g, ""));
  
  console.log("Analyzing each word:\n");
  
  // Process each word
  for (const word of words) {
    const frequency = await provider.getFrequency(word, "en");
    
    if (!frequency) {
      console.log(`  ❓ "${word}" - No data`);
      continue;
    }
    
    // Classify by frequency
    let level: string;
    let priority: number;
    let symbol: string;
    
    if (frequency > 100000) {
      level = "Very Common";
      priority = 4;
      symbol = "■■■■";
    } else if (frequency > 10000) {
      level = "Common";
      priority = 3;
      symbol = "■■■□";
    } else if (frequency > 100) {
      level = "Uncommon";
      priority = 2;
      symbol = "■■□□";
    } else {
      level = "Rare";
      priority = 1;
      symbol = "■□□□";
    }
    
    console.log(`  ${symbol} "${word}"`);
    console.log(`      Level: ${level} (${frequency.toLocaleString()} occurrences)`);
    console.log(`      Priority: ${priority}/4 (${priority === 4 ? "Learn FIRST" : priority === 3 ? "Learn soon" : priority === 2 ? "Learn later" : "Learn last"})`);
  }
  
  console.log("\n" + "=".repeat(70));
}

// ============================================================================
// DEMO: Learning Recommendation
// ============================================================================

async function demonstrateLearningRecommendation() {
  console.log("\n🎯 DEMO: Learning Recommendation\n");
  console.log("=" .repeat(70));
  
  const text = "The ephemeral nature of social media posts makes archival challenging.";
  const words = text.split(/\s+/).map(w => w.replace(/[.,!?]/g, ""));
  
  const provider = new EnglishFrequencyProvider(BNC_FREQUENCY_DATA);
  
  const stats = {
    veryCommon: 0,
    common: 0,
    uncommon: 0,
    rare: 0,
    unknown: 0
  };
  
  const studyWords: { word: string; reason: string }[] = [];
  
  for (const word of words) {
    const frequency = await provider.getFrequency(word, "en");
    
    if (!frequency) {
      stats.unknown++;
      continue;
    }
    
    if (frequency > 100000) {
      stats.veryCommon++;
    } else if (frequency > 10000) {
      stats.common++;
      studyWords.push({ 
        word, 
        reason: `Common word (${frequency.toLocaleString()} occurrences) - useful for everyday communication` 
      });
    } else if (frequency > 100) {
      stats.uncommon++;
      studyWords.push({ 
        word, 
        reason: `Uncommon (${frequency.toLocaleString()} occurrences) - learn after mastering common words` 
      });
    } else {
      stats.rare++;
      studyWords.push({ 
        word, 
        reason: `Rare word (${frequency.toLocaleString()} occurrences) - specialized vocabulary, low priority` 
      });
    }
  }
  
  console.log("\n📈 Vocabulary Distribution:\n");
  console.log(`  Very Common: ${stats.veryCommon} words (learn these FIRST)`);
  console.log(`  Common:      ${stats.common} words (learn these NEXT)`);
  console.log(`  Uncommon:    ${stats.uncommon} words (learn these LATER)`);
  console.log(`  Rare:        ${stats.rare} words (learn these LAST)`);
  console.log(`  Unknown:     ${stats.unknown} words (no frequency data)`);
  
  console.log("\n🎓 Study Recommendation:\n");
  console.log(`  To understand this text, you should know:`);
  console.log(`    • ${stats.veryCommon} very common words (you probably know these)`);
  console.log(`    • ${stats.common} common words (focus here!)`);
  console.log(`    • ${stats.uncommon} uncommon words (optional for now)`);
  console.log(`    • ${stats.rare} rare words (skip for now)`);
  
  console.log("\n📝 Vocabulary to Study (by priority):\n");
  studyWords
    .sort((a, b) => {
      const freqA = BNC_FREQUENCY_DATA.get(a.word.toLowerCase()) || 0;
      const freqB = BNC_FREQUENCY_DATA.get(b.word.toLowerCase()) || 0;
      return freqB - freqA; // Higher frequency first
    })
    .forEach(({ word, reason }) => {
      console.log(`  • ${word}`);
      console.log(`    ${reason}`);
    });
  
  console.log("\n" + "=".repeat(70));
}

// ============================================================================
// DEMO: Text Difficulty Assessment
// ============================================================================

async function demonstrateDifficultyAssessment() {
  console.log("\n📚 DEMO: Text Difficulty Assessment\n");
  console.log("=" .repeat(70));
  
  const texts = [
    {
      title: "Children's Story",
      content: "The cat sat on the mat and looked at me."
    },
    {
      title: "News Article",
      content: "The government announced new regulations for social media."
    },
    {
      title: "Academic Paper",
      content: "The ephemeral nature of social media posts makes archival challenging."
    }
  ];
  
  const provider = new EnglishFrequencyProvider(BNC_FREQUENCY_DATA);
  
  for (const { title, content } of texts) {
    const words = content.split(/\s+/).map(w => w.replace(/[.,!?]/g, ""));
    
    let totalFrequency = 0;
    let wordCount = 0;
    let rareCount = 0;
    
    for (const word of words) {
      const frequency = await provider.getFrequency(word, "en");
      if (frequency) {
        totalFrequency += Math.log10(frequency + 1); // Log scale
        wordCount++;
        
        if (frequency < 1000) {
          rareCount++;
        }
      }
    }
    
    const avgLogFrequency = wordCount > 0 ? totalFrequency / wordCount : 0;
    const rarePercentage = (rareCount / words.length) * 100;
    
    let difficulty: string;
    let emoji: string;
    
    if (avgLogFrequency > 4.5 && rarePercentage < 5) {
      difficulty = "Beginner-friendly";
      emoji = "🟢";
    } else if (avgLogFrequency > 3.5 && rarePercentage < 15) {
      difficulty = "Intermediate";
      emoji = "🟡";
    } else {
      difficulty = "Advanced";
      emoji = "🔴";
    }
    
    console.log(`\n${emoji} "${title}"`);
    console.log(`  Text: "${content}"`);
    console.log(`  Difficulty: ${difficulty}`);
    console.log(`  Rare words: ${rarePercentage.toFixed(1)}%`);
    console.log(`  Average frequency score: ${avgLogFrequency.toFixed(2)}`);
  }
  
  console.log("\n" + "=".repeat(70));
}

// ============================================================================
// RUN ALL DEMOS
// ============================================================================

async function main() {
  console.log("\n");
  console.log("╔════════════════════════════════════════════════════════════════════╗");
  console.log("║                    FREQUENCY EXTENSION DEMO                        ║");
  console.log("║                                                                    ║");
  console.log("║  Demonstrates how frequency data enables:                         ║");
  console.log("║  • Vocabulary prioritization (learn high-impact words first)      ║");
  console.log("║  • Text difficulty assessment (beginner vs advanced)              ║");
  console.log("║  • Personalized study recommendations (focus on common words)     ║");
  console.log("╚════════════════════════════════════════════════════════════════════╝");
  
  await demonstrateVocabularyPrioritization();
  await demonstrateLearningRecommendation();
  await demonstrateDifficultyAssessment();
  
  console.log("\n✅ Demo complete!\n");
  console.log("Key Takeaway:");
  console.log("  With frequency data, learners can focus on high-impact vocabulary");
  console.log("  (80% comprehension with 20% of the vocabulary).\n");
}

// Run if executed directly
if (require.main === module) {
  main().catch(console.error);
}

export { main as runFrequencyDemo };
