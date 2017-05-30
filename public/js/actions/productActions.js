import { browserHistory } from 'react-router';
import { startSubmit, stopSubmit } from 'redux-form';

import 'whatwg-fetch';


export function fetchProducts() {
    return function(dispatch) {
         var attributes = {
            method: "GET",
            credentials: 'same-origin'
        };

        fetch('/api/inventory/v1/products/', attributes)
            .then(response => response.json())
            .then(response => dispatch(
                {type: "FETCH_PRODUCT_LIST_FULFILLED", payload: response}
            ))
            .catch(err => dispatch(
                {type: "FETCH_PRODUCT_LIST_REJECTED", payload: err}
            ));
    }
}


export function fetchProduct(productID) {
    return function(dispatch) {
         var attributes = {
            method: "GET",
            credentials: 'same-origin'
        };

        fetch(`/api/inventory/v1/products/${productID}/`, attributes)
            .then(response => response.json())
            .then(response => dispatch(
                {type: "FETCH_PRODUCT_DETAILS_FULFILLED", payload: response}
            ))
            .catch(err => dispatch(
                {type: "FETCH_PRODUCT_DETAILS_REJECTED", payload: err}
            ));
    }
}

export function createProduct(values) {
    return function (dispatch) {
        let basePath = '/api/inventory/v1/products/',
            attributes = {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(values || {})
            };

        dispatch(startSubmit('productForm'));

        fetch(basePath, attributes)
            .then(response =>
                response.json().then(data => ({
                    data,
                    ok: response.ok
                }))
            )
            .then(response => {
                if (response.ok) {
                    dispatch(stopSubmit('productForm'));
                    dispatch(fetchProducts());
                    browserHistory.push('/products/');
                }
                else dispatch(stopSubmit('productForm', response.data))
            })
            .catch(err => dispatch(stopSubmit('productForm', err)));
    }
}

export function updateProduct(productID, values) {
    return function (dispatch) {
        let basePath = `/api/inventory/v1/products/${productID}/`,
            attributes = {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(values || {})
            };

        dispatch(startSubmit('productForm'));

        fetch(basePath, attributes)
            .then(response =>
                response.json().then(data => ({
                    data,
                    ok: response.ok
                }))
            )
            .then(response => {
                if (response.ok) {
                    dispatch(stopSubmit('productForm'));
                    dispatch(fetchProducts());
                    browserHistory.push('/products/');
                }
                else dispatch(stopSubmit('productForm', response.data))
            })
            .catch(err => dispatch(stopSubmit('productForm', err)));
    }
}

export function deleteProduct(productID) {
     var attributes = {
        method: "DELETE",
        credentials: 'same-origin'
    };

    fetch(`/api/inventory/v1/products/${productID}/`, attributes)
        .then(response => response.json())
        .then(response => {
            fetchProducts();
            browserHistory.push('/products/');
        });
}