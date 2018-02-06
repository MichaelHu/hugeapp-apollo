import React, { Component } from 'react';
import { Row, Col, Collapse, Button
    , Card, CardBody, Alert } from 'reactstrap';

export default class RowCollapse extends Component {
    constructor( props ) {
        super( props );
        this.state = { 
            collapse: props.isOpen || false
            , status: 'Closed'  
        };
        [ 'toggle'
            , 'onEntering'
            , 'onEntered'
            , 'onExiting'
            , 'onExited'
        ].forEach( key => this[ key ] = this[ key ].bind( this ) );
    }

    toggle() {
        this.setState( { 
            collapse: !this.state.collapse 
            , status: 'Closed'
        } );
    }

    onEntering() {
        this.setState({ status: 'Opening...' });
    }

    onEntered() {
        this.setState({ status: 'Opened' });
    }

    onExiting() {
        this.setState({ status: 'Closing...' });
    }

    onExited() {
        this.setState({ status: 'Closed' });
    }

    render() {
        let props = {
                isOpen: this.state.collapse
                , children: this.props.children
                , tag: this.props.tag 
                , navbar: this.props.navbar
                , cssModule: this.props.cssModule
                , onEntering: this.onEntering
                , onEntered: this.onEntered
                , onExiting: this.onExiting
                , onExited: this.onExited
            };
        return (

<Row>
    <Col>


<h3>collapse text</h3>
<Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Toggle</Button>
<Alert color="info">{this.state.status}</Alert>
<Collapse {...props}>
    <Card>
        <CardBody>
Anim pariatur cliche reprehenderit,
enim eiusmod high life accusamus terry richardson ad squid. Nihil
anim keffiyeh helvetica, craft beer labore wes anderson cred
nesciunt sapiente ea proident.
        </CardBody>
    </Card>
</Collapse>


    </Col>
</Row>

        );
    }
}
