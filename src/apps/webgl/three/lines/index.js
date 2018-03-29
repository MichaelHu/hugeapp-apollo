import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import * as THREE from 'three';
import styles from './index.scss';

// for React 15 and below
// import React, { PropTypes, Component } from 'react';

export default class Lines extends Component {

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
        let $container = $( this.refs[ 'canvas-container' ] );
        let scene = new THREE.Scene();
        let camera = new THREE.PerspectiveCamera(
            45
            , $container.width() / $container.height()
            , 1
            , 500
        );
        camera.position.set( 0, 0, 100 );

        camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

        let renderer = new THREE.WebGLRenderer();
        renderer.setSize( $container.width(), $container.height() );
        $container.append( renderer.domElement );

        let geometry = new THREE.Geometry();

        // lines are drawn between each consecutive pair of vertices, but not 
        // between the first and last (the line is not closed.)
        geometry.vertices.push( new THREE.Vector3( -10,  0,  0 ) );
        geometry.vertices.push( new THREE.Vector3(   0, 10,  0 ) );
        geometry.vertices.push( new THREE.Vector3(  10,  0,  0 ) );

        let material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
        let line = new THREE.Line( geometry, material );

        scene.add( line );
        renderer.render( scene, camera );

    }

    /**
     * Updating Phase
     */
    componentWillReceiveProps( nextProps ) {}
    shouldComponentUpdate( nextProps, nextState ) { return true; }
    componentWillUpdate( nextProps, nextState ) {}

    /**
     * Rendering 
     */
    render() {
        return <div className={styles[ 'canvas-container' ]} ref="canvas-container"> THREE Lines </div>
    }

    /**
     * Unmounting Phase
     */
    componentWillUnmount() {}





    /****************************************
     * Event Handlers
     */





    /****************************************
     * Other
     */

}

