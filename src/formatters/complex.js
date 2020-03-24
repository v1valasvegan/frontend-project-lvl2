import _ from 'lodash';

const indent = 4;
const initial = 2;

const stringify = (val, depth) => {
  if (!_.isPlainObject(val)) {
    return val;
  }
  return Object.keys(val)
    .map((key) => {
      const currentValue = stringify(val[key], depth + 1);
      const currentDepth = (depth + 1) * indent;
      return `{\n${' '.repeat(currentDepth + initial)}  ${key}: ${currentValue}\n${' '.repeat(currentDepth)}}`;
    })
    .join('\n');
};

const process = (tree, depth) => {
  const iter = (node, dep) => {
    const {
      name, type, value1, value2 = null, children,
    } = node;
    const currentIndent = ' '.repeat((dep) * indent + initial);

    switch (type) {
      case 'unchanged': return `${currentIndent}  ${name}: ${stringify(value1, dep)}`;
      case 'nested': return `${currentIndent}  ${name}: ${process(children, dep + 1)}`;
      case 'added': return `${currentIndent}+ ${name}: ${stringify(value2, dep)}`;
      case 'deleted': return `${currentIndent}- ${name}: ${stringify(value1, dep)}`;
      case 'changed': return `${currentIndent}- ${name}: ${stringify(value1, dep)}\n${currentIndent}+ ${name}: ${stringify(value2, dep)}`;
      default: throw new Error(`Unknown type ${type}`);
    }
  };

  return `{\n${tree.map((n) => iter(n, depth)).join('\n')}\n${' '.repeat(depth * indent)}}`;
};

export default (diff) => process(diff, 0);
