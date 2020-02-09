import _ from 'lodash';

export default (data1, data2) => {
  const iter = (coll1, coll2, key) => {
    const value1 = coll1[key];
    const value2 = coll2[key];
    if (_.isEqual(value1, value2)) {
      return { [key]: value1 };
    }

    const isBothObjects = typeof value1 === 'object' && typeof value2 === 'object';
    if (_.has(coll1, key) && _.has(coll2, key) && isBothObjects) {
      const innerKeys = _.union(Object.keys(value1), Object.keys(value2));
      return innerKeys.reduce((acc, curr) => {
        acc[key] = { ...acc[key], ...iter(value1, value2, curr) };
        return acc;
      }, {});
    }

    const firstPart = _.has(coll1, key) ? value1 : null;
    const secondPart = _.has(coll2, key) ? value2 : null;
    return { [key]: [firstPart, secondPart] };
  };

  const keys = _.union(Object.keys(data1), Object.keys(data2));
  return keys.reduce((acc, cur) => ({ ...acc, ...iter(data1, data2, cur) }), {});
};
