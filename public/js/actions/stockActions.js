import { browserHistory } from 'react-router';
import { startSubmit, stopSubmit } from 'redux-form';

import 'whatwg-fetch';


export function fetchStock() {
    return function(dispatch) {
         var attributes = {
            method: "GET",
            credentials: 'same-origin'
        };

        fetch('/api/inventory/v1/stock/', attributes)
            .then(response => response.json())
            .then(response => dispatch(
                {type: "FETCH_STOCK_LIST_FULFILLED", payload: response}
            ))
            .catch(err => dispatch(
                {type: "FETCH_STOCK_LIST_REJECTED", payload: err}
            ));
    }
}

export function fetchStockItem(stockID) {
    return function(dispatch) {
         var attributes = {
            method: "GET",
            credentials: 'same-origin'
        };

        fetch(`/api/inventory/v1/stock/${stockID}/`, attributes)
            .then(response => response.json())
            .then(response => dispatch(
                {type: "FETCH_STOCK_DETAILS_FULFILLED", payload: response}
            ))
            .catch(err => dispatch(
                {type: "FETCH_STOCK_DETAILS_REJECTED", payload: err}
            ));
    }
}

export function updateStock(stockID, values) {
    return function (dispatch) {
        let basePath = `/api/inventory/v1/stock/${stockID}/`,
            attributes = {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(values || {})
            };

        dispatch(startSubmit('stockForm'));

        fetch(basePath, attributes)
            .then(response =>
                response.json().then(data => ({
                    data,
                    ok: response.ok
                }))
            )
            .then(response => {
                if (response.ok) {
                    dispatch(stopSubmit('stockForm'));
                    dispatch(fetchStock());
                }
                else dispatch(stopSubmit('stockForm', response.data))
            })
            .catch(err => dispatch(stopSubmit('stockForm', err)));
    }
}