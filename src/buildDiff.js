import _ from 'lodash';

const buildDiff = (config1, config2) => {
  const iter = (coll1, coll2, key) => {
    const value1 = coll1[key];
    const value2 = coll2[key];

    if (_.has(coll1, key) && !_.has(coll2, key)) {
      return {
        name: key, type: 'deleted', value1, value2: null,
      };
    }

    if (!_.has(coll1, key) && _.has(coll2, key)) {
      return {
        name: key, type: 'added', value1: null, value2,
      };
    }

    if (_.isEqual(value1, value2)) {
      return { name: key, type: 'unchanged', value1 };
    }

    const areBothObjects = (val2, val1) => _.isPlainObject(val1) && _.isPlainObject(val2);
    if (!areBothObjects(value1, value2)) {
      return {
        name: key, type: 'changed', value1, value2,
      };
    }

    return { name: key, type: 'nested', children: buildDiff(value1, value2) };
  };

  const keys = _.union(Object.keys(config1), Object.keys(config2)).sort();
  return keys.map((key) => iter(config1, config2, key));
};

export default buildDiff;
