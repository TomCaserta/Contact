import React, { Component, PropTypes } from 'react';
import { observer, inject, PropTypes as MobXPropTypes } from 'mobx-react';
import { computed } from 'mobx';

import ContactForm from '../form/ContactForm';

@inject('routing')
@inject('contacts')
@observer
export default class Edit extends Component {
  static propTypes = {
    contacts: MobXPropTypes.observableObject,
    routing: MobXPropTypes.observableObject,
    params: PropTypes.shape({
      contactID: PropTypes.string.isRequired,
    }),
  };

  @computed get contact() { // eslint-disable-line
    return this.props.contacts.findById(parseInt(this.props.params.contactID, 10));
  }

  onSubmit(contact) {
    this.contact.fillFrom(contact);
    this.props.routing.push(`/contact/${this.contact.id}`);
  }

  render() {
    return <ContactForm onSubmit={this.onSubmit.bind(this)} contact={this.contact} title={`Editing ${this.contact.firstName} ${this.contact.lastName}`} submitText={'Edit Contact'} />;
  }
}
