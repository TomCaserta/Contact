import React, { Children, Component, PropTypes } from 'react';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';

@observer
export default class InputGroup extends Component {
  static propTypes = {
    showFirst: PropTypes.bool,
    label: PropTypes.string.isRequired,
    onValidate: PropTypes.func,
    children: React.PropTypes.element.isRequired,
    validator: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.arrayOf(PropTypes.func),
    ]),
    name: PropTypes.string,
    options: PropTypes.object, // eslint-disable-line
  }

  @observable value = null; // eslint-disable-line
  @observable error = false;
  @observable messages = [];

  @computed get filterMessages() {
    if (this.props.showFirst === true && this.messages.length > 1) return [this.messages[0]];
    return this.messages;
  }

  componentWillMount() {
    const passedChild = Children.only(this.props.children);
    if (passedChild.props.value !== '' && passedChild.props.value !== null) {
      this.value = passedChild.props.value;
      this.checkError();
    }
  }

  onChange(originalOnChange, ev) {
    if (this.error) {
      // Reset our component as they change values so the error is not outdated
      this.error = false;
      this.messages.replace([]);
    }
    if (ev.target) {
      this.value = ev.target.value;
    } else {
      this.value = ev;
    }
    if (originalOnChange) originalOnChange(ev);
  }

  checkAndForward(callback, ev) {
    if (callback) {
      callback(ev);
    }
    this.checkError();
  }

  checkError() {
    let validator = this.props.validator;
    const errorMessages = [];
    let error = false;
    if (!(validator instanceof Array)) {
      validator = [validator];
    }
    validator.forEach((v) => {
      if (v) {
        const response = v(this.value, this.props.options);
        if (response.isValid === false) {
          errorMessages.push(response.reason);
          error = true;
        }
      }
    });
    this.messages.replace(errorMessages);
    this.error = error;
    if (this.props.onValidate) {
      this.props.onValidate(error, errorMessages);
    }
  }

  render() {
    const { label, children } = this.props;
    const { checkAndForward, onChange } = this;
    const passedChild = Children.only(children);
    const name = label.trim().toLowerCase().replace(/ /g, '_') || this.props.name;
    const newChild = React.cloneElement(passedChild, {
      onBlur: checkAndForward.bind(this, passedChild.props.onBlur),
      onChange: onChange.bind(this, passedChild.props.onChange),
      name,
    });
    const errorOutput = this.filterMessages.map((message, i) => <li key={i}>{message}</li>);
    return (<div className={`group ${this.error ? 'has-error' : ''}`}>
      <label htmlFor={name}>{label}</label>
      {newChild}
      {(this.error ? <ul className="errors">{errorOutput}</ul> : null)}
    </div>);
  }
}
