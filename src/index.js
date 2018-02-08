import './style.css';
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route
    , Switch, Link } from 'react-router-dom';
import * as App from './apps';
import Nav from 'Nav';

function Apollo( props ) {
    return ( 
        <div>
            <Nav />
            <Switch>
                <Route exact path="/" /> 
                <Route path="/todo" component={App.TodoApp} /> 
                <Route path="/magicbox" component={App.MagicBoxApp} /> 
                <Route path="/reactstrap" component={App.ReactStrap} /> 
                <Route path="/canvas" component={App.CanvasApp} /> 
            </Switch>
        </div>
    );
}

ReactDOM.render( 
    <Router>
        <Apollo />
    </Router>
    , $( '#root' )[ 0 ] 
);

