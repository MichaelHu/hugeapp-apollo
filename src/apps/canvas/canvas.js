import React from 'react';
import Loadable from 'react-loadable';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const Loading = ( props ) => {
    return <div> Loading ... </div>;
};

const LoadableParticle = Loadable( {
    loader: () => import( './particle/index' )
    , loading: Loading
    , render( loaded, props ) {
        return <div><loaded.default /></div>;
    }
} );

const LoadableFireworks = Loadable( {
    loader: () => import( './fireworks/index' )
    , loading: Loading
    , render( loaded, props ) {
        return <div><loaded.default /></div>;
    }
} );

const Canvas = ( props ) => {
    return (
        <div>
            <Route path="/canvas/particle" component={LoadableParticle} />
            <Route path="/canvas/fireworks" component={LoadableFireworks} />
        </div>
    );
};

export default Canvas;
