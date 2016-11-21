import  React, {Component} from "react";
import { inject, observer } from 'mobx-react';

import {Link} from "react-router";
import Row from "./Row.jsx";
import SearchBar from "./SearchBar.jsx";

@inject('routing')
@inject('contacts')
@observer
export default class List extends Component {
  openContact (id) {
    const { push } = this.props.routing;
    push("/contact/"+id);
  }

  render () {
    const { location, push, goBack } = this.props.routing;
    const contactsList = this.props.contacts.filteredContacts;
    // const contacts = contactsList.map((contact) => {
    //   return <li key={contact.id} className="contact-list-item">{contact.fullName}</li>;
    // });
    const listItems = [];
    let lastLetter = "";

    for (let i = 0; i < contactsList.length; i++) {
      let contact = contactsList[i];
      let firstLetter = contact.fullName.substr(0,1);
      if (firstLetter.toUpperCase() != lastLetter) {
        listItems.push(<li className="heading" key={"heading-"+firstLetter}>{firstLetter}</li>);
        lastLetter = firstLetter;
      }
      listItems.push(<Row active={this.props.params.contactID == contact.id} onClick={this.openContact.bind(this, contact.id)} key={contact.id} contact={contact} />);
    }
    return (<div>
      <SearchBar />
      <ul className="contact-list">
        {listItems}
      </ul>
    </div>);
  }

}
