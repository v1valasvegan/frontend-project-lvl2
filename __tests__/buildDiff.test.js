import path from 'path';
import fs from 'fs';
import buildDiff from '../dist/buildDiff';
import parsers from '../src/parsers';

const getFixturePath = (name) => path.join(__dirname, '..', '__fixtures__', name);

const trim = (str) => {
  const strings = str.split('\n').map((string) => string.trim());
  return strings.join('');
};

const processFixture = (fixture) => {
  const format = path.extname(fixture);
  const data = fs.readFileSync(getFixturePath(fixture), 'utf-8');
  return parsers[format](data, 'utf-8');
};

const formats = ['yaml', 'ini', 'json'];
const configs = formats.map((format) => [processFixture(`before.${format}`), processFixture(`after.${format}`)]);
const expectedRaw = fs.readFileSync(getFixturePath('diff.txt'), 'utf-8');

test.each(configs)('%p', (config1, config2) => {
  expect(JSON.stringify(buildDiff(config1, config2))).toEqual(trim(expectedRaw));
});
