import _ from 'lodash';

const initialIndent = 2;
const indentStep = 4;

const stringify = (data, iter) => {
  const keys = _.keys(data).sort();
  const result = _.isPlainObject(data) ? `{\n${keys.reduce((acc, curr) => `${acc}${iter(data, curr)}`, '')}  }\n` : `${data}\n`;
  return result;
};

const formatWithIndents = (str) => {
  const rows = str.split('\n');
  let indent = initialIndent;

  return rows.reduce((acc, curr, index, coll) => {
    const previous = coll[index - 1];
    if (previous && previous.slice(-1) === '{') {
      indent += indentStep;
    } else if (curr.slice(-1) === '}') {
      indent -= indentStep;
    }
    return `${acc}\n${' '.repeat(indent)}${curr}`;
  }, '');
};

export default (diff) => {
  const iter = (data, key) => {
    const value = data[key];
    if (_.isString(value)) {
      return `  ${key}: ${value}\n`;
    }
    if (value && !_.isArray(value)) {
      return `  ${key}: ${stringify(value, iter)}`;
    }

    const firstPart = value[0] !== null ? `- ${key}: ${stringify(value[0], iter)}` : '';
    const secondPart = value[1] !== null ? `+ ${key}: ${stringify(value[1], iter)}` : '';
    return `${firstPart}${secondPart}`;
  };

  const keys = _.keys(diff).sort();
  const raw = `${keys.reduce((acc, curr) => `${acc}${iter(diff, curr)}`, '')}`.trimEnd();
  return `{${formatWithIndents(raw)}\n}`;
};
