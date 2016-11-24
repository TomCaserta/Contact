import { expect } from 'chai';
import makeContacts from '../test-utils/makeContacts';
import ContactsStore from '../../src/js/stores/ContactsStore';

describe('ContactsStore', () => {
  it('should store a new contact', () => {
    const contactStore = new ContactsStore();
    contactStore.addContact(makeContacts());
    expect(contactStore.contacts).to.have.lengthOf(1);
  });

  it('should store multiple contacts', () => {
    const contactStore = new ContactsStore();
    const information = makeContacts(2);
    contactStore.addContact(information[0]);
    contactStore.addContact(information[1]);
    expect(contactStore.contacts).to.have.lengthOf(2);
  });

  it('should store a contact with the correct information', () => {
    const contactStore = new ContactsStore();
    const information = makeContacts();
    contactStore.addContact(information);
    expect(contactStore.contacts[0].toJS()).to.include(information);
  });

  it('should assign an ID to a contact', () => {
    const contactStore = new ContactsStore();
    const information = makeContacts();
    contactStore.addContact(information);
    expect(contactStore.contacts[0].id).to.exist;
  });

  it('should remove a deleted contact from the contacts list', () => {
    const contactStore = new ContactsStore();
    const information = makeContacts();
    const contact = contactStore.addContact(information);
    contact.removeContact();
    expect(contactStore.contacts).to.have.lengthOf(0);
  });

  it('should not filter contacts when no filter is given', () => {
    const contactStore = new ContactsStore().load(makeContacts(100));
    expect(contactStore.filteredContacts).to.have.lengthOf(100);
  });

  it('should filter contacts when given a filter', () => {
    const contactStore = new ContactsStore().load([
      {
        firstName: 'Tom',
        lastName: 'Caserta',
        email: 'hey@hey.com',
        country: 'GB',
      },
      {
        firstName: 'Maria Jose',
        lastName: 'Molina Castellanos',
        email: 'hey@hey.com',
        country: 'GB',
      },
    ]);
    contactStore.filter = 'Tom';
    expect(contactStore.filteredContacts).to.have.lengthOf(1);
  });

  it('should load contacts from an array', () => {
    let info = [
      {
        firstName: 'Tom',
        lastName: 'Caserta',
        email: 'hey@hey.com',
        country: 'GB',
      },
      {
        firstName: 'Maria Jose',
        lastName: 'Molina Castellanos',
        email: 'hey@hey.com',
        country: 'GB',
      },
    ];
    const contactStore = new ContactsStore().load(info);
    let res = [];
    for (let i = 0; i < contactStore.contacts.length; i++) {
      res.push(contactStore.contacts[i].hasSameDetails(info[i]));
    }
    expect(res).to.deep.equal([true, true]);
  });
});
