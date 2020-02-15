import _ from 'lodash';

const process = (data) => {
  if (_.isPlainObject(data)) {
    const sortedKeys = _.keys(data).sort();
    return sortedKeys.reduce((acc, key) => ({ ...acc, [key]: process(data[key]) }), {});
  }
  return data;
};

export default (diff) => JSON.stringify(process(diff));
