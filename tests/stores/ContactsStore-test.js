import { expect } from 'chai';
import ContactsStore from "../../src/js/stores/ContactsStore";

describe("ContactsStore", function() {

  it("should store a new contact", function() {
    let contactStore = new ContactsStore();
    contactStore.addContact({
      "firstName": "Tom",
      "lastName": "Caserta",
      "email": "tom@caserta.co.uk",
      "country": "UK"
    });
    expect(contactStore.contacts.length).to.equal(1);
  });

  it("should store a contact with the correct information");

  it("should store multiple contacts");

  it("should assign an ID to a contact");

  it("should not filter contacts when no filter is given");

  it("should filter contacts when given a filter");

  it("should remove a deleted contact from the contacts list");

  it("should save contacts to an array");

  it("should load contacts from an array");

});
