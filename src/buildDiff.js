import _ from 'lodash';

export default (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const iter = (key) => {
    if (_.isEqual(data1[key], data2[key])) {
      return { [key]: { isEqual: true } };
    }

    const firstPart = _.has(data1, key) ? { value1: data1[key] } : null;
    const secondPart = _.has(data2, key) ? { value2: data2[key] } : null;
    return { [key]: { isEqual: false, ...firstPart, ...secondPart } };
  };

  return keys.reduce((acc, cur) => ({ ...acc, ...iter(cur) }), {});
};
