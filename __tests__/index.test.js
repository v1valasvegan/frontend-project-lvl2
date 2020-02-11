import path from 'path';
import fs from 'fs';
import genDiff from '../dist';

const getFixturePath = (name) => path.join(__dirname, '..', '__fixtures__', name);

const formats = ['json', 'yaml', 'ini'];
const configs = formats.map((format) => [getFixturePath(`before.${format}`), getFixturePath(`after.${format}`)]);
const expected = fs.readFileSync(getFixturePath('result.txt'), 'utf-8');
const expectedPlain = fs.readFileSync(getFixturePath('plainResult.txt'), 'utf-8');

describe('gendiff', () => {
  test.each(configs)('%p no format provided', (before, after) => {
    expect(genDiff(before, after)).toEqual(expectedPlain);
  });

  test.each(configs)('%p complex', (before, after) => {
    expect(genDiff(before, after, 'complex')).toEqual(expected);
  });

  test.each(configs)('%p plain', (before, after) => {
    expect(genDiff(before, after, 'plain')).toEqual(expectedPlain);
  });
});
