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

const enumTemplates = {
  deleted: () => 'deleted',
  added: (_v1, v2) => `added with ${stringify(v2)}`,
  changed: (v1, v2) => `changed from ${stringify(v1, true)} to ${stringify(v2, true)}`,
};

const buildTemplateData = (data, acc) => {
  const [name, state, value1, value2] = data;
  const newAcc = `${acc}.${name}`;
  if (state === 'unchanged') {
    return _.isArray(value1) ? value1.flatMap((item) => buildTemplateData(item, newAcc)) : null;
  }
  return { data: { state, value1, value2 }, path: newAcc.slice(1) };
};


export default (diff) => {
  const processedData = diff.flatMap((item) => buildTemplateData(item, ''));
  const templateData = _.compact(processedData);
  return templateData.map(({ data: { state, value1, value2 }, path }) => (
    `${commonTemplate(path)}${enumTemplates[state](value1, value2)}`
  )).join('\n');
};
