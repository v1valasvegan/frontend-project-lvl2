import program from 'commander';

program.version = (0.0.1);
program.option('-V', '--version', 'output the version number');
program.option('-h', '--help', 'output usage information');

program.parse(process.argv);

if (program.help) {
  console.log(program.opts());
}