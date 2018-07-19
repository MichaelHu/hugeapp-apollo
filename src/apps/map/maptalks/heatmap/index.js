import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Promise from 'promise';

import * as maptalks from 'maptalks';
import { HeatLayer } from 'maptalks.heatmap';

import styles from './style.scss';

export default class HeatMap extends Component {

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
        this.createMap();
        this.addHeatLayer();
    }

    /**
     * Updating Phase
     */
    componentWillReceiveProps( nextProps ) {}
    shouldComponentUpdate( nextProps, nextState ) { return true; }
    componentWillUpdate( nextProps, nextState ) {}
    componentDidUpdate( prevProps, prevState ) {}

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
                center: [ 175.46873, -37.90258 ]
                , zoom: 15
                , baseLayer : new maptalks.TileLayer(
                    'tile'
                    , {
                        urlTemplate: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
                        // urlTemplate: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png',
                        subdomains: ['a','b','c','d']
                    }
                )
            }
        );

    }

    addHeatLayer() {

        let p1 = new Promise( ( fulfill, reject ) => {

            $.get( '/static/maptalks/heatmap/realworld.10000.js', function ( text ) {

                if ( text ) {
                    fulfill( text );
                }
                else {
                    reject( null );
                }

            } );

        }, 'text' );

        p1.then( 
            ( text ) => {
                let heatData = eval( text );
                heatData = heatData.map( ( p ) => [ p[ 1 ], p[ 0 ], parseFloat( p[ 2 ] ) ] );
                console.log( heatData.slice() );
                new HeatLayer( 'heat', heatData, {
                    forceRenderOnRotating: true
                    , forceRenderOnMoving: true
                    , radius: 3
                    , blur: 5
                } ).addTo( this.map );
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

}

