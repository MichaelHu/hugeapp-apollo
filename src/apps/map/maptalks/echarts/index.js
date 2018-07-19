import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as maptalks from 'maptalks';
import { E3Layer } from 'maptalks.e3';

import styles from './style.scss';
import * as flightData from './flight-data';

export default class EchartsLayer extends Component {

    /**
     * Constructing
     */
    constructor( props ) {
        super( props );

        this.state = {
            cityGeoCoords: null
        };
    }




    /****************************************
     * Life Circles
     */

    /**
     * Mounting Phase
     */
    componentWillMount() {}
    componentDidMount() {
        this.createMap();
        this.requestData();
    }

    /**
     * Updating Phase
     */
    componentWillReceiveProps( nextProps ) {}
    shouldComponentUpdate( nextProps, nextState ) { return true; }
    componentWillUpdate( nextProps, nextState ) {}
    componentDidUpdate( prevProps, prevState ) {
        if ( prevState.cityGeoCoords != this.state.cityGeoCoords ) {
            this.addEchartsLayer();
        }
    }

    /**
     * Rendering 
     */
    render() {
        return (
            <div className={styles.container}>
                <div className={styles[ 'map-container' ]} ref="map-container"></div>
            </div>
        );
    }

    /**
     * Unmounting Phase
     */
    componentWillUnmount() {
        this.map && this.map.remove();
    }





    /****************************************
     * Event Handlers
     */





    /****************************************
     * Other
     */
    createMap() {

        this.map = this.map || new maptalks.Map(
            this.refs[ 'map-container' ]
            , {
                center:  [ 109.08052, 36.04231 ]
                , zoom:  5
                , attributionControl: {
                    content : '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        + ' contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
                }
                , baseLayer : new maptalks.TileLayer(
                    'tile'
                    , {
                        urlTemplate: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png',
                        subdomains: [ 'a', 'b', 'c', 'd' ]
                    }
                )
            }
        );

    }

    requestData() {

        let p1 = new Promise( ( fulfill, reject ) => {

            $.getJSON( '/static/geo/cities.json', function ( json ) {

                if ( json ) {
                    fulfill( json );
                }
                else {
                    reject( null );
                }

            } );

        } );

        p1.then( 
            ( json ) => {
                let cityGeoCoords = json;
                this.setState( { cityGeoCoords } );
            }
            , () => {
                console.log( 'data error' );
            } 
        )
        .catch( e => {
            console.error( e );
        } )
        ;

    }

    addEchartsLayer() {
        let cityGeoCoords = this.state.cityGeoCoords;
        let echartsOption = this.getEchartsOption( cityGeoCoords, flightData );

        console.log( echartsOption );

        new E3Layer( 'e3', echartsOption ).addTo( this.map );
    }

    getEchartsOption( cityGeoCoords, flightData ) {

        const convertData = ( data ) => {
            let res = [];
            for ( let i = 0; i < data.length; i++ ) {
                let dataItem = data[i];
                let fromCoord = cityGeoCoords[dataItem[0].name];
                let toCoord = cityGeoCoords[dataItem[1].name];
                if ( fromCoord && toCoord ) {
                    res.push({
                        fromName: dataItem[0].name,
                        toName: dataItem[1].name,
                        coords: [fromCoord, toCoord]
                    });
                }
            }
            return res;
        };

        let color = ['#a6c84c', '#ffa022', '#46bee9'];
        let series = [];

        [
            [ '北京', flightData.BJData ]
            , [ '上海', flightData.SHData ]
            , [ '广州', flightData.GZData ]
        ].slice( 0, 1 ).forEach( ( item, i ) => {

            series.push(
                {
                    name: item[0] + " Top10",
                    type: "lines",
                    zlevel: 1,
                    effect: {
                        show: true,
                        period: 6,
                        trailLength: 0.7,
                        color: "#fff",
                        symbolSize: 3
                    },
                    lineStyle: {
                        normal: {
                            color: color[i],
                            width: 0,
                            curveness: 0.2
                        }
                    },
                    data: convertData(item[1])
                },
                {
                    name: item[0] + " Top10",
                    type: "lines",
                    zlevel: 2,
                    effect: {
                        show: true,
                        period: 6,
                        trailLength: 0,
                        symbol: flightData.planePath,
                        symbolSize: 15
                    },
                    lineStyle: {
                        normal: {
                            color: color[i],
                            width: 1,
                            opacity: 0.4,
                            curveness: 0.2
                        }
                    },
                    data: convertData(item[1])
                },
                {
                    name: item[0] + " Top10",
                    type: "effectScatter",
                    coordinateSystem: "geo",
                    zlevel: 2,
                    rippleEffect: {
                        brushType: "stroke"
                    },
                    label: {
                        normal: {
                            show: true,
                            position: "right",
                            formatter: "{b}"
                        }
                    },
                    symbolSize: function(val) {
                        return val[2] / 8;
                    },
                    itemStyle: {
                        normal: {
                            color: color[i]
                        }
                    },
                    data: item[1].map(function(dataItem) {
                        return {
                            name: dataItem[1].name,
                            value: cityGeoCoords[dataItem[1].name].concat([dataItem[1].value])
                        };
                    })
                }
            );

        } );

        return {
            tooltip: {
                trigger: 'item'
            }
            , series
        };

    }

}

