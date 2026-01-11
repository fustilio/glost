#!/usr/bin/env node
/**
 * GLOST CLI
 * 
 * Command-line interface for GLOST plugin management.
 * 
 * @packageDocumentation
 */

import {
  listPlugins,
  searchPlugins,
  showPluginInfo,
  validatePlugins,
  showStats,
  createPluginTemplate,
} from "./commands/plugins.js";

const args = process.argv.slice(2);
const command = args[0];
const subcommand = args[1];

function showHelp(): void {
  console.log(`
GLOST CLI - Plugin Management Tool

Usage:
  glost plugins <command> [options]

Commands:
  list [--category=<cat>] [--language=<lang>] [--verbose]
    List all available plugins
    
  search <keyword> [--category=<cat>] [--language=<lang>]
    Search for plugins by keyword
    
  info <plugin-id>
    Show detailed information about a plugin
    
  validate <plugin1> <plugin2> ...
    Validate plugin combinations for conflicts and dependencies
    
  stats
    Show registry statistics
    
  create <plugin-name>
    Generate a plugin template
    
  help
    Show this help message

Options:
  --category=<category>   Filter by category (transformer, enhancer, generator, analyzer, utility)
  --language=<lang>       Filter by language support (th, ja, ko, en, etc.)
  --verbose, -v           Show detailed information

Examples:
  glost plugins list
  glost plugins list --category=enhancer --verbose
  glost plugins search transcription
  glost plugins info glost-transcription
  glost plugins validate transcription translation frequency
  glost plugins stats
  glost plugins create MyCustomPlugin
`);
}

function parseOptions(args: string[]): Record<string, any> {
  const options: Record<string, any> = {};
  
  for (const arg of args) {
    if (arg.startsWith("--")) {
      const [key, value] = arg.slice(2).split("=");
      if (value) {
        options[key!] = value;
      } else {
        options[key!] = true;
      }
    } else if (arg.startsWith("-")) {
      const key = arg.slice(1);
      options[key] = true;
    }
  }
  
  return options;
}

// Main command router
if (command === "plugins") {
  const options = parseOptions(args.slice(2));
  
  switch (subcommand) {
    case "list": {
      listPlugins({
        category: options.category,
        language: options.language,
        verbose: options.verbose || options.v,
      });
      break;
    }
    
    case "search": {
      const keyword = args[2];
      if (!keyword || keyword.startsWith("--")) {
        console.error("Error: search requires a keyword");
        process.exit(1);
      }
      searchPlugins(keyword, {
        category: options.category,
        language: options.language,
        tags: options.tags ? options.tags.split(",") : undefined,
      });
      break;
    }
    
    case "info": {
      const pluginId = args[2];
      if (!pluginId) {
        console.error("Error: info requires a plugin ID");
        process.exit(1);
      }
      showPluginInfo(pluginId);
      break;
    }
    
    case "validate": {
      const pluginIds = args.slice(2).filter((arg) => !arg.startsWith("--"));
      if (pluginIds.length === 0) {
        console.error("Error: validate requires at least one plugin ID");
        process.exit(1);
      }
      validatePlugins(pluginIds);
      break;
    }
    
    case "stats": {
      showStats();
      break;
    }
    
    case "create": {
      const pluginName = args[2];
      if (!pluginName) {
        console.error("Error: create requires a plugin name");
        process.exit(1);
      }
      createPluginTemplate(pluginName);
      break;
    }
    
    case "help":
    case undefined: {
      showHelp();
      break;
    }
    
    default: {
      console.error(`Unknown command: ${subcommand}`);
      console.error('Run "glost plugins help" for usage information');
      process.exit(1);
    }
  }
} else if (command === "help" || command === "--help" || command === "-h" || !command) {
  showHelp();
} else {
  console.error(`Unknown command: ${command}`);
  console.error('Run "glost help" for usage information');
  process.exit(1);
}
