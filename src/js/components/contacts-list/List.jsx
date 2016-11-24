import React, { Component, PropTypes } from 'react';
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react';

import Row from './Row';
import SearchBar from './SearchBar';
import Heading from './Heading';

@inject('routing')
@inject('contacts')
@observer
export default class List extends Component { // eslint-disable-line
  static propTypes = {
    routing: MobXPropTypes.observableObject,
    contacts: MobXPropTypes.observableObject,
    params: PropTypes.shape({
      contactID: PropTypes.string,
    }),
  };

  render() {
    const { push } = this.props.routing;
    const contactsList = this.props.contacts.filteredContacts;
    const selectedContactID = parseInt(this.props.params.contactID, 10);
    const listItems = [];

    /* TODO: Move the lastLetter/firstLetter check and refactor into a
     *       sortKey to allow for different headings and sorts
     */
    let prevLetter = '';

    for (let i = 0; i < contactsList.length; i++) {
      const contact = contactsList[i];
      const firstLetter = contact.fullName.substr(0, 1);

      if (firstLetter.toUpperCase() !== prevLetter.toUpperCase()) {
        listItems.push(<Heading key={`heading-${firstLetter}`} title={firstLetter} />);
        prevLetter = firstLetter;
      }

      listItems.push(<Row
        active={selectedContactID === contact.id}
        key={contact.id}
        contact={contact}
        push={push}
        link={`/contact/${contact.id}`}
      />);
    }
    return (<div>
      <SearchBar />
      <ul className="contact-list">
        {listItems}
      </ul>
    </div>);
  }

}
