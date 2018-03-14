import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Collapse
    , Navbar, NavbarToggler, NavbarBrand
    , Nav, NavItem, NavLink
    , UncontrolledDropdown
    , DropdownToggle, DropdownMenu
    , DropdownItem } from 'reactstrap';

export default class MyNav extends Component {
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
<Container>
    <Navbar color="faded" light expand="md">
        <NavbarBrand href="https://github.com/MichaelHu/hugeapp-apollo">Apollo</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>

                <NavItem>
                    <Link className="nav-link" to="/todo">Todo</Link>
                </NavItem>

                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        ECharts
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>
                            <Link className="nav-link" to="/echarts/line">Line</Link>
                        </DropdownItem>
                        <DropdownItem>
                            <Link className="nav-link" to="/echarts/bar">Bar</Link>
                        </DropdownItem>
                        <DropdownItem>
                            <Link className="nav-link" to="/echarts/heatmap">HeatMap</Link>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>

                <NavItem>
                    <Link className="nav-link" to="/magicbox">MagicBox</Link>
                </NavItem>

                <NavItem>
                    <Link className="nav-link" to="/reactstrap">ReactStrap</Link>
                </NavItem>

                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        SVG
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>
                            <Link className="nav-link" to="/svg/d3-force">d3-force</Link>
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                            <Link className="nav-link" to="/svg/d3-dendrogram">d3-dendrogram</Link>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>

                <NavItem>
                    <Link className="nav-link" to="/webgl">WebGL</Link>
                </NavItem>

                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        Canvas
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>
                            <Link className="nav-link" to="/canvas/particle">Particle</Link>
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                            <Link className="nav-link" to="/canvas/fireworks">Fireworks</Link>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>
        </Collapse>
    </Navbar>
</Container>
        );
    }

}

