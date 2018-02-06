import React, { Component } from 'react';
import { Row, Col, Button, ButtonGroup } from 'reactstrap';

class StatefulButtons extends Component {
    constructor( props ) {
        super( props );
        this.state = { cSelected: [] };

        this.onRadioBtnClick = this.onRadioBtnClick.bind( this );
        this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind( this );
    }

    onRadioBtnClick( rSelected ) {
        this.setState( { rSelected } );
    }

    onCheckboxBtnClick( selected ) {
        const index = this.state.cSelected.indexOf( selected );
        if ( index < 0 ) {
            this.state.cSelected.push( selected );
        }
        else {
            this.state.cSelected.splice( index, 1 );
        }
        this.setState( { cSelected: [ ...this.state.cSelected] } );
    }

    render() {
        return (

<div>
    <h5>Radio Buttons</h5>
    <ButtonGroup>
        <Button color="primary" onClick={() => this.onRadioBtnClick(1)} active={this.state.rSelected === 1}>One</Button>
        <Button color="primary" onClick={() => this.onRadioBtnClick(2)} active={this.state.rSelected === 2}>Two</Button>
        <Button color="primary" onClick={() => this.onRadioBtnClick(3)} active={this.state.rSelected === 3}>Three</Button>
    </ButtonGroup>
    <p>Selected: {this.state.rSelected}</p>

    <h5>Checkbox Buttons</h5>
    <ButtonGroup>
        <Button color="primary" onClick={() => this.onCheckboxBtnClick(1)} active={this.state.cSelected.includes(1)}>One</Button>
        <Button color="primary" onClick={() => this.onCheckboxBtnClick(2)} active={this.state.cSelected.includes(2)}>Two</Button>
        <Button color="primary" onClick={() => this.onCheckboxBtnClick(3)} active={this.state.cSelected.includes(3)}>Three</Button>
    </ButtonGroup>
    <p>Selected: {JSON.stringify(this.state.cSelected)}</p>
</div>

        );
    }
}

export default function RowButton( props ) {
    return (

<Row>
    <Col>

{ /* basic buttons */ }
<Button color="primary">primary</Button>{' '}
<Button color="secondary">secondary</Button>{' '}
<Button color="success">success</Button>{' '}
<Button color="info">info</Button>{' '}
<Button color="warning">warning</Button>{' '}
<Button color="danger">danger</Button>{' '}
<Button color="link">link</Button>

<div className="w-100"></div>

{ /* outline buttons */ }
<Button outline color="primary">primary</Button>{' '}
<Button outline color="secondary">secondary</Button>{' '}
<Button outline color="success">success</Button>{' '}
<Button outline color="info">info</Button>{' '}
<Button outline color="warning">warning</Button>{' '}
<Button outline color="danger">danger</Button>

<div className="w-100"></div>

{ /* sizes */ }
<Button color="primary" size="lg">Large Button</Button>{' '}
<Button color="secondary" size="lg">Large Button</Button>

<Button color="primary" size="sm">Small Button</Button>{' '}
<Button color="secondary" size="sm">Small Button</Button>

<Button color="primary" size="lg" block>Block level large button</Button>
<Button color="secondary" size="sm" block>Block level small button</Button>

{ /* active state */ }
<Button color="primary" size="lg" active>Primary Link</Button>{' '}
<Button color="secondary" size="lg" active>Link</Button>

{ /* disable state */ }
<Button color="primary" size="lg" disabled>Primary button</Button>{'  '}
<Button color="secondary" size="lg" disabled>Button</Button>

{ /* stateful buttons */ }
<StatefulButtons />

    </Col>
</Row>


    );
}

