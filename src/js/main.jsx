import React from 'react';
import ReactDOM from 'react-dom';
import { autorun } from 'mobx';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router, Route, hashHistory } from 'react-router';
import styles from '../scss/main.scss'; // eslint-disable-line
// Stores
import ContactsStore from './stores/ContactsStore';

// Handlers/Middleware
import contactExists from './utils/contact-exists';

// Components
import AppLayout from './components/AppLayout';
import Intro from './components/pages/Intro';
import View from './components/pages/View';
import Add from './components/pages/Add';
import Delete from './components/pages/Delete';
import Edit from './components/pages/Edit';
import List from './components/contacts-list/List';

// Buttons
import BackButton from './components/toolbar/BackButton';
import ViewToolbar from './components/toolbar/ViewToolbar';

// Dev
// import makeContacts from 'babel!../../tests/test-utils/makeContacts'; // eslint-disable-line

const routingStore = new RouterStore();

/* Client Side Storage */
const browserContacts = (localStorage.contacts ? JSON.parse(localStorage.contacts) : []);
const contactsStore = new ContactsStore().load(browserContacts);
autorun(() => {
  try {
    localStorage.contacts = JSON.stringify(contactsStore.toJS());
  } catch (e) {
    // We cant store.
    // TODO: Show an error and safe exit.
  }
});


const stores = {
  contacts: contactsStore,
  routing: routingStore,
};

const verifyContactExists = contactExists.bind(null, contactsStore);
const history = syncHistoryWithStore(hashHistory, routingStore);

let element = null;
if (process.env.NODE_ENV === 'production') {
  element = document.createElement('div');
  element.setAttribute('id', 'root');
  document.body.appendChild(element);
} else {
  element = document.getElementById('root');
}

ReactDOM.render(
  <Provider {...stores}>
    <Router history={history}>
      <Route component={AppLayout}>
        <Route path="/" components={{ main: Intro, sidebar: List, buttons: null }} />
        <Route path="/contact/add" components={{ main: Add, sidebar: List, buttons: BackButton }} />
        <Route path="/contact/:contactID" onEnter={verifyContactExists} components={{ main: View, sidebar: List, buttons: ViewToolbar }} />
        <Route path="/contact/:contactID/edit" onEnter={verifyContactExists} components={{ main: Edit, sidebar: List, buttons: BackButton }} />
        <Route path="/contact/:contactID/delete" onEnter={verifyContactExists} components={{ main: Delete, sidebar: List, buttons: BackButton }} />
      </Route>
    </Router>
  </Provider>,
  element,
);
