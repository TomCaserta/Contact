import React, {Component} from "react";

export default class Flag extends Component {

  render () {
    return (<img src={require("flags/"+this.props.country.toLowerCase()+".svg")} style={{height: this.props.height}} />);
  }
}
