#!/usr/bin/env node
/**
 * GLOST Migration CLI
 * 
 * Command-line interface for migrating GLOST documents
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Type declarations for glost-utils (dynamically imported)
type MigrationResult = {
  nodesUpdated: number;
  changes: Array<{ path: string; oldCode: string; newCode: string }>;
  hasChanges: boolean;
};

type TranscriptionMigrationResult = {
  transcriptionsUpdated: number;
  nodesProcessed: number;
  hasChanges: boolean;
  changes: Array<{ path: string; systems: string[] }>;
};

type GlostUtils = {
  migrateAllLanguageCodes: (doc: any, options?: any) => MigrationResult;
  migrateTranscriptionSchema: (doc: any, options?: any) => TranscriptionMigrationResult;
};

// Import migration functions from glost-utils
async function loadUtils(): Promise<GlostUtils> {
  try {
    // @ts-expect-error - glost-utils is an optional peer dependency
    const utils = await import('glost-utils') as any;
    return {
      migrateAllLanguageCodes: utils.migrateAllLanguageCodes,
      migrateTranscriptionSchema: utils.migrateTranscriptionSchema,
    };
  } catch (error) {
    console.error('Error: glost-utils is required for migration.');
    console.error('Install it with: npm install glost-utils');
    process.exit(1);
  }
}

interface CompleteMigrationResult {
  languageCodes: MigrationResult;
  transcriptionSchema: TranscriptionMigrationResult;
  totalChanges: number;
  success: boolean;
}

async function migrateToV04(doc: any, options: { dryRun?: boolean; addDefaultRegions?: boolean } = {}): Promise<CompleteMigrationResult> {
  const { dryRun = false } = options;
  const utils = await loadUtils();

  const languageCodes = utils.migrateAllLanguageCodes(doc, {
    addDefaultRegions: options.addDefaultRegions ?? true,
    dryRun,
  });

  const transcriptionSchema = utils.migrateTranscriptionSchema(doc, {
    dryRun,
  });

  const totalChanges = languageCodes.changes.length + transcriptionSchema.transcriptionsUpdated;

  return {
    languageCodes,
    transcriptionSchema,
    totalChanges,
    success: true,
  };
}

const args = process.argv.slice(2);

function showHelp() {
  console.log(`
GLOST Migration Tool

Usage:
  glost migrate <command> <path>

Commands:
  v0.3-to-v0.4 <path>      Migrate documents from v0.3.x to v0.4.0
  analyze <path>           Analyze what would be migrated (dry run)
  help                     Show this help message

Options:
  --no-regions            Don't add default regions to language codes
  --dry-run               Show what would change without modifying files

Examples:
  glost migrate v0.3-to-v0.4 ./docs
  glost migrate analyze ./docs/story.glost.json
  glost migrate v0.3-to-v0.4 ./docs --dry-run
`);
}

function isGlostFile(filePath: string): boolean {
  return filePath.endsWith('.glost.json') || filePath.endsWith('.json');
}

function findGlostFiles(dir: string): string[] {
  const files: string[] = [];
  
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        if (entry.name !== 'node_modules' && entry.name !== '.git') {
          files.push(...findGlostFiles(fullPath));
        }
      } else if (entry.isFile() && isGlostFile(entry.name)) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
  }
  
  return files;
}

async function migrateFile(filePath: string, options: { dryRun?: boolean; addDefaultRegions?: boolean }) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const doc = JSON.parse(content);
    
    const result = await migrateToV04(doc, options);
    
    if (result.totalChanges === 0) {
      console.log(`✓ ${filePath} - No changes needed`);
      return { changed: false, file: filePath };
    }
    
    console.log(`${options.dryRun ? '○' : '✓'} ${filePath} - ${result.totalChanges} changes`);
    
    if (result.languageCodes.changes.length > 0) {
      console.log(`  Language codes: ${result.languageCodes.nodesUpdated} nodes updated`);
    }
    
    if (result.transcriptionSchema.transcriptionsUpdated > 0) {
      console.log(`  Transcriptions: ${result.transcriptionSchema.transcriptionsUpdated} updated`);
    }
    
    if (!options.dryRun) {
      fs.writeFileSync(filePath, JSON.stringify(doc, null, 2));
    }
    
    return { changed: true, file: filePath, changes: result.totalChanges };
  } catch (error) {
    console.error(`✗ ${filePath} - Error:`, (error as Error).message);
    return { changed: false, file: filePath, error };
  }
}

async function main() {
  if (args.length === 0 || args[0] === 'help') {
    showHelp();
    process.exit(0);
  }
  
  const command = args[0];
  const targetPath = args[1];
  
  if (!targetPath) {
    console.error('Error: No path provided');
    showHelp();
    process.exit(1);
  }
  
  const options = {
    dryRun: args.includes('--dry-run'),
    addDefaultRegions: !args.includes('--no-regions'),
  };
  
  const fullPath = path.resolve(targetPath);
  
  if (!fs.existsSync(fullPath)) {
    console.error(`Error: Path does not exist: ${fullPath}`);
    process.exit(1);
  }
  
  const stats = fs.statSync(fullPath);
  let files: string[];
  
  if (stats.isDirectory()) {
    files = findGlostFiles(fullPath);
    
    if (files.length === 0) {
      console.log('No GLOST files found in directory');
      process.exit(0);
    }
    
    console.log(`Found ${files.length} GLOST file(s)\n`);
  } else if (stats.isFile()) {
    if (!isGlostFile(fullPath)) {
      console.error('Error: File does not appear to be a GLOST document');
      process.exit(1);
    }
    files = [fullPath];
  } else {
    console.error('Error: Path is neither a file nor a directory');
    process.exit(1);
  }
  
  switch (command) {
    case 'v0.3-to-v0.4':
    case 'v0-to-v04':
    case 'migrate': {
      if (options.dryRun) {
        console.log('DRY RUN - No files will be modified\n');
      }
      
      let totalChanged = 0;
      let totalChanges = 0;
      
      for (const file of files) {
        const result = await migrateFile(file, options);
        if (result.changed) {
          totalChanged++;
          totalChanges += result.changes || 0;
        }
      }
      
      console.log(`\nSummary:`);
      console.log(`  Files processed: ${files.length}`);
      console.log(`  Files ${options.dryRun ? 'needing changes' : 'changed'}: ${totalChanged}`);
      console.log(`  Total changes: ${totalChanges}`);
      
      if (options.dryRun && totalChanged > 0) {
        console.log(`\nRun without --dry-run to apply changes`);
      }
      
      break;
    }
    
    case 'analyze': {
      for (const file of files) {
        try {
          const content = fs.readFileSync(file, 'utf-8');
          const doc = JSON.parse(content);
          const result = await migrateToV04(doc, { dryRun: true });
          
          console.log(`\nFile: ${file}`);
          console.log(`Total changes needed: ${result.totalChanges}`);
          
          if (result.languageCodes.changes.length > 0) {
            console.log(`\nLanguage code changes (${result.languageCodes.changes.length}):`);
            result.languageCodes.changes.slice(0, 5).forEach(change => {
              console.log(`  ${change.path}: ${change.oldCode} → ${change.newCode}`);
            });
            if (result.languageCodes.changes.length > 5) {
              console.log(`  ... and ${result.languageCodes.changes.length - 5} more`);
            }
          }
          
          if (result.transcriptionSchema.changes.length > 0) {
            console.log(`\nTranscription schema changes (${result.transcriptionSchema.changes.length}):`);
            result.transcriptionSchema.changes.slice(0, 5).forEach(change => {
              console.log(`  ${change.path}: systems ${change.systems.join(', ')}`);
            });
            if (result.transcriptionSchema.changes.length > 5) {
              console.log(`  ... and ${result.transcriptionSchema.changes.length - 5} more`);
            }
          }
          
          if (result.totalChanges === 0) {
            console.log('No changes needed');
          }
        } catch (error) {
          console.error(`Error analyzing ${file}:`, (error as Error).message);
        }
      }
      break;
    }
    
    default:
      console.error(`Unknown command: ${command}`);
      showHelp();
      process.exit(1);
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
