import React, { Component } from 'react';
import { Link } from 'react-router';
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react';

@inject('contacts')
@observer
export default class Intro extends Component { // eslint-disable-line
  static propTypes = {
    contacts: MobXPropTypes.observableObject,
  };

  render() {
    const { contacts } = this.props.contacts;

    return (<div>
      <h2>Contacts</h2>
      <p>You currently have {contacts.length} contacts stored.</p>
      <h3>Getting Started</h3>
      <p>Add a contact or search for a contact on the left</p>
      <Link to="/contact/add" className="btn btn-primary">Add a Contact</Link>
    </div>);
  }
}
