import React from 'react';
import Loadable from 'react-loadable';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const Loading = ( props ) => {
    return <div> Loading ... </div>;
};

const LoadableComponent = Loadable( {
    loader: () => import( './magicbox' )
    , loading: Loading
    , render( loaded, props ) {
        return <loaded.default />;
    }
} );

export default function MagicBoxApp( props ) {
    return ( 
        <Route>
            <LoadableComponent />
        </Route>
    );
}

