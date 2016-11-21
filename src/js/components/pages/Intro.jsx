import  React, {Component} from "react";
import {Link} from "react-router";
import { inject, observer } from 'mobx-react';

@inject('routing')
@observer
export default class ContactsIntro extends Component {

  render () {

    const { location, push, goBack } = this.props.routing;
    return (<div>
      <h2>Connect</h2>
      <p>The revolutionary way to manage your contacts</p>
      <h3>Getting Started</h3>
      <p>Something about adding a contact etc</p>
    </div>);
  }

}
