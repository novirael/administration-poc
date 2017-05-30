import React, { Component, PropTypes } from 'react';
import { FormGroup, FormControl, ControlLabel, Col, HelpBlock } from 'react-bootstrap';


export default class FormField extends Component {

    render() {
        let { input, meta, initialValue } = this.props;

        if (initialValue && !input.value)
            input.onChange(initialValue);

        return (
            <FormGroup validationState={meta.error ? "error" : null}>
                <Col componentClass={ControlLabel} sm={3}>
                    {input.name.replace('_', ' ')}
                </Col>
                <Col sm={9}>
                    <FormControl {...input} />
                    <HelpBlock>{meta.error}</HelpBlock>
                </Col>
            </FormGroup>
        );
    }
}

FormField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object
};
