import { observable, computed } from 'mobx';
import escapeStringRegexp from 'escape-string-regexp';

import ContactModel from '../models/ContactModel';

export default class ContactsStore {
  _currentID = null;
  @observable contacts = [];
  @observable filter = '';

  /* TODO: Consider replacing this with a UUID generator */
  @computed get nextID() {
    if (this._currentID === null) {
      this._currentID = this.computeHighestID();
    }
    this._currentID += 1;
    return this._currentID;
  }

  @computed get filteredContacts() {
    if (this.filter === '') {
      return this.sortedContacts;
    }
    const filterRegex = new RegExp(`.*${escapeStringRegexp(this.filter)}.*`, 'i');
    return this.sortedContacts.filter(contact => filterRegex.test(contact.fullName));
  }

  @computed get sortedContacts() {
    return this.contacts.sort((a, b) => {
      const nameA = a.fullName.toUpperCase();
      const nameB = b.fullName.toUpperCase();
      return nameA.localeCompare(nameB);
    });
  }

  computeHighestID() {
    let max = 0;
    this.contacts.forEach((contact) => {
      if (contact.id > max) max = contact.id;
    });
    return max;
  }

  findById(id) {
    return this.contacts.find(contact => contact.id === id);
  }

  addContact({ id = this.nextID, firstName, lastName, email, country }) {
    const contact = new ContactModel(this, id, firstName, lastName, email, country);
    this.contacts.push(contact);
    return contact;
  }

  removeContact(contact) {
    this.contacts.remove(contact);
  }

  load(contactsData) {
    for (let i = 0; i < contactsData.length; i++) {
      const contact = contactsData[i];
      if (contact instanceof ContactModel) {
        this.contacts.push(contact);
      } else {
        this.addContact(contact);
      }
    }
    return this;
  }

  toJS() {
    return this.contacts.map(e => e.toJS());
  }
}
