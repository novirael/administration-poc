import React, { Component, PropTypes } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router';
import { Grid, PageHeader, Table, Button } from 'react-bootstrap';

import BaseLayout from '../BaseLayout';

import { fetchProducts, deleteProduct } from '../../actions/productActions';


@connect((store) => {
  return {
    products: store.productList.data
  };
})
export default class ProductIndex extends BaseLayout {

    componentWillMount() {
        const { dispatch, products } = this.props;

        dispatch(fetchProducts());
    }

    renderContent() {
        return (
            <Grid>
                <PageHeader>{"Products"}</PageHeader>
                <Link to="/products/create/" className="btn btn-default">Create product</Link>
                {this.renderTable()}
            </Grid>
        );
    }

    renderTable() {
        return (
            <Table hover>
                <thead>
                    <tr>
                        <th>{"Name"}</th>
                        <th>{"Purchase price"}</th>
                        <th>{"Sale price"}</th>
                        <th>{"Action"}</th>
                    </tr>
                </thead>
                <tbody>{this.renderRows()}</tbody>
            </Table>
        );
    }

    handleDelete(productId) {
        deleteProduct(productId);
        window.location.reload();
    }

    renderRows() {
        return this.props.products.map(product => {
            return (
                <tr key={product.id}>
                    <td><Link to={`/products/update/${product.id}/`}>{ product.name }</Link></td>
                    <td>{ product.purchase_price }</td>
                    <td>{ product.sale_price }</td>
                    <td><a onClick={() => this.handleDelete(product.id)}>Delete</a></td>
                </tr>
            );
        })
    }
}
