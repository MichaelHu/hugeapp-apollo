import React from 'react';
import PropTypes from 'prop-types';

// echarts main module
import echarts from 'echarts/lib/echarts';

import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';

import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

export default class Chart extends React.Component {

    /**
     * Constructing
     */
    constructor( props ) {
        super( props );
    }




    /****************************************
     * Life Circles
     */

    /**
     * Mounting Phase
     */
    componentWillMount() {}
    componentDidMount() {

        let chart = echarts.init( this.refs[ 'chart-container' ] );
        chart.setOption( this.props.chartOptions );

    }

    /**
     * Updating Phase
     */
    componentWillReceiveProps( nextProps ) {}
    shouldComponentUpdate( nextProps, nextState ) { return true; }
    componentWillUpdate( nextProps, nextState ) {}

    /**
     * Unmounting Phase
     */
    componentWillUnmount() {}

    render() {
        return (
            <div ref="chart-container"
                style={{
                    height: ( this.props.height || 300 ) + 'px'
                }}
                >
            echarts
            </div>
        );
    }





    /****************************************
     * Event Handlers
     */





    /****************************************
     * Other
     */

}




