import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const buildFilePath = (filename) => {
  console.log(filename);
  return path.resolve(filename);
};

const makeAcc = (coll1, coll2) => (acc, key) => {
  if (coll1[key] === coll2[key]) {
    return `${acc}${key}: ${coll1[key]}\n`;
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
  const firstJSON = JSON.parse(firstData);
  const secondJSON = JSON.parse(secondData);
  const keys = _.union(Object.keys(firstJSON), Object.keys(secondJSON));
  const buildAcc = makeAcc(firstJSON, secondJSON);
  const diff = keys.reduce((acc, current) => buildAcc(acc, current), '');
  const result = diff === '' ? '' : `{\n${diff}}`;
  console.log(result);
  return result;
};
