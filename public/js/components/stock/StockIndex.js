import React, { Component, PropTypes } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router';
import { Grid, PageHeader, Table } from 'react-bootstrap';

import BaseLayout from '../BaseLayout';

import { fetchStock } from '../../actions/stockActions';
import { fetchProducts } from '../../actions/productActions';


@connect((store) => {
  return {
    stock: store.stockList.data,
    products: store.productList.data
  };
})
export default class StockIndex extends BaseLayout {

    componentWillMount() {
        const { dispatch, stock, products } = this.props;

        dispatch(fetchStock());

        if (!stock.length)
            dispatch(fetchProducts());
    }

    renderContent() {
        return (
            <Grid>
                <PageHeader>{"Stock"}</PageHeader>
                {this.renderTable()}
            </Grid>
        );
    }

    renderTable() {
        return (
            <Table hover>
                <thead>
                    <tr>
                        <th>{"Product"}</th>
                        <th>{"Quantity"}</th>
                        <th>{"Action"}</th>
                    </tr>
                </thead>
                <tbody>{this.renderRows()}</tbody>
            </Table>
        );
    }

    renderRows() {
        const { stock, products } = this.props;

        return stock.map(stockItem => {
            let product = products.find(p => p.id == stockItem.product);
            return (
                <tr key={stockItem.id}>
                    <td>{ product.name }</td>
                    <td>{ stockItem.quantity }</td>
                    <td><Link to={`/stock/update/${stockItem.id}/`}>Change state</Link></td>
                </tr>
            );
        })
    }
}
