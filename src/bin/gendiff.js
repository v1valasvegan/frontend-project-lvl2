#!/usr/bin/env node

import program from 'commander';
import genDiff from '..';

program
  .version('1.0.0')
  .option('-f, --format [complex]', 'choose output format [complex]', 'complex')
  .description('Compares two configuration files and shows a difference')
  .arguments('<firstConfig> <secondConfig> [format]')
  .action((firstConfig, secondConfig, format) => {
    const result = genDiff(firstConfig, secondConfig, format);
    console.log(result);
  });

program.parse(process.argv);
