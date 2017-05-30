import React from 'react';
import { connect } from 'react-redux';

import { Grid, PageHeader, Form } from 'react-bootstrap';

import BaseLayout from '../BaseLayout';
import ProductForm from './ProductForm';

import { createProduct } from '../../actions/productActions';


@connect((store) => ({
    productForm: store.form.productForm
}))
export default class ProductCreate extends BaseLayout {

    handleSubmit(e) {
        const { dispatch, productForm } = this.props;
        dispatch(createProduct(productForm.values));
        e.preventDefault()
    }

    renderContent() {
        return (
            <Grid>
                <PageHeader>{"Product Create"}</PageHeader>
                <ProductForm handleSubmit={(e) => this.handleSubmit(e)} />
            </Grid>
        );
    }
}
