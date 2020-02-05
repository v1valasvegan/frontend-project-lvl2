#!/usr/bin/env node

import program from 'commander';
import genDiff from '../../index.js';

program
  .version('1.0.0')
  .option('-f, --format [type]', 'output format')
  .description('Compares two configuration files and shows a difference')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    genDiff(firstConfig, secondConfig);
  })

  program.parse(process.argv);

  


