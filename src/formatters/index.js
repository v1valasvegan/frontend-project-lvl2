import complex from './complex';
import plain from './plain';

export default (format) => {
  switch (format) {
    case 'plain': return plain;
    case 'complex': return complex;
    default: return complex;
  }
};
