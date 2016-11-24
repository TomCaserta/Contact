import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';

import ContactModel from '../../models/ContactModel';

import ProfilePicture from '../contact/ProfilePicture';

@observer
export default class Row extends Component {
  static propTypes = {
    push: PropTypes.func,
    link: PropTypes.string,
    contact: PropTypes.instanceOf(ContactModel),
    active: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.changePage = this.changePage.bind(this);
  }

  changePage() {
    if (this.props.push) {
      this.props.push(this.props.link);
    }
  }

  render() {
    const { fullName } = this.props.contact;
    return (<li onMouseDown={this.changePage} className={`contact ${(this.props.active ? 'active' : '')}`}>
      <ProfilePicture contact={this.props.contact} /> <span>{fullName}</span></li>);
  }
}
