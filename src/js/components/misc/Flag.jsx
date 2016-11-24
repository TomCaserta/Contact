import React, { PropTypes } from 'react';

export default function Flag(props) {
  try {
    return (<img alt={props.country} className={props.className} src={require(`flags/${props.country.toLowerCase()}.svg`)} style={{ height: props.height }} />);
  } catch (e) {
    return (<div className={`default-flag ${props.className}`} style={{ height: props.height, lineHeight: `${props.height}px` }}>{props.country.toUpperCase() }</div>);
  }
}

Flag.propTypes = {
  country: PropTypes.string,
  className: PropTypes.string,
  height: PropTypes.number.isRequired,
};
