import React, { PropTypes } from 'react';

export default function Heading(props) {
  return (<li className="heading">{props.title.toUpperCase()}</li>);
}

Heading.propTypes = {
  title: PropTypes.string.isRequired,
};
