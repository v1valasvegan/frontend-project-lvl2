import fs from 'fs';
import path from 'path';
import selectParser from './parsers';
import buildDiff from './buildDiff';
import selectFormatter from './formatters';

export default (config1, config2, format) => {
  const data1 = fs.readFileSync(path.resolve(config1), 'utf-8');
  const data2 = fs.readFileSync(path.resolve(config2), 'utf-8');
  const format1 = path.extname(config1).slice(1);
  const format2 = path.extname(config2).slice(1);
  const parsed1 = selectParser(format1)(data1, 'utf-8');
  const parsed2 = selectParser(format2)(data2, 'utf-8');
  const diff = buildDiff(parsed1, parsed2);
  return selectFormatter(format)(diff);
};
