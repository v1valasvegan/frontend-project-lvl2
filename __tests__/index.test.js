import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const getFixturePath = (name) => path.join(__dirname, '..', '__fixtures__', name);

const formats = ['yaml', 'ini', 'json'];
const configs = formats.map((format) => [getFixturePath(`before.${format}`), getFixturePath(`after.${format}`)]);

describe('gendiff', () => {
  const expected = fs.readFileSync(getFixturePath('result.txt'), 'utf-8');
  const expectedPlain = fs.readFileSync(getFixturePath('plainResult.txt'), 'utf-8');
  const expectedJSON = fs.readFileSync(getFixturePath('jsonResult.json'), 'utf-8');

  test.each(configs)('%p default format', (before, after) => {
    expect(genDiff(before, after)).toEqual(expected);
  });

  test.each(configs)('%p complex', (before, after) => {
    expect(genDiff(before, after, 'complex')).toEqual(expected);
  });

  test.each(configs)('%p plain', (before, after) => {
    expect(genDiff(before, after, 'plain')).toEqual(expectedPlain);
  });

  test.each(configs)('%p json', (before, after) => {
    expect(genDiff(before, after, 'json')).toEqual(expectedJSON);
  });
});
