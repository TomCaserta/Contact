import { expect } from 'chai';
import makeContacts from '../test-utils/makeContacts';
import ContactModel from '../../src/js/models/ContactModel';

describe('ContactModel', () => {
  it('should store (in memory) the contact details', () => {
    const info = makeContacts();
    const { firstName, lastName, email, country } = info;
    const contact = new ContactModel(null, 0, firstName, lastName, email, country);
    expect(contact).to.include(info);
  });

  it('should convert to plain JS object with the same information', () => {
    const info = makeContacts();
    const { firstName, lastName, email, country } = info;
    const contact = new ContactModel(null, 0, firstName, lastName, email, country);
    expect(contact.toJS()).to.include(info);
  });

  describe('#hasSameDetails', () => {
    it('should return true if it has the same details', () => {
      const info = makeContacts();
      const { firstName, lastName, email, country } = info;
      const contact = new ContactModel(null, 0, firstName, lastName, email, country);
      expect(contact.hasSameDetails(info));
    });

    it('should return false if it does not have the same details', () => {
      const info = makeContacts();
      const { firstName, lastName, email, country } = info;
      const contact = new ContactModel(null, 0, firstName, lastName, email, country);
      info.firstName = 'Something Here'; // Space separated as makeContacts does not generate.
      expect(!contact.hasSameDetails(info));
    });
  });
});
