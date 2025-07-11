#!/usr/bin/env node

const { program } = require('commander');
const { scanProject } = require('../lib/scanner');
const { mapConnections } = require('../lib/mapper');
const { traceVariable } = require('../lib/tracer');
const { analyzeContracts } = require('../lib/analyzer');
const { visualizeConnections } = require('../lib/visualizer');
const { suggestImprovements } = require('../lib/suggester');
const { generateDocs } = require('../lib/docsGenerator');

program
  .command('scan')
  .description('Analyze the full stack project')
  .option('--project <path>', 'Path to project')
  .option('--analyze-dependencies', 'Analyze dependencies')
  .action((opts) => scanProject(opts));

program
  .command('map')
  .description('Map frontend and backend connections')
  .option('--frontend <path>', 'Frontend path')
  .option('--backend <path>', 'Backend path')
  .action((opts) => mapConnections(opts));

program
  .command('trace')
  .description('Trace variable usage across the stack')
  .option('--variable <name>', 'Name of the variable to trace')
  .option('--across-stack', 'Trace across stack')
  .action((opts) => traceVariable(opts));

program
  .command('contracts')
  .description('Analyze frontend-backend API field contracts')
  .option('--frontend <path>', 'Frontend folder')
  .option('--backend <path>', 'Backend folder')
  .action((opts) => analyzeContracts(opts));

program
  .command('visualize')
  .description('Generate integration flow graph')
  .option('--format <type>', 'Graph format: mermaid | json', 'mermaid')
  .action((opts) => visualizeConnections(opts));

program
  .command('suggest')
  .description('Recommend refactors, optimizations, caching')
  .action(suggestImprovements);

program
  .command('docs')
  .description('Generate API integration markdown documentation')
  .option('--output <file>', 'Output file', 'API_DOC.md')
  .action((opts) => generateDocs(opts));

program.parse(process.argv);
