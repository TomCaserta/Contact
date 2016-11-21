import React, {Component} from "react";
import {observer, inject} from "mobx-react";

@inject('contacts')
@observer
export default class SearchBar extends Component {
  onSearchChange (ev) {
    const {contacts} = this.props;
    contacts.filter = ev.target.value;
  }

  render () {
    const {contacts} = this.props;
    return (
      <div className="search-bar">
        <input type="text" onChange={this.onSearchChange.bind(this)} value={contacts.filter} placeholder="Search for contacts..." />
      </div>
    );
  }
}
