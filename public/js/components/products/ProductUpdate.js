import React from 'react';
import { connect } from 'react-redux';

import { Grid, PageHeader, Form } from 'react-bootstrap';

import BaseLayout from '../BaseLayout';
import ProductForm from './ProductForm';

import { fetchProduct, updateProduct } from '../../actions/productActions';


@connect((store) => ({
    productForm: store.form.productForm,
    product: store.productDetails
}))
export default class ProductUpdate extends BaseLayout {

    componentWillUpdate(a, b) {
        const { dispatch, product, params } = this.props;

        if (product.id != params.productID)
            dispatch(fetchProduct(params.productID));
    }

    handleSubmit(e) {
        const { dispatch, productForm, params } = this.props;
        dispatch(updateProduct(params.productID, productForm.values));
        e.preventDefault();
    }

    renderContent() {
        const { product, params } = this.props;

        return (
            <Grid>
                <PageHeader>{"Product Update"}</PageHeader>
                <ProductForm
                    handleSubmit={(e) => this.handleSubmit(e)}
                    initialData={product.id == params.productID ? product : null} />
            </Grid>
        );
    }
}
