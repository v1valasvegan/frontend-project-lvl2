import yaml from 'js-yaml';
import ini from 'ini';
import * as _ from 'lodash';

const processIni = (iniObj) => {
  const iter = (value) => {
    if (!_.isPlainObject(value)) {
      return parseInt(value, 10) || value;
    }
    return processIni(value);
  };
  const parsedEntries = _.entries(iniObj).map(([key, value]) => [key, iter(value)]);
  return Object.fromEntries(parsedEntries);
};


const mapFormatToParser = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: (config) => processIni(ini.parse(config)),
};

export default (format) => mapFormatToParser[format];
