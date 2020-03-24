import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) return '[complex value]';
  if (_.isString(value)) return `'${value}'`;
  return value;
};

const process = (tree, pathAcc) => {
  const iter = (data, acc) => {
    const {
      name, type, value1, value2, children,
    } = data;
    const newAcc = `${acc}.${name}`;
    const path = `'${newAcc.slice(1)}'`;
    const valuePrefix = (v) => (_.isPlainObject(v) ? '' : 'value: ');

    switch (type) {
      case 'unchanged': return null;
      case 'changed': return `Property ${path} was changed from ${stringify(value1)} to ${stringify(value2)}`;
      case 'nested': return process(children, newAcc);
      case 'deleted': return `Property ${path} was deleted`;
      case 'added': return `Property ${path} was added with ${valuePrefix(value2)}${stringify(value2)}`;
      default: throw new Error(`unknow type ${type}`);
    }
  };

  const processedNodes = tree.map((node) => (iter(node, pathAcc)));
  return _.compact(processedNodes).join('\n');
};

export default (diff) => process(diff, '');
