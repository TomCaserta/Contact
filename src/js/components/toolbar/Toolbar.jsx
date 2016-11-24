import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';

@inject('routing')
@observer
export default class Toolbar extends Component { // eslint-disable-line
  static propTypes = {
    buttons: PropTypes.element,
  };

  render() {
    return (<div className="toolbar">
      {this.props.buttons}
    </div>);
  }
}
