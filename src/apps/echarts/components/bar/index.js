import React from 'react';
import PropTypes from 'prop-types';

// echarts main module
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

export default class Bar extends React.Component {

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
        chart.setOption( {
            title: {
                text: 'ECharts入门示例'
            }
            , tooltip: {}
            , xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            }
            , yAxis: {}
            , series: [ 
                {
                    name: '销量'
                    , type: 'bar'
                    , data: [ 5, 20, 36, 10, 10, 20 ]
                }
            ]
        } );

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
                    height: '300px'
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


