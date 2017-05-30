import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Nav, NavItem, Navbar, Tab, Row, Col } from 'react-bootstrap';


export default class BaseLayout extends Component {

    render() {
        const path = window.location.pathname;

        return <div className="container">
            <Navbar inverse collapseOnSelect>
                <Navbar.Collapse>
                    <Nav>
                        <li className={path.startsWith('/stock') ? "active" : ""}>
                            <Link role="button" to="/stock/">Stock</Link>
                        </li>
                        <li className={path.startsWith('/products') ? "active" : ""}>
                            <Link role="button" to="/products/">Products</Link>
                        </li>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {this.renderContent()}
        </div>;
    }

    renderContent() {
        return null;
    }
}
