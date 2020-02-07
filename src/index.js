import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parsers from './parsers';

const buildFilePath = (filename) => {
  console.log(filename);
  return path.resolve(filename);
};

const makeAcc = (coll1, coll2) => (acc, key) => {
  if (coll1[key] === coll2[key]) {
    return `${acc}  ${key}: ${coll1[key]}\n`;
  }
  const isKeyIn1 = Object.keys(coll1).includes(key);
  const isKeyIn2 = Object.keys(coll2).includes(key);
  const firstPart = isKeyIn1 ? `- ${key}: ${coll1[key]}\n` : '';
  const secondPart = isKeyIn2 ? `+ ${key}: ${coll2[key]}\n` : '';
  return `${acc}${firstPart}${secondPart}`;
};

export default (firstConfig, secondConfig) => {
  const firstData = fs.readFileSync(buildFilePath(firstConfig), 'utf-8');
  const secondData = fs.readFileSync(buildFilePath(secondConfig), 'utf-8');
  const firstFormat = path.extname(firstConfig);
  const secondFormat = path.extname(secondConfig);
  const firstParsed = parsers[firstFormat](firstData, 'utf-8');
  const secondParsed = parsers[secondFormat](secondData, 'utf-8');
  const keys = _.union(Object.keys(firstParsed), Object.keys(secondParsed));
  const buildAcc = makeAcc(firstParsed, secondParsed);
  const diff = keys.reduce((acc, current) => buildAcc(acc, current), '');
  const result = diff === '' ? '' : `{\n${diff}}`;
  return result;
};
