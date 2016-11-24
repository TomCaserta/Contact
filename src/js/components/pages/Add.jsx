import React, { Component } from 'react';
import { observer, inject, PropTypes as MobXPropTypes } from 'mobx-react';
import { observable } from 'mobx';

import ContactForm from '../form/ContactForm';

@inject('routing')
@inject('contacts')
@observer
export default class Add extends Component {
  static propTypes = {
    contacts: MobXPropTypes.observableObject,
    routing: MobXPropTypes.observableObject,
  };

  static getDefaultContact() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      country: '',
    };
  }

  @observable workingContact = Add.getDefaultContact(); // eslint-disable-line

  onSubmit(contact) {
    const newContact = this.props.contacts.addContact(contact);
    this.workingContact = Add.getDefaultContact();
    this.props.routing.push(`/contact/${newContact.id}`);
  }

  render() {
    return <ContactForm onSubmit={this.onSubmit.bind(this)} contact={this.workingContact} title={'Create a new contact...'} submitText={'Add Contact'} />;
  }
}
