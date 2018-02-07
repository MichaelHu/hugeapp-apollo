import React, { Component } from 'react';
import { Row, Col, ListGroup, ListGroupItem
    , ListGroupItemText
    , ListGroupItemHeading, Badge } from 'reactstrap';

export default class RowListGroup extends Component {
    render() {
        return (



<Row>
    <h3 className="w-100">ListGroup</h3>
    <Col xs="4">


<ListGroup>
    <ListGroupItem>Cras justo odio</ListGroupItem>
    <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
    <ListGroupItem>Morbi leo risus</ListGroupItem>
    <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
    <ListGroupItem>Vestibulum at eros</ListGroupItem>
</ListGroup>


    </Col>
    <Col xs="4">


<ListGroup>
    <ListGroupItem action>Cras justo odio</ListGroupItem>
    <ListGroupItem action>Dapibus ac facilisis in</ListGroupItem>
    <ListGroupItem action>Morbi leo risus</ListGroupItem>
    <ListGroupItem action>Porta ac consectetur ac</ListGroupItem>
    <ListGroupItem action>Vestibulum at eros</ListGroupItem>
</ListGroup>


    </Col>
    <Col xs="4">


<ListGroup>
    <ListGroupItem action>Cras justo odio <Badge pill>14</Badge></ListGroupItem>
    <ListGroupItem action>Dapibus ac facilisis in</ListGroupItem>
    <ListGroupItem action active>Morbi leo risus <Badge pill>9</Badge></ListGroupItem>
    <ListGroupItem action>Porta ac consectetur ac</ListGroupItem>
    <ListGroupItem action>Vestibulum at eros</ListGroupItem>
</ListGroup>


    </Col>

    <Col xs="12" className="my-2"></Col>


    <Col xs="4">


<ListGroup>
    <ListGroupItem action color="info">Cras justo odio <Badge pill>14</Badge></ListGroupItem>
    <ListGroupItem action color="secondary">Dapibus ac facilisis in</ListGroupItem>
    <ListGroupItem action active color="warning">Morbi leo risus <Badge pill>9</Badge></ListGroupItem>
    <ListGroupItem action color="success">Porta ac consectetur ac</ListGroupItem>
    <ListGroupItem action>Vestibulum at eros</ListGroupItem>
</ListGroup>


    </Col>

    <Col xs="4">


    <ListGroup>
        <ListGroupItem active>
            <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
            <ListGroupItemText>
            Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
            </ListGroupItemText>
        </ListGroupItem>
        <ListGroupItem>
            <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
            <ListGroupItemText>
            Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
            </ListGroupItemText>
        </ListGroupItem>
        <ListGroupItem>
            <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
            <ListGroupItemText>
            Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
            </ListGroupItemText>
        </ListGroupItem>
    </ListGroup>


    </Col>
</Row>



        );
    }
}
