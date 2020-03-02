import yaml from 'js-yaml';
import ini from 'ini';

export default (format) => {
  const mapFormatToParser = {
    '.json': JSON.parse,
    '.yaml': yaml.safeLoad,
    '.ini': ini.parse,
  };

  return mapFormatToParser[format];
};
