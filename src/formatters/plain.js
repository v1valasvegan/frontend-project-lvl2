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
  changedNode: (v1, v2) => `changed from ${stringify(v1, true)} to ${stringify(v2, true)}`,
  unchanged: () => '',
};

const buildTemplateData = (data, acc) => {
  const {
    name, type, value1, value2, children,
  } = data;
  const newAcc = `${acc}.${name}`;
  if (type === 'unchanged') {
    return null;
  }

  if (type === 'changedNode') {
    return children.flatMap((item) => buildTemplateData(item, newAcc));
  }

  return { data: { type, value1, value2 }, path: newAcc.slice(1) };
};

export default (diff) => {
  const processedData = diff.flatMap((item) => buildTemplateData(item, ''));
  const templateData = _.compact(processedData);
  return templateData.map(({ data: { type, value1, value2 }, path }) => (
    `${commonTemplate(path)}${enumTemplates[type](value1, value2)}`
  )).join('\n');
};
