import fs from 'fs';
import path from 'path';
import parsers from './parsers';
import buildDiff from './buildDiff';
import formatter from './formatters';

const buildFilePath = (filename) => path.resolve(filename);

export default (firstConfig, secondConfig, format) => {
  const firstData = fs.readFileSync(buildFilePath(firstConfig), 'utf-8');
  const secondData = fs.readFileSync(buildFilePath(secondConfig), 'utf-8');
  const firstFormat = path.extname(firstConfig);
  const secondFormat = path.extname(secondConfig);
  const firstParsed = parsers[firstFormat](firstData, 'utf-8');
  const secondParsed = parsers[secondFormat](secondData, 'utf-8');
  const diff = buildDiff(firstParsed, secondParsed);
  return formatter(format)(diff);
};
