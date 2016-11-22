import React, {Component} from "react";
import ProfilePicture from "../contact/ProfilePicture.jsx";

export default class Row extends Component {
  render () {
    const {fullName} = this.props.contact;
    return (<li onMouseDown={this.props.onClick} className={"contact " + (this.props.active?"active":"")}>
    <ProfilePicture contact={this.props.contact} /> <span>{fullName}</span></li>);
  }
}
