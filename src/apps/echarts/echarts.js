import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Bundle from 'Bundle';

// bundles
import barBundle from 'bundle-loader?lazy!./components/bar';
import lineBundle from 'bundle-loader?lazy!./components/line';
import heatmapBundle from 'bundle-loader?lazy!./components/heatmap';

export default function EchartsMain( props ) {
    return (
        <Switch>
            <Route path="/echarts/bar">
                <Bundle load={barBundle}>
                    {
                        ( Bar ) => {
                            return <Bar />;
                        }
                    }
                </Bundle>
            </Route>
            <Route path="/echarts/line">
                <Bundle load={lineBundle}>
                    {
                        ( Line ) => {
                            return <Line />;
                        }
                    }
                </Bundle>
            </Route>
            <Route path="/echarts/heatmap">
                <Bundle load={heatmapBundle}>
                    {
                        ( HeatMap ) => {
                            return <HeatMap />;
                        }
                    }
                </Bundle>
            </Route>
        </Switch>
    );
}
