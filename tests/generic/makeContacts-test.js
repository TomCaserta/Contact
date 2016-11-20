import { expect } from 'chai';
import makeContacts from "../test-utils/makeContacts";

// Getting a bit meta in here.
describe("#makeContacts", function() {

  it("should create one fake contact", function() {
    expect(makeContacts()).to.have.all.keys("firstName", "lastName", "country", "email");
  });


  it("should create an array if given an amount parameter", function() {
    expect(makeContacts(1)).to.have.lengthOf(1);
  });
});
