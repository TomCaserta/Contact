import { parseOneAddress } from 'email-addresses';

export function email(value, options = { emailMessage: 'The email is invalid' }) {
  const valid = parseOneAddress(value);
  if (valid == null) {
    return { isValid: false, reason: options.emailMessage };
  }
  return { isValid: true };
}

export function required(value, options = { requiredMessage: 'This field is required' }) {
  if (value === null || value === '') {
    return { isValid: false, reason: options.requiredMessage };
  }

  return { isValid: true };
}

export function existsIn(value, options = { listMessage: 'You need to select an option' }) {
  if (!options.list || !options.list.includes(value)) {
    return { isValid: false, reason: options.listMessage };
  }
  return { isValid: true };
}
