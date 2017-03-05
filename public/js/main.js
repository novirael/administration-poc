'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux"
import { Router, Route, browserHistory } from 'react-router';

import Home from './components/administration/base';

import store from "./store"


render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Home} />
        </Router>
    </Provider>,
    document.getElementById('content')
);
