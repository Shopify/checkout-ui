import {Autocomplete} from '../types';

// Our component API supports full names for all autocomplete attributes.
// This map and the autocompleteToHtml() function map the strings back into
// the values expected by the <input autocomplete /> prop.
const AUTOCOMPLETE_MAP = new Map([
  ['telephone', 'tel'],
  ['credit-card', 'cc'],
  ['birthday', 'bday'],
  ['expiry', 'exp'],
  ['security-code', 'csc'],
  ['instant-message', 'impp'],
]);

export function autocompleteToHtml(autocomplete?: Autocomplete) {
  if (autocomplete == null) return undefined;
  if (autocomplete === false) return 'none';
  if (autocomplete === true) return 'on';

  const {group, field} = autocomplete;

  const normalizedField = field.replace(
    /(?:telephone|credit-card|expiry|security-code|instant-message)/g,
    (part) => AUTOCOMPLETE_MAP.get(part) ?? part,
  );

  return group ? `${group} ${normalizedField}` : normalizedField;
}
