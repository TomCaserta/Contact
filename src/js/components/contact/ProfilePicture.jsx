import React, { PropTypes } from 'react';
import ContactModel from '../../models/ContactModel';

export default function ProfilePicture(props) {
  const profilePicture = props.contact.getProfilePicture(props.size || 50);
  const style = {
    width: props.size,
    height: props.size,
    backgroundImage: `url('${profilePicture}')`,
  };
  return (<div className="profile-picture" style={style} />);
}

ProfilePicture.propTypes = {
  size: PropTypes.number,
  contact: PropTypes.instanceOf(ContactModel).isRequired,
};
