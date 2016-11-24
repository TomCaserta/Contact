import { default as faker } from 'faker';

function generateFakeContact() {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    country: faker.address.countryCode(),
  };
}

export default function makeContacts(listAmount = 0) {
  if (listAmount <= 0) return generateFakeContact();
  const contacts = [];
  for (let i = 0; i < listAmount; i++) contacts.push(generateFakeContact());
  return contacts;
}
