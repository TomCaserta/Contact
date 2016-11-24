import React, { Component } from 'react';
import { observer, inject, PropTypes as MobXPropTypes } from 'mobx-react';
import FaArrowLeft from 'react-icons/lib/fa/arrow-left';

@inject('routing')
@observer
export default class BackButton extends Component { // eslint-disable-line
  static propTypes = {
    routing: MobXPropTypes.observableObject,
  };

  render() {
    return (<a href="" className="menu-item" onClick={(ev) => { ev.preventDefault(); this.props.routing.goBack(); }}>
      <FaArrowLeft size={40} color={'white'} /> <span>Back</span>
    </a>);
  }
}
