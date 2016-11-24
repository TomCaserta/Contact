import { observable, computed } from 'mobx';
import md5 from 'md5';
import getCountries from 'country-list';

const COUNTRIES = getCountries();

export default class ContactModel {

  static hasSameDetails(contact, other) {
    if (other.firstName !== contact.firstName) return false;
    if (other.lastName !== contact.lastName) return false;
    if (other.email !== contact.email) return false;
    if (other.country !== contact.country) return false;
    return true;
  }

  store;
  id;
  @observable firstName;
  @observable lastName;
  @observable country;
  @observable email;

  @computed get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  @computed get countryName() {
    return COUNTRIES.getName(this.country);
  }

  constructor(store, id, firstName, lastName, email, country) {
    this.store = store;
    this.id = id;
    this.fillFrom({ firstName, lastName, email, country });
  }

  getProfilePicture(size = 50) {
    return `https://www.gravatar.com/avatar/${md5(this.email.trim().toLowerCase())}?d=identicon&=${size}`;
  }

  removeContact() {
    this.store.removeContact(this);
  }

  fillFrom({ firstName, lastName, email, country }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.country = country;
  }

  hasSameDetails(other) {
    return ContactModel.hasSameDetails(this, other);
  }

  toJS() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      country: this.country,
      email: this.email,
    };
  }

  static fromJson(store, contact) {
    return new ContactModel(store,
      contact.id,
      contact.firstName,
      contact.lastName,
      contact.email,
      contact.country);
  }
}
