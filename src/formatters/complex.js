import _ from 'lodash';

const indent = 4;
const initial = 2;

const makeIndent = (dep, ind) => ' '.repeat(dep * ind + initial);

const stringify = (val, depth) => {
  if (!_.isPlainObject(val)) {
    return val;
  }
  return _.keys(val)
    .map((key) => {
      const value = val[key];
      return `{\n${makeIndent(depth + 1, indent)}  ${key}: ${stringify(value, depth + 1)}\n${makeIndent(depth, indent)}  }`;
    })
    .join('\n');
};


const iter = (node, depth) => {
  const {
    name, type, value1, value2 = null, children,
  } = node;
  const currentIndent = makeIndent(depth, indent);

  switch (type) {
    case 'unchanged': {
      return `${currentIndent}  ${name}: ${stringify(value1, depth)}`;
    }
    case 'changedNode': {
      return `${currentIndent}  ${name}: {\n${children.map((n) => iter(n, depth + 1)).join('\n')}\n${currentIndent}  }`;
    }
    case 'added': {
      return `${currentIndent}+ ${name}: ${stringify(value2, depth)}`;
    }
    case 'deleted': {
      return `${currentIndent}- ${name}: ${stringify(value1, depth)}`;
    }
    case 'changed': {
      return `${currentIndent}- ${name}: ${stringify(value1, depth)}\n${currentIndent}+ ${name}: ${stringify(value2, depth)}`;
    }
    default: {
      throw new Error(`Unknown type ${type}`);
    }
  }
};

export default (diff) => `{\n${diff.map((n) => iter(n, 0)).join('\n')}\n}`;
