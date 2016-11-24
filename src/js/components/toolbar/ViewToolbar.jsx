import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaTrash from 'react-icons/lib/fa/trash';

import BackButton from './BackButton';

export default function ViewToolbar(props) {
  const { contactID } = props.params;
  return (<div>
    <BackButton />
    <Link className="menu-item" to={`/contact/${contactID}/edit`}><FaPencil size={40} color={'white'} /> Edit</Link>
    <Link className="menu-item" to={`/contact/${contactID}/delete`}><FaTrash size={40} color={'white'} /> Delete</Link>
  </div>);
}

ViewToolbar.propTypes = {
  params: PropTypes.shape({
    contactID: PropTypes.string,
  }),
};
