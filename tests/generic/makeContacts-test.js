import { expect } from 'chai';
import makeContacts from '../test-utils/makeContacts';

// Getting a bit meta in here.
describe('#makeContacts', () => {
  it('should create one fake contact', () => {
    expect(makeContacts()).to.have.all.keys('firstName', 'lastName', 'country', 'email');
  });


  it('should create an array if given an amount parameter', () => {
    expect(makeContacts(1)).to.have.lengthOf(1);
  });
});
