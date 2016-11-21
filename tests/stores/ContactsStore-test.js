import { expect } from 'chai';
import makeContacts from "../test-utils/makeContacts";
import ContactsStore from "../../src/js/stores/ContactsStore";

describe("ContactsStore", function() {

  it("should store a new contact", function() {
    let contactStore = new ContactsStore();
    contactStore.addContact(makeContacts());
    expect(contactStore.contacts).to.have.lengthOf(1);
  });

  it("should store multiple contacts", function () {
    let contactStore = new ContactsStore();
    let information = makeContacts(2);
    contactStore.addContact(information[0]);
    contactStore.addContact(information[1]);
    expect(contactStore.contacts).to.have.lengthOf(2);
  });

  it("should store a contact with the correct information", function () {
    let contactStore = new ContactsStore();
    let information = makeContacts();
    contactStore.addContact(information);
    expect(contactStore.contacts[0].toJson()).to.include(information);
  });

  it("should assign an ID to a contact", function () {
    let contactStore = new ContactsStore();
    let information = makeContacts();
    contactStore.addContact(information);
    expect(contactStore.contacts[0].id).to.exist;
  });

  it("should remove a deleted contact from the contacts list", function () {
    let contactStore = new ContactsStore();
    let information = makeContacts();
    let contact = contactStore.addContact(information);
    contact.removeContact();
    expect(contactStore.contacts).to.have.lengthOf(0);
  });

  it("should not filter contacts when no filter is given");

  it("should filter contacts when given a filter");

  it("should save contacts to an array");

  it("should load contacts from an array");

});
