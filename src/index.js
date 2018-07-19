import $ from 'jquery';
import React from 'react';
// import { reactopt } from 'reactopt';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route
    , Switch, Link } from 'react-router-dom';
import * as App from './apps';
import Nav from 'Nav';
import { Container } from 'reactstrap';

import styles from './style.css';

// reactopt( React );

function Apollo( props ) {
    return ( 
        <Container>
            <Nav />
            <Switch>
                <Route exact path="/" /> 
                <Route path="/todo" component={App.TodoApp} /> 
                <Route path="/echarts" component={App.EchartsApp} /> 
                <Route path="/magicbox" component={App.MagicBoxApp} /> 
                <Route path="/reactstrap" component={App.ReactStrap} /> 
                <Route path="/canvas" component={App.CanvasApp} /> 
                <Route path="/svg" component={App.SvgApp} /> 
                <Route path="/webgl" component={App.WebGLApp} /> 
                <Route path="/map" component={App.Map} /> 
            </Switch>
        </Container>
    );
}

ReactDOM.render( 
    <Router>
        <Apollo />
    </Router>
    , $( '#root' )[ 0 ] 
);

