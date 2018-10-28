import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import store from '../lib/store.js';

import Dashboard from './Dashboard.js';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './Navbar.js';
import Template from './Template.js';
import FormContainer from './FieldSummaryReport/FormContainer';
import Lookup from './Lookup.js';
import SiteInfo from './SiteInfo.js';
import Login from "./Login.js";
import TrashFormFields from './TrashFormFields.js';
import { itemListObj } from '../ducks/checklist.js';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Fragment>
            <Route path='/' component={Navbar} />
            <Route exact path='/' component={FormContainer} />
            <Route path='/template' component={Template} />
            <Route path='/FieldSummaryReport' component={FormContainer} />
            <Route path='/lookup' component={Lookup} />
            <Route path='/siteInfo' component={SiteInfo} />
            <Route path='/Login' component={Login} />
            {itemListObj.map(ele => <Route key={ele.id} path={`/${(ele.id) + 1}`} component={() => <TrashFormFields id={(ele.id) + 1} type={ele.type} />} />)}

          </Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}