#!/usr/bin/env node

import program from 'commander';

program
  .version('1.0.0')
  .option('-f, --format [type]', 'output format')
  .description('Compares two configuration files and shows a difference')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    firstConfigValue = firstConfig;
    secondConfigValue = secondConfig;
  })

  program.parse(process.argv);
