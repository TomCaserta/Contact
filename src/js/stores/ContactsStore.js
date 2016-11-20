import {observable, computed, reaction} from 'mobx';
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
    let filterRegex = new RegExp(".+?"+this.filter+".+?", "ig");
    return this.contacts.filter((contact) => {
      return filterRegex.test(contact.firstName + " " + contat.lastName);
    });
  }

  computeHighestID () {
    var max = 0;
    this.contacts.forEach((contact) => {
      if (contact.id > max) max = contact.id;
    });
    return max;
  }

  addContact ({ firstName, lastName, email, country }) {
    let contact = new ContactModel(this, this.nextID, firstName, lastName, email, country);
    this.contacts.push(contact);
    return contact;
  }

}
