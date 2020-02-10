import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parsers from './parsers';
import buildDiff from './buildDiff';

const initialIndent = 2;
const indentStep = 4;

const buildFilePath = (filename) => path.resolve(filename);

const stringify = (data, iter) => {
  const isObject = typeof data === 'object';
  const keys = Object.keys(data).sort();
  const result = isObject ? `{\n${keys.reduce((acc, curr) => `${acc}${iter(data, curr)}`, '')}  }\n` : `${data}\n`;
  return result;
};

const formatWithIndents = (str) => {
  const rows = str.split('\n');
  let indent = initialIndent;

  return rows.reduce((acc, curr, index, coll) => {
    const previous = coll[index - 1];
    if (previous && previous.slice(-1) === '{') {
      indent += indentStep;
    } else if (curr.slice(-1) === '}') {
      indent -= indentStep;
    }
    return `${acc}\n${' '.repeat(indent)}${curr}`;
  }, '');
};

const render = (diff) => {
  const iter = (data, key) => {
    const value = data[key];
    if (typeof value === 'string') {
      return `  ${key}: ${value}\n`;
    }
    if (value && !Array.isArray(value)) {
      return `  ${key}: ${stringify(value, iter)}`;
    }

    const firstPart = value[0] !== null ? `- ${key}: ${stringify(value[0], iter)}` : '';
    const secondPart = value[1] !== null ? `+ ${key}: ${stringify(value[1], iter)}` : '';
    return `${firstPart}${secondPart}`;
  };

  const keys = Object.keys(diff).sort();
  const raw = `${keys.reduce((acc, curr) => `${acc}${iter(diff, curr)}`, '')}`.trimEnd();
  return `{${formatWithIndents(raw)}\n}`;
};

export default (firstConfig, secondConfig) => {
  const firstData = fs.readFileSync(buildFilePath(firstConfig), 'utf-8');
  const secondData = fs.readFileSync(buildFilePath(secondConfig), 'utf-8');
  const firstFormat = path.extname(firstConfig);
  const secondFormat = path.extname(secondConfig);
  const firstParsed = parsers[firstFormat](firstData, 'utf-8');
  const secondParsed = parsers[secondFormat](secondData, 'utf-8');
  const diff = buildDiff(firstParsed, secondParsed);
  return render(diff);
};
