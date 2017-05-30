'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux"
import { Router, Route, browserHistory } from 'react-router';

import store from './store';

import Home from './components/Home';
import ProductIndex from './components/products/ProductIndex';
import ProductCreate from './components/products/ProductCreate';
import ProductUpdate from './components/products/ProductUpdate';
import StockIndex from './components/stock/StockIndex';
import StockUpdate from './components/stock/StockUpdate';

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Home} />

            <Route path="/products/" component={ProductIndex} />
            <Route path="/products/create/" component={ProductCreate} />
            <Route path="/products/update/:productID/" component={ProductUpdate} />

            <Route path="/stock/" component={StockIndex} />
            <Route path="/stock/update/:stockID" component={StockUpdate} />
        </Router>
    </Provider>,
    document.getElementById('content')
);
