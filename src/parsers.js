import yaml from 'js-yaml';
import ini from 'ini';

const mapFormatToParser = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: ini.parse,
};

export default (format) => mapFormatToParser[format];
