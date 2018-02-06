import React from 'react';
import { Row, Col, Badge, Button } from 'reactstrap';

export default function RowBadge( props ) {
    return (
        <Row>
            <Col sm="6">
                <h1>Heading <Badge color="secondary">New</Badge></h1>
                <h2>Heading <Badge color="secondary">New</Badge></h2>
                <h3>Heading <Badge color="secondary">New</Badge></h3>
                <h4>Heading <Badge color="secondary">New</Badge></h4>
                <h5>Heading <Badge color="secondary">New</Badge></h5>
                <h6>Heading <Badge color="secondary">New</Badge></h6>
            </Col>

            <Col sm="6">
                <Button color="primary">
                    Notifications <Badge color="secondary">4</Badge>
                </Button> 

                <div>
                    <Badge color="primary">Primary</Badge>
                    <Badge color="secondary">Secondary</Badge>
                    <Badge color="success">Success</Badge>
                    <Badge color="danger">Danger</Badge>
                    <Badge color="warning">Warning</Badge>
                    <Badge color="info">Info</Badge>
                    <Badge color="light">Light</Badge>
                    <Badge color="dark">Dark</Badge>
                </div>

                <div>
                    <Badge color="primary" pill>Primary</Badge>
                    <Badge color="secondary" pill>Secondary</Badge>
                    <Badge color="success" pill>Success</Badge>
                    <Badge color="danger" pill>Danger</Badge>
                    <Badge color="warning" pill>Warning</Badge>
                    <Badge color="info" pill>Info</Badge>
                    <Badge color="light" pill>Light</Badge>
                    <Badge color="dark" pill>Dark</Badge>
                </div>

                <div>
                    <Badge href="#" color="primary">Primary</Badge>
                    <Badge href="#" color="secondary">Secondary</Badge>
                    <Badge href="#" color="success">Success</Badge>
                    <Badge href="#" color="danger">Danger</Badge>
                    <Badge href="#" color="warning">Warning</Badge>
                    <Badge href="#" color="info">Info</Badge>
                    <Badge href="#" color="light">Light</Badge>
                    <Badge href="#" color="dark">Dark</Badge>
                </div>

            </Col>
        </Row>
    );
}

