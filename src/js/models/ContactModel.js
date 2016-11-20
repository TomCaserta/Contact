import {observable} from 'mobx';

export default class ContactModel {
  store;
  id;
  @observable firstName;
  @observable lastName;
  @observable country;
  @observable email;

  constructor (store, id, firstName, lastName, email, country) {
    this.store = store;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.country = country;
  }

  destroy () {
    this.store.removeContact(this);
  }


  // Method probably not needed outright
  // but we want to make sure in the future
  // if we add to this that we only have the
  // fields we want saved.
  toJson () {
    return {
      "id": this.id,
      "firstName": this.firstName,
      "lastName": this.lastName,
      "country": this.country,
      "email": this.email
    };
  }

  static fromJson (store, contact) {
    return new ContactModel(store, contact.id, contact.firstName, contact.lastName, contact.email, contact.country);
  }
}
