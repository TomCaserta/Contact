import React, {Component} from "react";

export default class Heading extends Component {
  render () {
    return (<li className="heading">{this.props.title.toUpperCase()}</li>);
  }
}
