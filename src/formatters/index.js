import complex from './complex';
import plain from './plain';
import json from './json';

export default (format) => {
  switch (format) {
    case 'plain': return plain;
    case 'complex': return complex;
    case 'json': return json;
    default: return complex;
  }
};
