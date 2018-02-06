import React, { Component } from 'react';
import { Row, Col, Collapse
    , Navbar, NavbarToggler, NavbarBrand
    , Nav, NavItem, NavLink
    , UncontrolledDropdown
    , DropdownToggle, DropdownMenu
    , DropdownItem } from 'reactstrap';

export default class RowNavbar extends Component {
    constructor( props ) {
        super( props );
        this.state = { isOpen: false };
        this.toggle = this.toggle.bind( this );
    }

    toggle() {
        this.setState( {
            isOpen: !this.state.isOpen
        } );
    }

    render() {
        return (

<Row>
    <Col>


<Navbar color="faded" light expand="md">
    <NavbarBrand href="https://reactstrap.github.io">reactstrap</NavbarBrand>
    <NavbarToggler onClick={this.toggle} />
    <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink href="https://reactstrap.github.io/components/">Components</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">Github</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    Options
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>Option 1</DropdownItem>
                    <DropdownItem>Option 2</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        </Nav>
    </Collapse>
</Navbar>


    </Col>
</Row>

        );
    }

}
