import React, { Component } from 'react';
import { Row, Col, Button, ButtonDropdown, DropdownToggle
    , ButtonGroup
    , DropdownMenu, DropdownItem } from 'reactstrap';

class MyButtonDropdown extends Component {
    constructor( props ) {
        super( props );
        this.state = { dropdownOpen: props.isOpen || false };
        this.toggle = this.toggle.bind( this );
    }

    toggle() {
        this.setState( {
            dropdownOpen: !this.state.dropdownOpen
        } );
    }

    render() {
        let props = this.props;
        let propsDropdown = {
                disabled: props.disabled || false
                , dropup: props.dropup || false
                , tag: props.tag
            };
        let propsToggle = {
                disabled: props.disabledToggle || false
                , caret: props.caret || false 
                , color: props.color || 'secondary'
            };
        return (

<ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} {...propsDropdown}>
    <DropdownToggle {...propsToggle}>
        {propsToggle.color}
    </DropdownToggle>
    <DropdownMenu>
        <DropdownItem header>Header</DropdownItem>
        <DropdownItem disabled>Action 1</DropdownItem>
        <DropdownItem>Action 2</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Action 3</DropdownItem>
    </DropdownMenu>
</ButtonDropdown>

        );
    }
} 

export default class RowButtonDropdown extends Component {
    render() {
        return (
<Row>
    <Col>

<div>
<h3>dropdown</h3>
<MyButtonDropdown caret color="primary"/>
{' '}<MyButtonDropdown caret color="secondary"/>
{' '}<MyButtonDropdown caret color="success"/>
{' '}<MyButtonDropdown caret color="info"/>
{' '}<MyButtonDropdown caret color="warning"/>
{' '}<MyButtonDropdown caret color="danger"/>
</div>

<div>
<h3>dropup</h3>
<MyButtonDropdown caret dropup color="primary"/>
{' '}<MyButtonDropdown caret dropup color="secondary"/>
{' '}<MyButtonDropdown caret dropup color="success"/>
{' '}<MyButtonDropdown caret dropup color="info"/>
{' '}<MyButtonDropdown caret dropup color="warning"/>
{' '}<MyButtonDropdown caret dropup color="danger"/>
</div>

<h3>dropdown in group</h3>
<ButtonGroup>
    <MyButtonDropdown caret color="primary"/>
    <MyButtonDropdown caret color="secondary"/>
    <MyButtonDropdown caret color="success"/>
    <MyButtonDropdown caret color="info"/>
    <MyButtonDropdown caret color="warning"/>
    <MyButtonDropdown caret color="danger"/>
</ButtonGroup>

    </Col>
</Row>

        );
    }
}
