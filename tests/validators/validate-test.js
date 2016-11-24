import { expect } from 'chai';
import { email, required } from '../../src/js/utils/validators';

describe('Validators', () => {
  describe('email', () => {
    // Simple tests...
    // TODO: Improve on the tests. Especially if the is-email changes
    it('Should be valid if the email is valid', () => {
      const retVal = email('tom@caserta.co.uk');
      expect(retVal.value);
    });

    it('Should be invalid if the email is invalid', () => {
      const retVal = email('Unquoted Email@unquote.co.uk');
      expect(!retVal.value);
    })
  });

  describe('required', () => {
    it('Should be valid if there is an input', () => {
      const retVal = required('value');
      expect(retVal.value);
    });

    it('Should be invalid if there is empty string input', () => {
      const retVal = required('');
      expect(retVal.value);
    });

    it('Should be invalid if there is null input', () => {
      const retVal = required(null);
      expect(retVal.value);
    });
  });
});
