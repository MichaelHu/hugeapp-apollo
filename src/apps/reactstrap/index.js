import React from 'react';
import Loadable from 'react-loadable';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const Loading = ( props ) => {
    return <div> Loading ... </div>;
};

const LoadableComponent = Loadable( {
    loader: () => import( './reactstrap' )
    , loading: Loading
    , render( loaded, props ) {
        const RS = loaded.default;
        return <div><RS /></div>;
    }
} );

export default function MagicBoxApp( props ) {
    return ( 
        <Route>
            <LoadableComponent />
        </Route>
    );
}


