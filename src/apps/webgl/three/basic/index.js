import Markdown from 'react-markdown';
import $ from 'jquery';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import styles from './index.scss';

// for React 15 and below
// import React, { PropTypes, Component } from 'react';

export default class ThreeBasic extends Component {

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
            75
            , $container.width() / $container.height()
            , 0.1
            , 1000
        );
        let renderer = new THREE.WebGLRenderer();
        renderer.setSize( $container.width(), $container.height() );
        $container.append( renderer.domElement );

        // 1. to create a cube, we need a BoxGeometry
        let geometry = new THREE.BoxGeometry( 1, 1, 1 );
        // 2. in addition to the geometry, we need a material to color it
        let material = new THREE.MeshBasicMaterial( { 
            color: 0x00ff00 
            , opacity: 0.3
        } );
        let cube = new THREE.Mesh( geometry, material );
        scene.add( cube );
        camera.position.z = 3.5;
        // camera.position.x = -1.5;

        function animate() {
            // `requestAnimationFrame()` pauses when the user navigates to another 
            // browser tab, hence not wasting their precious processing power 
            // and battery life
            requestAnimationFrame( animate );
            cube.rotation.x += 0.05;
            cube.rotation.y += 0.05;
            renderer.render( scene, camera );
        }

        const onresize = () => {
            renderer.setSize( $container.width(), $container.height() );
            renderer.render( scene, camera );
        };

        $( window ).on( 'resize', onresize );

        animate();
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
        return <div className={styles[ 'canvas-container' ]} ref="canvas-container"> THREE Basic </div>
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


