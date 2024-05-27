import { get, isObject } from 'lodash';
import lang from 'src/lang';

export default (
  type: string,
  key: string,
  replacement: { attr: string; action?: string },
) => {
  const text: string = get(lang[type], key);
  if (replacement && isObject(replacement)) {
    text.replace(':attr', replacement.attr);
    if (replacement.action) {
      text.replace(':action', replacement?.action);
    }
  }
  return text;
};
