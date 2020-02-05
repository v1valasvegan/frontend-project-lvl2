import path from 'path';
import fs from 'fs';
import genDiff from '../dist';


const getFixturePath = (name) => path.join(__dirname, '..', '__fixtures__', name);

test('compare jsons', () => {
  const expected = fs.readFileSync(getFixturePath('result'), 'utf-8');
  const before = getFixturePath('before.json');
  const after = getFixturePath('after.json');
  expect(genDiff(before, after)).toEqual(expected);
});
