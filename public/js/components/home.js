import React, { Component, PropTypes } from 'react';
import { Jumbotron } from 'react-bootstrap';
import BaseLayout from './BaseLayout';


export default class Home extends BaseLayout {

    renderContent() {
        return (
            <Jumbotron>
                <h1>{"Home page"}</h1>
                <p>{"Welecome!"}</p>
            </Jumbotron>
        );
    }

}