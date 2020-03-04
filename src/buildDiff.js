import _ from 'lodash';

const buildDiff = (config1, config2) => {
  const iter = (coll1, coll2, key) => {
    const value1 = coll1[key];
    const value2 = coll2[key];

    if (_.has(coll1, key) && _.has(coll2, key)) {
      if (_.isEqual(value1, value2)) {
        return { key, type: 'unchanged', value1 };
      }

      const areBothObjects = (val2, val1) => _.isPlainObject(val1) && _.isPlainObject(val2);

      if (!areBothObjects(value1, value2)) {
        return {
          key, type: 'changed', value1, value2,
        };
      }

      return { key, type: 'unchanged', value: buildDiff(value1, value2) };
    }

    return _.has(coll1, key)
      ? {
        key, type: 'deleted', value1, value2: null,
      }
      : {
        key, type: 'added', value1: null, value2,
      };
  };

  const keys = _.union(_.keys(config1), _.keys(config2)).sort();
  const result = keys.map((key) => iter(config1, config2, key));
  console.log(result);
  return result;
};

export default buildDiff;
