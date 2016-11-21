import {observable, computed} from 'mobx';
import {default as md5} from 'md5';

export default class ContactModel {
  store;
  id;
  @observable firstName;
  @observable lastName;
  @observable country;
  @observable email;

  @computed get fullName () {
    return this.firstName + " " + this.lastName;
  }

  constructor (store, id, firstName, lastName, email, country) {
    this.store = store;
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.country = country;
  }

  getProfilePicture (size = 50) {
    return "https://www.gravatar.com/avatar/"+md5(this.email.trim().toLowerCase())+"?s="+size;
  }

  removeContact () {
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
