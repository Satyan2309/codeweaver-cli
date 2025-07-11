#!/usr/bin/env node

const {program} =require('commander');
const {scanProject} = require('../lib/scanner');
const {mapConnections} = require('../lib/mapper'); 
const {traceVariable } = require('../lib/tracer');

program
.command('scan')
.description('Analyze the full stack project')
.option('--project <path>' ,'Path to project')
.option('--analyze-dependencies', 'Analyze dependencies')
.action((opts) => scanProject(opts));


program
.command('map')
.description('Map frontend and backend connections')
.option('--frontend <path>','Frontend path')
.option('--backend <path>','Backend path')
.action((opts) => mapConnections(opts));        

program
.command('trace')
.description('Trace variable usage across the stack')
.option('--variable <name>', 'Name of the variable to trace')
.option('--across-stack', 'Trace across stack')
.action((opts) => traceVariable(opts));


program.parse