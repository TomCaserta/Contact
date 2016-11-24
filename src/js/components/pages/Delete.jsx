import React, { Component, PropTypes } from 'react';
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react';

@inject('contacts')
@inject('routing')
@observer
export default class Delete extends Component { // eslint-disable-line
  static propTypes = {
    contacts: MobXPropTypes.observableObject,
    routing: MobXPropTypes.observableObject,
    params: PropTypes.shape({
      contactID: PropTypes.string.isRequired,
    }),
  };

  render() {
    const { contactID } = this.props.params;
    const contact = this.props.contacts.findById(parseInt(contactID, 10));
    return (<div className="delete">
      <h1>Are you sure you wish to delete {contact.fullName}?</h1>
      <p>You will no longer have this contact saved in your address book. This is irreversible</p>

      <button onClick={() => this.props.routing.goBack()} className="btn btn-primary">No</button>
      <button onClick={() => { contact.removeContact(); this.props.routing.replace('/'); }} className="btn btn-danger">Yes</button>
    </div>);
  }
}
