#!/usr/bin/env node

import { DEFAULT_CONFIGS } from '@tck-training/excel-parser';
import { Command, Option } from 'commander';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ics } from './actions/ics';
import { print } from './actions/print';

const program = new Command();

// Read version from package.json
const packageJson = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8'));
program.name('tck-training').description('TCK Training CLI tool').version(packageJson.version);

// Helper function to add common options to commands
const addCommonOptions = (command: Command): Command => {
  return command
    .argument('<file>', 'Excel file to parse')
    .addOption(
      new Option('-c, --config <name>', 'Name of the config to use')
        .choices(Object.keys(DEFAULT_CONFIGS))
        .makeOptionMandatory()
    )
    .option('-p, --player <name>', 'Player name');
};

// Create commands with shared options
addCommonOptions(program.command('print'))
  .description('print the training calendar on the console')
  .action(print);

addCommonOptions(program.command('ics'))
  .description('create an ics file from the training calendar')
  .action(ics);

program.parse();
