import React, { Component, PropTypes } from 'react';
import { connect } from "react-redux";
import { reduxForm, Field } from 'redux-form';

import { Col, PageHeader, Form, FormGroup, Button } from 'react-bootstrap';

import FormField from '../FormField';


@reduxForm({
    form: 'productForm'
})
export default class ProductForm extends Component {

    render() {
        const { handleSubmit, initialData } = this.props;

        return (
            <Form horizontal onSubmit={(e) => handleSubmit(e)}>
                <Field
                    name="name"
                    component={FormField}
                    type="text"
                    initialValue={initialData && initialData.name} />
                <Field
                    name="purchase_price"
                    component={FormField}
                    type="text"
                    initialValue={initialData && initialData.purchase_price} />
                <Field
                    name="sale_price"
                    component={FormField}
                    type="text"
                    initialValue={initialData && initialData.sale_price} />
                <FormGroup>
                    <Col smOffset={3} sm={9}>
                        <Button bsStyle="primary" type="submit">{"Save"}</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}
