#!/usr/bin/env node

import program from 'commander';
import genDiff from '..';

program
  .version('1.0.0')
  .option('-f, --format <format>', 'choose output format', 'complex')
  .description('Compares two configuration files and shows a difference')
  .arguments('<firstConfig> <secondConfig> [format]')
  .action((firstConfig, secondConfig) => {
    const result = genDiff(firstConfig, secondConfig, program.format);
    console.log(result);
  });

program.parse(process.argv);
