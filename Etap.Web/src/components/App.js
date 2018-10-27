import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../lib/store.js';

import Dashboard from './Dashboard.js';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './Navbar.js';
import Template from './Template.js';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <React.Fragment>
            <Route path='/' component={Navbar} />
            <Route path='/' component={Dashboard} />
            <Route path='/template' component={Template} />

          </React.Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

