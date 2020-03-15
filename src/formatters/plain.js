import _ from 'lodash';

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
  nested: (v1, v2) => `changed from ${stringify(v1, true)} to ${stringify(v2, true)}`,
  unchanged: () => '',
};

const buildTemplateData = (data, acc) => {
  const {
    name, type, value1, value2, children,
  } = data;
  const newAcc = `${acc}.${name}`;

  switch (type) {
    case 'unchanged': return null;
    case 'nested': return children.flatMap((item) => buildTemplateData(item, newAcc));
    case 'added': return { data: { type, value1, value2 }, path: newAcc.slice(1) };
    case 'deleted': return { data: { type, value1, value2 }, path: newAcc.slice(1) };
    case 'changed': return { data: { type, value1, value2 }, path: newAcc.slice(1) };
    default: throw new Error(`Unknown type ${type}`);
  }
};

export default (diff) => {
  const processedData = diff.flatMap((item) => buildTemplateData(item, ''));
  const templateData = _.compact(processedData);
  return templateData.map(({ data: { type, value1, value2 }, path }) => (
    `Property '${path}' was ${enumTemplates[type](value1, value2)}`
  )).join('\n');
};
