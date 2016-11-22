import React, {Component} from "react";
import {observable} from "mobx"
import {observer, inject} from "mobx-react";

@inject("contacts")
@observer
export default class Add extends Component {
  @observable currentContact = this.getDefaultContact();

  getDefaultContact () {
    return {
      "firstName": "",
      "lastName": "",
      "email": "",
      "country": "GB"
    };
  }

  modifyField (name, value) {
    this.currentContact[name] = value;
  }

  attemptSubmit () {
    this.props.contacts.addContact(this.currentContact);
    this.currentContact = this.getDefaultContact();
  }

  render () {
    const {firstName, lastName, email, country} = this.currentContact;

    return (<div>
      <h1>Add Contact</h1>
      <div className="add-contact-form">
        <div className="group">
          <label>First Name</label>
          <input value={firstName} onChange={(ev) => { this.modifyField("firstName", ev.target.value); }} className="control" placeholder="First Name" />
        </div>
        <div className="group">
          <label>Last Name</label>
          <input value={lastName} onChange={(ev) => { this.modifyField("lastName", ev.target.value); }} className="control" placeholder="Last Name" />
        </div>
        <div className="group">
          <label>Email</label>
          <input value={email} onChange={(ev) => { this.modifyField("email", ev.target.value); }} className="control" placeholder="Email" />
        </div>
        <div className="group">
          <label>Country</label>
          <input value={country} onChange={(ev) => { this.modifyField("country", ev.target.value); }} className="control" placeholder="Country" />
        </div>
        <button onClick={this.attemptSubmit.bind(this)} className="btn btn-add">Add Contact</button>
      </div>
    </div>);
  }
}
