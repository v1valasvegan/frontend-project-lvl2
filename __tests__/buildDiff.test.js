import buildDiff from '../src/buildDiff';

let flat1;
let nested1;

// const flat1 = { foo: 'bar', fee: 'beer', faa: 'bur'};
// const flat2 = { foo: 'bar', fee: 'bar', fuu: 'nk'};

// const ast = {
//   foo: bar,
//   fee: ['beer', 'bar'],
//   faa: ['bur', null]
//   fuu: [null, 'nk'],
// };

// const nested1 = { foo: { bar: 'baz', bir: 'biz', bur: 'buz' } };
// const nestet2 = { foo: { bar: 'baz, bir: bur', blir: 'blur' } };
// const ast = { 
//   foo: [
//     { bar: baz}
//   ]
// }


// ast = {
//   go: {
//     o: [
//       'gle'
//     ]
//   }
//   ]
// }
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
