import React, { Component, PropTypes } from 'react';
import { connect } from "react-redux";
import { reduxForm, Field } from 'redux-form';

import { Col, PageHeader, Form, FormGroup, Button } from 'react-bootstrap';

import FormField from '../FormField';


@reduxForm({
    form: 'stockForm'
})
export default class StockForm extends Component {

    render() {
        const { handleSubmit, initialData } = this.props;

        return (
            <Form horizontal onSubmit={(e) => handleSubmit(e)}>
                <Field
                    name="quantity"
                    component={FormField}
                    type="text"
                    initialValue={initialData && initialData.quantity} />
                <FormGroup>
                    <Col smOffset={3} sm={9}>
                        <Button bsStyle="primary" type="submit">{"Save"}</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}
