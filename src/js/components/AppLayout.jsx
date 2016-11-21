import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import logoSvg from "../../images/logo.svg";

@inject("routing")
@observer
export default class AppLayout extends Component {
  render () {
    const { main, sidebar } = this.props;
    return (<div className="contacts-app">
      <div className="panel">
        <img src={logoSvg} className="logo" />
      </div>
      <div className="sidebar">
        {sidebar}
      </div>
      <div className="main">
        {main}
      </div>
    </div>);
  }
}
