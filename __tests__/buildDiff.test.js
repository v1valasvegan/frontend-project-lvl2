import buildDiff from '../src/buildDiff';

let nested1;

beforeEach(() => {
  nested1 = {
    goo: 'gle',
    ya: {
      n: 'dex',
    },
  };
});

describe('buildDiff', () => {
  it('equal nested', () => {
    const nested2 = { ...nested1 };
    const expected = { ...nested1 };
    expect(buildDiff(nested1, nested2)).toEqual(expected);
  });

  it('different nested', () => {
    const nested2 = {
      go: 'blin',
      ya: {
        n: 'kee go home',
      },
    };
    const expected = {
      goo: ['gle', null],
      go: [null, 'blin'],
      ya: {
        n: ['dex', 'kee go home'],
      },
    };
    expect(buildDiff(nested1, nested2)).toEqual(expected);
  });
});
