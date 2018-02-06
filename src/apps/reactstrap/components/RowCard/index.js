import React, { Component } from 'react';
import { Row, Col, Card, CardImg, CardText, CardBody
    , CardTitle, CardSubtitle, CardImgOverlay
    , CardLink, Button } from 'reactstrap';

export default class RowCard extends Component {
    render() {
        return (
        
        
<Row>
    <Col sm="6">


<h3>top image</h3>
<Card style={{ width: '318px' }}>
    <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
    <CardBody>
        <CardTitle>Card title</CardTitle>
        <CardSubtitle>Card subtitle</CardSubtitle>
        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
        <Button>Button</Button>
    </CardBody>
</Card>

    </Col>
    <Col sm="6">

<h3>middle image</h3>
<Card style={{ width: '318px' }}>
    <CardBody>
        <CardTitle>Card title</CardTitle>
        <CardSubtitle>Card subtitle</CardSubtitle>
    </CardBody>
    <img width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
    <CardBody>
        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
        <CardLink href="#">Card Link</CardLink>
        <CardLink href="#">Another Link</CardLink>
    </CardBody>

</Card>


    </Col>
    <Col sm="6">

<h3>image overlays, inverse text color</h3>
<Card style={{ width: '318px' }} inverse>
    <CardImg width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97270&w=318&h=270&bg=333333&txtclr=666666" alt="Card image cap" />
    <CardImgOverlay>
        <CardTitle>Card Title</CardTitle>
        <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
        <CardText>
            <small className="text-muted">Last updated 3 mins ago</small>
        </CardText>
    </CardImgOverlay>
</Card>


    </Col>
</Row>
        
        
        
        );
    }
}
