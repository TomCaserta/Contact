import React, { Component } from 'react';
import { observer, inject, PropTypes as MobXPropTypes } from 'mobx-react';

@inject('contacts')
@observer
export default class SearchBar extends Component {
  static propTypes = {
    contacts: MobXPropTypes.observableObject,
  };

  constructor(props) {
    super(props);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(ev) {
    const { contacts } = this.props;
    contacts.filter = ev.target.value;
  }

  render() {
    const { contacts } = this.props;
    return (
      <div className="search-bar">
        <input type="text" onChange={this.onSearchChange} value={contacts.filter} placeholder="Search for contacts..." />
      </div>
    );
  }
}
