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
    name, state, value1, value2 = null,
  } = node;
  const currentIndent = makeIndent(depth, indent);

  if (state === 'unchanged') {
    if (!_.isArray(value1)) {
      return `${currentIndent}  ${name}: ${stringify(value1, depth)}`;
    }
    return `${currentIndent}  ${name}: {\n${value1.map((n) => iter(n, depth + 1)).join('\n')}\n${currentIndent}  }`;
  }
  const isAdded = state === 'added' || state === 'changed';
  const isDeleted = state === 'deleted' || state === 'changed';
  const isChanged = state === 'changed';
  const deletedPart = isDeleted ? `${currentIndent}- ${name}: ${stringify(value1, depth)}` : '';
  const addedPart = isAdded ? `${currentIndent}+ ${name}: ${stringify(value2, depth)}` : '';
  const changedPart = isChanged ? '\n' : '';
  return `${deletedPart}${changedPart}${addedPart}`;
};

export default (diff) => `{\n${diff.map((n) => iter(n, 0)).join('\n')}\n}`;
