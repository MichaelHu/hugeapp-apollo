import Loadable from 'react-loadable';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const Loading = ( props ) => {
    return <div> Loading ... </div>;
};

const entries  = [
    'leaflet-baidu'
    , 'maptalks-heatmap'
    , 'maptalks-echarts'
];

let loadableComponents = {};

entries.forEach( ( item ) => {
    loadableComponents[ item ] = Loadable( {
        loader: () => import( './' + item.replace( /-/, '/' ) + '/index' )
        , loading: Loading
        , render( loaded, props ) {
            return <div><loaded.default /></div>;
        }
    } );
} );

let routes = entries.map( item => {
    return <Route key={item} path={'/map/' + item} component={loadableComponents[ item ]} />;
} );

const Map = ( props ) => {
    return (
        <div>
            { routes }
        </div>
    );
};

export default Map;
