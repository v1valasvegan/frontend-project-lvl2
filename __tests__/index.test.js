import path from 'path';
import fs from 'fs';
import genDiff from '../dist';

const formats = ['json'];
let expected;

const getFixturePath = (name) => path.join(__dirname, '..', '__fixtures__', name);

beforeAll(() => {
  expected = fs.readFileSync(getFixturePath('result'), 'utf-8');
});


test.each(formats)('%p', (format) => {
  const before = getFixturePath(`before.${format}`);
  const after = getFixturePath(`after.${format}`);
  expect(genDiff(before, after)).toEqual(expected);
});
