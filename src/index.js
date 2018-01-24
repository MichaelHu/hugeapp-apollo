import './style.css';
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route
    , Switch, Link } from 'react-router-dom';
import * as App from './apps';

function Apollo( props ) {
    return ( 
        <div>
            <h1> Apollo </h1>
            <Link to="/todo">todo</Link>&nbsp;|&nbsp;
            <Link to="/magicbox">magicbox</Link>
            <Switch>
                <Route exact path="/" /> 
                <Route path="/todo" component={App.TodoApp} /> 
                <Route path="/magicbox" component={App.MagicBoxApp} /> 
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

