'use strict';

import React, { Component, PropTypes } from 'react';
import { Jumbotron } from 'react-bootstrap';


export default class Home extends Component {
    render() {
        return <div className="container">
            <Jumbotron>
                <h1>{this.props.title}</h1>
                <p>{this.props.body}</p>
            </Jumbotron>
        </div>;
    }
}

Home.propTypes = {
    title: PropTypes.string,
    body: PropTypes.string
};

Home.defaultProps = {
    title: "Home page",
    body: "Welcome."
};
