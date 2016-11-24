import React, { Component, PropTypes } from 'react';
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react';
import ProfilePicture from '../contact/ProfilePicture';
import Flag from '../misc/Flag';

@inject('contacts')
@observer
export default class View extends Component { // eslint-disable-line
  static propTypes = {
    contacts: MobXPropTypes.observableObject,
    params: PropTypes.shape({
      contactID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  };

  render() {
    const contact = this.props.contacts.findById(parseInt(this.props.params.contactID, 10));
    return (<div>
      <div className="contact-display-picture"><ProfilePicture contact={contact} size={200} /></div>
      <h1 className="contact-display-heading">{contact.fullName}</h1>
      <div className="contact-display-info-rows">
        <div><div className="title">First Name</div> <div className="data">{contact.firstName}</div></div>
        <div><div className="title">Last Name</div> <div className="data">{contact.lastName}</div></div>
        <div><div className="title">Email</div> <div className="data">
          <a target="_blank" rel="noopener noreferrer" href={`mailto:${contact.email}`} >{contact.email}</a>
        </div></div>
        <div>
          <div className="title">Country</div>
          <div className="data">
            <Flag country={contact.country} height={32} /><br /> {contact.countryName}</div>
        </div>
      </div>
    </div>);
  }
}
