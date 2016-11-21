import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import ProfilePicture from "../contact/ProfilePicture.jsx";
import Flag from '../misc/Flag.jsx';

@inject("contacts")
@observer
export default class View extends Component {

  render () {
    const contact = this.props.contacts.findById(this.props.params.contactID);
    return (<div>
      <div className="contact-display-picture"><ProfilePicture contact={contact} size={200} /></div>
      <h1 className="contact-display-heading">{contact.fullName}</h1>
      <div className="contact-display-info-rows">
        <div><div className="title">First Name</div> <div className="data">{contact.firstName}</div></div>
        <div><div className="title">Last Name</div> <div className="data">{contact.lastName}</div></div>
        <div><div className="title">Email</div> <div className="data">{contact.email}</div></div>
        <div>
          <div className="title">Country</div>
          <div className="data">
          <Flag country={contact.country} height={32} /> {contact.country}</div>
        </div>
      </div>
    </div>);
  }
}
