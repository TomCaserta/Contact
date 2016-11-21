import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router, Route, hashHistory } from 'react-router';
import {default as styles} from "../scss/main.scss";
//Stores
import ContactsStore from "./stores/ContactsStore";

//Components
import AppLayout from './components/AppLayout.jsx';
import Intro from './components/pages/Intro.jsx';
import View from './components/pages/View.jsx';
import List from './components/contacts-list/List.jsx';


//Dev
import makeContacts from "babel!../../tests/test-utils/makeContacts";

const routingStore = new RouterStore();

const stores = {
  contacts: new ContactsStore().load(makeContacts(300)),
  routing: routingStore
};

const history = syncHistoryWithStore(hashHistory, routingStore);

ReactDOM.render(
  <Provider {...stores}>
    <Router history={history}>
      <Route component={AppLayout}>
        <Route path='/' components={{main: Intro, sidebar: List}} />
        <Route path='/contact/:contactID' components={{main: View, sidebar: List}} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
