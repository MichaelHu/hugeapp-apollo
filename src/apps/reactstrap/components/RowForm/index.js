import React, { Component } from 'react';
import { Row, Col
    , Button, Form, FormGroup
    , Label, Input, FormText
} from 'reactstrap';

let _cuid = 1;
const cuid = () =>_cuid++;

class FormFlow extends Component {

    render() {

        let emailId = 'email_' + cuid(); 
        let passwordId = 'password_' + cuid();
        let selectId = 'select_' + cuid();
        let selectMultiId = 'selectmulti_' + cuid();

        return (
            <Form>
                <FormGroup>
                    <Label for={emailId}>Email</Label>
                    <Input type="email" name="email"
                        id={emailId} placeholder="with a placeholder" />
                </FormGroup>
                <FormGroup>
                    <Label for={passwordId}>Password</Label> 
                    <Input type="password" name="password"
                        id={passwordId} placeholder="password placeholder" />
                </FormGroup>
                <FormGroup>
                    <Label for={selectId}>Select</Label> 
                    <Input type="select" name="select"
                        id={selectId}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for={selectMultiId}>Select Multiple</Label> 
                    <Input type="select" name="selectMulti"
                        id={selectMultiId} multiple>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </Input>
                </FormGroup>
            </Form>
        );
    }

}


class FormGrid extends Component {

    render() {

        let emailId = 'email_' + cuid(); 
        let passwordId = 'password_' + cuid();
        let selectId = 'select_' + cuid();
        let selectMultiId = 'selectmulti_' + cuid();

        return (
            <Form>
                <FormGroup row>
                    <Label for={emailId} sm={2}>Email</Label>
                    <Col sm={10}>
                        <Input type="email" name="email"
                            id={emailId} placeholder="with a placeholder" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for={passwordId} sm={2}>Password</Label>
                    <Col sm={10}>
                        <Input type="password" name="password"
                            id={passwordId} placeholder="password placeholder" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for={selectId} sm={2}>Select</Label> 
                    <Col sm={10}>
                        <Input type="select" name="select"
                            id={selectId}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for={selectMultiId} sm={2}>Select Multiple</Label> 
                    <Col sm={10}>
                        <Input type="select" name="selectMulti"
                            id={selectMultiId} multiple>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </Input>
                    </Col>
                </FormGroup>
            </Form>
        );
    }

}


export default function RowForm( props ) {

    return (

<Row>
    <Col>

<h3>Form Flow</h3>
<FormFlow />

<h3>Form Grid</h3>
<FormGrid />

    </Col>
</Row>


    );

}
