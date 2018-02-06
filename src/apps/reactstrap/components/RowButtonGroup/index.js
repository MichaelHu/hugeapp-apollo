import React, { Component } from 'react';
import { Row, Col, Button
    , ButtonGroup, ButtonToolbar } from 'reactstrap';

export default class RowButtonGroup extends Component {
    render() {
        return (
<Row>
    <Col>


<h3>button group</h3>
<ButtonGroup>
    <Button color="success">success</Button>
    <Button color="primary">primary</Button>
    <Button color="info">info</Button>
</ButtonGroup>


<h3>button toolbar</h3>
<ButtonToolbar>
    <ButtonGroup>
        <Button color="success">1</Button>
        <Button color="primary">2</Button>
        <Button color="info">3</Button>
    </ButtonGroup>

    <ButtonGroup className="ml-1">
        <Button color="secondary">4</Button>
        <Button color="secondary">5</Button>
        <Button color="secondary">6</Button>
    </ButtonGroup>

    <ButtonGroup className="ml-2">
        <Button color="info">7</Button>
        <Button color="secondary">8</Button>
        <Button color="warning">9</Button>
    </ButtonGroup>
</ButtonToolbar>

<h3>button group size - lg</h3>
<ButtonGroup size="lg">
    <Button color="success">success</Button>
    <Button color="primary">primary</Button>
    <Button color="info">info</Button>
</ButtonGroup>

<h3>button group size - sm</h3>
<ButtonGroup size="sm">
    <Button color="success">success</Button>
    <Button color="primary">primary</Button>
    <Button color="info">info</Button>
</ButtonGroup>

<h3>button group vertical</h3>
<ButtonGroup vertical>
    <Button color="success">success</Button>
    <Button color="primary">primary</Button>
    <Button color="info">info</Button>
</ButtonGroup>

<h3>button toolbar - vertical</h3>
<ButtonToolbar>
    <ButtonGroup vertical>
        <Button color="success">1</Button>
        <Button color="primary">2</Button>
        <Button color="info">3</Button>
    </ButtonGroup>

    <ButtonGroup className="ml-1">
        <Button color="secondary">4</Button>
        <Button color="secondary">5</Button>
        <Button color="secondary">6</Button>
    </ButtonGroup>

    <ButtonGroup vertical className="ml-2">
        <Button color="info">7</Button>
        <Button color="secondary">8</Button>
        <Button color="warning">9</Button>
    </ButtonGroup>
</ButtonToolbar>


    </Col>
</Row>


        );
    }
}
