import React, {Component} from "react";

export default class ProfilePicture extends Component {
  render () {
    const profilePicture = this.props.contact.getProfilePicture(this.props.size || 50);
    return (<div className="profile-picture" style={{width: this.props.size, height: this.props.size, backgroundImage: "url("+profilePicture+")"}}>

    </div>)
  }
}
