import _ from 'lodash';

const indent = 4;
const initial = 2;

const stringify = (val, depth) => {
  if (!_.isPlainObject(val)) {
    return val;
  }
  return Object.keys(val)
    .map((key) => {
      const value = val[key];
      return `{\n${' '.repeat((depth + 1) * indent + initial)}  ${key}: ${stringify(value, depth + 1)}\n${' '.repeat((depth + 1) * indent)}}`;
    })
    .join('\n');
};

const process = (tree, depth = 0) => {
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

export default process;
