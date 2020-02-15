import _ from 'lodash';

const commonTemplate = (path) => `Property '${path}' was `;

const stringify = (value, changed = false) => {
  if (_.isString(value)) {
    return changed ? `'${value}'` : `value: '${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return changed ? `${value}` : `value: ${value}`;
};

const templates = {
  deleted: () => 'deleted',
  added: (_v1, v2) => `added with ${stringify(v2)}`,
  changed: (v1, v2) => `changed from ${stringify(v1, true)} to ${stringify(v2, true)}`,
};

const getState = (value1, value2) => {
  if (value1 !== null && value2 !== null) {
    return 'changed';
  }
  if (value1 !== null) {
    return 'deleted';
  }
  return 'added';
};

const buildPaths = (data, acc) => {
  if (_.isArray(data)) {
    return acc.slice(1);
  }
  if (_.isPlainObject(data)) {
    return _.compact(_.keys(data).flatMap((k) => buildPaths(data[k], `${acc}.${k}`))).sort();
  }
  return null;
};


export default (diff) => {
  const templateData = buildPaths(diff, []).map((path) => [path, _.get(diff, path)]);
  return templateData.map(([path, [value1, value2]]) => {
    const state = getState(value1, value2);
    return `${commonTemplate(path)}${templates[state](value1, value2)}`;
  }).join('\n');
};
