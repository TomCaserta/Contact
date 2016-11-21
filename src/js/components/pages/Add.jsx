import React, {Component} from "react";
import {observer, inject} from "mobx-react";

export default class Add extends Component {

  render () {
    return (<div>
      <h1>Add Contact</h1>
      <div className="add-contact-form">
        <div className="group">
          <label>First Name</label>
          <input className="control" placeholder="First Name" />
        </div>
        <div className="group">
          <label>Last Name</label>
          <input className="control" placeholder="Last Name" />
        </div>
        <div className="group">
          <label>Email</label>
          <input className="control" placeholder="Email" />
        </div>
        <div className="group">
          <label>Country</label>
        </div>
        <button className="btn btn-add">Add Contact</button>
      </div>
    </div>);
  }
}
