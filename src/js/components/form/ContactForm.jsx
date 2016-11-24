import React, { Component, PropTypes } from 'react';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import getCountries from 'country-list';

import ContactModel from '../../models/ContactModel';

import CountrySelector from '../form/CountrySelector';
import InputGroup from '../form/InputGroup';

import { email, required } from '../../utils/validators';

@observer
export default class ContactForm extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    submitText: PropTypes.string.isRequired,
    contact: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      country: PropTypes.string,
    }),
    onSubmit: PropTypes.func,
  };

  @observable errors = { // eslint-disable-line
    firstName: true,
    lastName: true,
    email: true,
    country: true,
  }

  @observable currentContact = {
    firstName: '',
    lastName: '',
    email: '',
    country: '',
  };

  @observable countries = getCountries().getData();

  @computed get hasError() {
    for (const n in this.errors) {
      if ({}.hasOwnProperty.call(this.errors, n)) {
        if (this.errors[n]) return true;
      }
    }
    return false;
  }

  constructor(props) {
    super(props);
    this.resetValues(props.contact);
    if (props.contact instanceof ContactModel) {
      this.removeAllErrors();
    }
  }

  // static getDefaultContact() {
  //   return {
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //     country: 'GB',
  //   };
  // }

  modifyField(name, value) {
    this.currentContact[name] = value;
  }

  attemptSubmit(ev) {
    ev.preventDefault();
    if (!this.hasError) {
      if (this.props.onSubmit) {
        this.props.onSubmit(this.currentContact);
      }
    }
  }

  removeAllErrors() {
    this.errors.firstName = false;
    this.errors.lastName = false;
    this.errors.country = false;
    this.errors.email = false;
  }

  resetValues({ firstName, lastName, email: emailAddress, country }) {
    this.currentContact.firstName = firstName;
    this.currentContact.lastName = lastName;
    this.currentContact.email = emailAddress;
    this.currentContact.country = country;
  }

  modifyError(name, isError) {
    this.errors[name] = isError;
  }

  componentWillReceiveProps(nextProps) {
    if (!ContactModel.hasSameDetails(nextProps.contact, this.props.contact)) {
      this.resetValues(nextProps.contact);
    }
  }

  render() {
    const { firstName, lastName, email: emailAddress, country } = this.currentContact;
    const modField = this.modifyField.bind(this);
    const modError = this.modifyError.bind(this);

    return (<div>
      <h1>{this.props.title}</h1>
      <div className="add-contact-form" >
        <form onSubmit={this.attemptSubmit.bind(this)}>
          <InputGroup onValidate={modError.bind(null, 'firstName')} label="First Name" options={{ requiredMessage: 'Please fill in the first name.' }} validator={required}>
            <input value={firstName} onChange={(ev) => { modField('firstName', ev.target.value); }} className="control" placeholder="First Name" autoComplete={false} />
          </InputGroup>

          <InputGroup onValidate={modError.bind(null, 'lastName')} label="Last Name" options={{ requiredMessage: 'You need to enter a last name.' }} validator={required}>
            <input value={lastName} onChange={(ev) => { modField('lastName', ev.target.value); }} className="control" placeholder="Last Name" autoComplete={false} />
          </InputGroup>

          <InputGroup onValidate={modError.bind(null, 'email')} label="Email" showFirst options={{ emailMessage: 'This email is invalid.', requiredMessage: 'Please enter an email.' }} validator={[required, email]}>
            <input value={emailAddress} onChange={(ev) => { modField('email', ev.target.value); }} className="control" placeholder="Email" autoComplete={false} />
          </InputGroup>

          <InputGroup onValidate={modError.bind(null, 'country')} label="Country" options={{ requiredMessage: 'Please select a country' }} validator={required}>
            <CountrySelector countries={this.countries} value={country} onChange={(value) => { modField('country', value); }} className="country-list" />
          </InputGroup>
          <button disabled={this.hasError} className="btn btn-primary right">{this.props.submitText}</button>
        </form>
      </div>
    </div>);
  }
}
