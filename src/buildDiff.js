import _ from 'lodash';

export default (config1, config2) => {
  const iter = (coll1, coll2, key) => {
    const value1 = coll1[key];
    const value2 = coll2[key];
    if (_.isEqual(value1, value2)) {
      return [key, 'unchanged', value1];
    }

    const areBothObjects = (val2, val1) => _.isPlainObject(val1) && _.isPlainObject(val2);

    if (_.has(coll1, key) && _.has(coll2, key)) {
      if (!areBothObjects(value1, value2)) {
        return [key, 'changed', value1, value2];
      }
      const keys = _.union(_.keys(value1), _.keys(value2)).sort();
      const children = keys.reduce((acc, curr) => [...acc, iter(value1, value2, curr)], []);
      return [key, 'unchanged', children];
    }

    return _.has(coll1, key) ? [key, 'deleted', value1] : [key, 'added', value2];
  };

  const keys = _.union(_.keys(config1), _.keys(config2));
  return keys.reduce((acc, key) => [...acc, iter(config1, config2, key)], []);
};
