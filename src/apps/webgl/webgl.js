import Loadable from 'react-loadable';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const Loading = ( props ) => {
    return <div> Loading ... </div>;
};

const LoadableTHREEBasic = Loadable( {
    loader: () => import( './three/basic/index' ) 
    , loading: Loading
    , render( loaded, props ) {
        return <div><loaded.default /></div>;
    }
} );

const LoadableTHREELines = Loadable( {
    loader: () => import( './three/lines/index' ) 
    , loading: Loading
    , render( loaded, props ) {
        return <div><loaded.default /></div>;
    }
} );

const LoadableTHREEText = Loadable( {
    loader: () => import( './three/text/index' ) 
    , loading: Loading
    , render( loaded, props ) {
        return <div><loaded.default /></div>;
    }
} );

const LoadableTHREEPlane = Loadable( {
    loader: () => import( './three/plane/index' ) 
    , loading: Loading
    , render( loaded, props ) {
        return <div><loaded.default /></div>;
    }
} );

const WebGL = ( props ) => {
    return (
        <div>
            <Route path="/webgl/three-basic" component={LoadableTHREEBasic} />
            <Route path="/webgl/three-lines" component={LoadableTHREELines} />
            <Route path="/webgl/three-text" component={LoadableTHREEText} />
            <Route path="/webgl/three-plane" component={LoadableTHREEPlane} />
        </div>
    );
};

export default WebGL;
