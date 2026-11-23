export type Rule = (value: any) => true | string;

export const required: Rule = (v) => {
  if (Array.isArray(v)) {
    return v.length > 0 || 'Pole wymagane';
  }
  return (v !== undefined && v !== null && String(v).trim() !== '') || 'Pole wymagane';
};

export const minLength = (n: number): Rule => (v) =>
  (typeof v === 'string' && v.length >= n) || `Minimalna długość: ${n} znaków`;

export const maxLength = (n: number): Rule => (v) =>
  !v || String(v).length <= n || `Maksymalna długość: ${n} znaków`;

export const email: Rule = (v) =>
  /^[^\s@<>()[\]\\,;:"]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(v || '') || 'Adres e-mail nie jest poprawny';

export const sameAs = (other: () => string, message = 'Hasła nie są identyczne'): Rule => (v) =>
  v === other() || message;

// https://gist.github.com/dperini/729294
const LINK_PATTERN = new RegExp(
  '^' +
    '(?:(?:(?:https?|ftp):)?\\/\\/)' +
    '(?:\\S+(?::\\S*)?@)?' +
    '(?:' +
    '(?!(?:10|127)(?:\\.\\d{1,3}){3})' +
    '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})' +
    '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +
    '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' +
    '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' +
    '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' +
    '|' +
    '(?:' +
    '(?:' +
    '[a-z0-9\\u00a1-\\uffff]' +
    '[a-z0-9\\u00a1-\\uffff_-]{0,62}' +
    ')?' +
    '[a-z0-9\\u00a1-\\uffff]\\.' +
    ')+' +
    '(?:[a-z\\u00a1-\\uffff]{2,}\\.?)' +
    ')' +
    '(?::\\d{2,5})?' +
    '(?:[/?#]\\S*)?' +
    '$',
  'i',
);

export const validLink: Rule = (v) => LINK_PATTERN.test(v || '') || 'Link nie jest poprawny';

export const iconName: Rule = (v) => /^[a-zA-Z0-9-]+$/.test(v || '') || 'Niepoprawna nazwa ikony';

export function validate(value: any, rules: Rule[]): string | undefined {
  for (const rule of rules) {
    const result = rule(value);
    if (result !== true) {
      return result;
    }
  }
  return undefined;
}

export function isValid(errors: Record<string, string | undefined>): boolean {
  return Object.values(errors).every((e) => !e);
}
