import React from 'react';
import { Row, Col, Alert, Breadcrumb, BreadcrumbItem} from 'reactstrap';

export default function RowBreadcrumb( props ) {
    return (
        <Row>
            <Col>
                <Alert color="info">默认使用li标签，但也可以通过tag属性设置使用的标签类型</Alert>
                <Breadcrumb>
                    <BreadcrumbItem active>Home</BreadcrumbItem>
                </Breadcrumb>
                <Breadcrumb>
                    <BreadcrumbItem><a href="#">Home</a></BreadcrumbItem>
                    <BreadcrumbItem active>Library</BreadcrumbItem>
                </Breadcrumb>
                <Breadcrumb>
                    <BreadcrumbItem><a href="#">Home</a></BreadcrumbItem>
                    <BreadcrumbItem><a href="#">Library</a></BreadcrumbItem>
                    <BreadcrumbItem active>Data</BreadcrumbItem>
                </Breadcrumb>

                <Breadcrumb tag="nav">
                    <BreadcrumbItem tag="a" href="#">Home</BreadcrumbItem>
                    <BreadcrumbItem tag="a" href="#">Library</BreadcrumbItem>
                    <BreadcrumbItem tag="a" href="#">Data</BreadcrumbItem>
                    <BreadcrumbItem active tag="span">Bootstrap</BreadcrumbItem>
                </Breadcrumb>

            </Col>
        </Row>
    );
}

