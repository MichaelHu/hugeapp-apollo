import Loadable from 'react-loadable';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const Loading = ( props ) => {
    return <div> Loading ... </div>;
};

const LoadableThreeBasic = Loadable( {
    loader: () => import( './three/basic/index' ) 
    , loading: Loading
    , render( loaded, props ) {
        return <div><loaded.default /></div>;
    }
} );

const WebGL = ( props ) => {
    return (
        <div>
            <Route path="/webgl/three-basic" component={LoadableThreeBasic} />
        </div>
    );
};

export default WebGL;
