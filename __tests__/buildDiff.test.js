import buildDiff from '../src/buildDiff';

let flat1;
let nested1;

beforeEach(() => {
  flat1 = {
    goo: 'gle',
    ya: 'ndex',
  };
  nested1 = { go: { o: 'gle' } };
});

describe('buildDiff', () => {
  it('equal flat', () => {
    const flat2 = { ...flat1 };
    const expected = {
      goo: { isEqual: true },
      ya: { isEqual: true },
    };
    expect(buildDiff(flat1, flat2)).toEqual(expected);
  });

  it('equal nested', () => {
    const nested2 = { ...nested1 };
    const expected = { go: { isEqual: true } };
    expect(buildDiff(nested1, nested2)).toEqual(expected);
  });

  it('different nested', () => {
    const nested2 = { go: { h: 'ome' } };
    const expected = {
      go: {
        isEqual: false,
        value1: { o: 'gle' },
        value2: { h: 'ome' },
      },
    };
    expect(buildDiff(nested1, nested2)).toEqual(expected);
  });
});
