import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import FaPlus from 'react-icons/lib/fa/plus';
import logoSvg from '../../images/logo.svg';
import Toolbar from './toolbar/Toolbar';

export default function AppLayout(props) {
  const { main, sidebar, buttons } = props;
  return (<div className="contacts-app">
    <div className="panel">
      <img alt="Contacts Logo" src={logoSvg} className="logo" />
      <Link to="/contact/add" className="menu-button">
        <FaPlus size={30} color={'white'} />
      </Link>
    </div>
    <div className="sidebar">
      {sidebar}
    </div>
    <Toolbar buttons={buttons} />
    <div className="main">
      {main}
    </div>
  </div>);
}

AppLayout.propTypes = {
  main: PropTypes.element,
  sidebar: PropTypes.element,
  buttons: PropTypes.element,
};
