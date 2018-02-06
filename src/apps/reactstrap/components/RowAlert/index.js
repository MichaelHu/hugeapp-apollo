import React from 'react';
import { Row, Col, Alert } from 'reactstrap';

class DismissableAlert extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            visible: true
        };
        this.onDismiss = this.onDismiss.bind( this );
    }

    onDismiss() {
        this.setState( { visible: false } );
    }

    render() {
        return (
            <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
                I am an alert and I can be dismissed!
            </Alert>
        );
    }
}

export default function RowAlert( props ) {
    return (
        <Row>
            <Col>
                <Alert color="primary">
                    This is a primary alert - check it out!
                </Alert>
                <Alert color="secondary">
                    This is a secondary alert - check it out!
                </Alert>
                <Alert color="success">
                    This is a success alert - check it out!
                </Alert>
                <Alert color="danger">
                    This is a danger alert - check it out!
                </Alert>
                <Alert color="warning">
                    This is a warning alert - check it out!
                </Alert>
                <Alert color="light">
                    This is a light alert - check it out!
                </Alert>
                <Alert color="dark">
                    This is a dark alert - check it out!
                </Alert>
                <DismissableAlert />
            </Col>
        </Row>
    );
}

