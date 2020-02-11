#!/usr/bin/env node

import program from 'commander';
import genDiff from '..';

program
  .version('1.0.0')
  .option('-f, --format [plain]', 'choose output format [plain]', 'plain')
  .description('Compares two configuration files and shows a difference')
  .arguments('[format], <firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig, format) => {
    const result = genDiff(firstConfig, secondConfig, format);
    console.log(result);
  });

program.parse(process.argv);
