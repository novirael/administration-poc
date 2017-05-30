import { combineReducers } from "redux";
import { reducer as form } from 'redux-form';

import productList from './productList';
import productDetails from './productDetails';
import stockList from './stockList';
import stockDetails from './stockDetails';

export default combineReducers({
    form,
    productList,
    productDetails,
    stockList,
    stockDetails
});
