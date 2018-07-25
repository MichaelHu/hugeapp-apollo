import L from '../lib/leaflet';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';

export default class BMap extends Component {

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
        let opt = this.props.options;

        this.map = this.createMap( this.refs[ 'map-container' ] );
        this.registerEvents();
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
                <header className={styles.header}></header>
                <div className={styles.content}>
                    <div className={styles.main} ref="map-container"></div>
                    <div className={styles.aside}></div>
                </div>
                <footer className={styles.footer}></footer>
            </div>
        );
    }

    /**
     * Unmounting Phase
     */
    componentWillUnmount() {}





    /****************************************
     * Event Handlers
     */

    registerEvents() {
        this.map.on( 'click', ( e ) => console.log( e ) );
        this.tileLayer.on( 'load', ( e ) => {
            $.each(
                $('.leaflet-tile')
                , function(key, item){
                    $(item).css('transform', $(item).css('transform') + ' scale(1.002)');
                }
            );
        } );
    }



    /****************************************
     * Other
     */
    createMap( selector ) {

        let center = [ 0, 0 ];
        let zoom = 1;

        let map = this.map = L.map( $( selector )[ 0 ], {
            maxZoom: 5
            , minZoom: 1
            , scrollWheelZoom: false
            , wheelPxPerZoomLevel: 200
            , wheelDebounceTime: 200
            , inertiaMaxSpeed: 300
            , crs: L.CRS.graph
            , zoomControl: false
            , doubleClickZoom: false
            , attributionControl: false
        }).setView( center, zoom );

        // new L.TileLayer.Baidu().addTo( map );
        this.tileLayer = new L.TileLayer.Graph().addTo( map );
        // L.tileLayer.baidu( 'Satelite.Map' ).addTo( map );
        // L.tileLayer.baidu( 'Satelite.Road' ).addTo( map );
        
        // let imageUrl = '/static/img/newark_nj_1922.jpg';
        // // // let imageBounds = [[40.712216, -74.22655], [40.773941, -74.12544]];
        // let imageBounds = [[0, 0], [691, 541].reverse()];
        // L.imageOverlay( imageUrl, imageBounds ).addTo( map );

        L.control.zoom( { position: 'topright' } )
            .addTo( map );

        return map;

    }
 

}

