import Loadable from 'react-loadable';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const Loading = ( props ) => {
    return <div> Loading ... </div>;
};

const LoadableD3Force = Loadable( {
    loader: () => import( './d3/force/index' )
    , loading: Loading
    , render( loaded, props ) {
        return <div><loaded.default /></div>;
    }
} );

const LoadableD3Dendrogram = Loadable( {
    loader: () => import( './d3/dendrogram/index' )
    , loading: Loading
    , render( loaded, props ) {
        return <div><loaded.default /></div>;
    }
} );

const Svg = ( props ) => {
    return (
        <div>
            <Route path="/svg/d3-force" component={LoadableD3Force} />
            <Route path="/svg/d3-dendrogram" component={LoadableD3Dendrogram} />
        </div>
    );
};

export default Svg;
