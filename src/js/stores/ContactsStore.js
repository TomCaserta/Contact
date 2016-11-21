import {observable, computed, reaction} from 'mobx';
import {default as escapeStringRegexp} from 'escape-string-regexp';

import ContactModel from "../models/ContactModel";

export default class ContactsStore {
  _currentID = null;
  @observable contacts = [];
  @observable filter = "";

  /* TODO: Consider replacing this with a UUID generator */
  @computed get nextID () {
    if (this._currentID == null) {
      this._currentID = this.computeHighestID();
    }
    this._currentID++;
    return this._currentID;
  }

  @computed get filteredContacts () {
    if (this.filter === "") {
      return this.sortedContacts;
    }
    let filterRegex = new RegExp(".*"+escapeStringRegexp(this.filter)+".*", "i");
    return this.sortedContacts.filter((contact) => {
      return filterRegex.test(contact.fullName);
    });
  }

  @computed get sortedContacts () {
    return this.contacts.sort(function(a, b) {
        var nameA = a.fullName.toUpperCase();
        var nameB = b.fullName.toUpperCase();
        return nameA.localeCompare(nameB);
    });
  }

  computeHighestID () {
    var max = 0;
    this.contacts.forEach((contact) => {
      if (contact.id > max) max = contact.id;
    });
    return max;
  }

  findById (id) {
    return this.contacts.find((contact) => contact.id == id);
  }

  addContact ({ firstName, lastName, email, country }) {
    let contact = new ContactModel(this, this.nextID, firstName, lastName, email, country);
    this.contacts.push(contact);
    return contact;
  }

  removeContact (contact) {
    this.contacts.remove(contact);
  }

  load (contactsData) {
    let contacts = [];
    for (let i = 0; i < contactsData.length; i++) {
      let contact = contactsData[i];
      if (contact instanceof ContactModel) {
        this.contacts.push(contact);
      }
      else {
        this.addContact(contact);
      }
    }
    return this;
  }

}
