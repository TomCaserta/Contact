import React, { Component, PropTypes } from 'react';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import escapeStringRegexp from 'escape-string-regexp';
import getCountries from 'country-list';
import Flag from '../misc/Flag';

/** TODO: Create generic selector component that CountrySelector extends for
          reusability
 */

@observer
export default class CountrySelector extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onMouseOut: PropTypes.func,
    className: PropTypes.string,
    value: PropTypes.string,
  };

  // React refs for DOM nodes.
  filterInput = null; // eslint-disable-line
  countryListItemNodes = {};

  // Our current state
  @observable filter = '';
  // / List of countries to populate with
  @observable countries = getCountries().getData();
  // / If the user has locked in their country selection
  @observable isValid = false;
  // / If the country list is displayed
  @observable isOpen = false;
  // / Internal reference for the currently selected country
  @observable selectedCountry = null;

  /**
   * Getter for a filtered list of countries based on the current filter text state
   */
  @computed get filteredCountries() {
    const regexFilter = new RegExp(`.*${escapeStringRegexp(this.filter)}.*`, 'i');
    return this.countries.filter(country => regexFilter.test(country.name));
  }

  constructor(props) {
    super(props);
    if (props.value) {
      this.selectedCountry = this.getByCode(props.value);
      this.isValid = true;
    }
  }
  /**
   * Resets our country dropdown to allow for a new selection however we want
   * to ensure we have a reference still to the selected country to make it
   * easier for the user to get back to the previous country if they made a
   * mistake (ie. they clicked the wrong country by one element or similar)
   */
  resetSelection() {
        // Open up the list of countries
    this.isOpen = true;
        // State that the current country is not locked in / valid
    this.isValid = false;

    if (this.filterInput != null) {
            // Focus the filter element so the user can begin filtering
      this.filterInput.focus();
    }

        // Fire an onChange event to let the parent component know they have not
        // selected a country
    if (this.props.onChange) {
      this.props.onChange('');
    }
  }

    /**
   * Fire our onChange event, this is the country the user has selected
   * either by hitting the return key or clicking the row
   */
  notifySelection(country) {
    this.selectedCountry = country;
    this.isOpen = false;
    this.isValid = true;
    if (this.props.onChange) {
      this.props.onChange(country.code);
    }
    if (this.props.onBlur) {
      this.props.onBlur();
    }
    if (this.filterInput) {
      this.filterInput.focus();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== '' && (this.selectedCountry === null || nextProps.value !== this.selectedCountry.code)) {
      this.isValid = true;
      this.selectedCountry = this.getByCode(nextProps.value);
      this.filter = '';
    }
  }
  getByCode(code) {
    return this.countries.filter(c => c.code === code)[0];
  }

  updateFilter(ev) {
    this.filter = ev.target.value;
    this.selectedCountry = this.filteredCountries[0];
  }

    /**
   * Moves the pointer selection by [amt] to show which item the user is
   * currently selecting. Uses the DOM nodes to scroll the element into View
   * It wraps around the index so if they click up at list index 0 it will wrap
   * to the end of the country array
   */
  moveBy(amt) {
    const currentIndex = this.filteredCountries.indexOf(this.selectedCountry);
    const len = this.filteredCountries.length;
    const newIndex = (((currentIndex + amt) % len) + len) % len;
    this.selectedCountry = this.filteredCountries[newIndex];
    this.countryListItemNodes[this.selectedCountry.code].scrollIntoView();
  }

  handleKey(ev) {
    switch (ev.keyCode) {
      case 40: // Down
        if (this.isValid) {
          this.resetSelection();
        }
        ev.preventDefault();
        this.moveBy(1);
        break;
      case 38: // Up
        if (this.isValid) {
          this.resetSelection();
        }
        ev.preventDefault();
        this.moveBy(-1);
        break;
      case 8: // Backspace
        this.resetSelection();
        break;
      case 13: // Enter
        if (this.selectedCountry) {
          this.notifySelection(this.selectedCountry);
        }
        ev.preventDefault();
        break;
      default:
        break;
    }
  }

  render() {
    const onBlur = this.props.onBlur || (() => {});
    const countryRows = this.filteredCountries.map(country => (
      <li
        className={(this.selectedCountry === country ? 'selected' : '')}
        ref={(node) => {
          this.countryListItemNodes[country.code] = node;
        }}
        onMouseDown={this.notifySelection.bind(this, country)}
        key={country.code}
      >
        <Flag className="list-flag" country={country.code} height={32} /> {country.name}
      </li>));

    return (
      <div className={`country-selector ${this.props.className}`}>
        <div className="filter">
          <input
            ref={(input) => {
              this.filterInput = input;
            }}
            onMouseOut={this.props.onMouseOut}
            autoComplete={false}
            onKeyDown={this.handleKey.bind(this)}
            className={`control${this.isOpen ? ' open' : ''}`}
            placeholder="Start typing a country"
            value={(this.isValid ? this.selectedCountry.name : this.filter)}
            onBlur={(e) => {
              this.isOpen = false;
              onBlur(e);
            }}
            onFocus={() => {
              this.isOpen = true;
            }}
            onChange={this.updateFilter.bind(this)}
            onClick={this.resetSelection.bind(this)}
            readOnly={this.isValid}
          />
        </div>
        <ul style={{ display: (!this.isOpen ? 'none' : '') }}>
          {countryRows}
        </ul>
      </div>
    );
  }
}
