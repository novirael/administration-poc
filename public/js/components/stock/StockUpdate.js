import React from 'react';
import { connect } from 'react-redux';

import { Grid, PageHeader, Form } from 'react-bootstrap';

import BaseLayout from '../BaseLayout';
import StockForm from './StockForm';

import { fetchStockItem, updateStock } from '../../actions/stockActions';
import { fetchProduct } from '../../actions/productActions';

@connect((store) => ({
    stockForm: store.form.stockForm,
    stock: store.stockDetails,
    product: store.productDetails
}))
export default class ProductUpdate extends BaseLayout {

    componentWillUpdate(a, b) {
        const { dispatch, stock, product, params } = this.props;

        if (stock.id != params.stockID)
            dispatch(fetchStockItem(params.stockID));

        if (product.id != stock.product)
            dispatch(fetchProduct(stock.product));
    }

    handleSubmit(e) {
        const { dispatch, stockForm, params } = this.props;
        dispatch(updateStock(params.stockID, stockForm.values));
        e.preventDefault();
    }

    renderContent() {
        const { stock, product, params } = this.props;

        return (
            <Grid>
                <PageHeader>{"Stock Update"}<small>{" for " + product.name}</small></PageHeader>
                <StockForm
                    handleSubmit={(e) => this.handleSubmit(e)}
                    initialData={stock.id == params.stockID ? stock : null} />
            </Grid>
        );
    }
}
