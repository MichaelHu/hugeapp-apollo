import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import * as THREE from 'three';
import styles from './index.scss';

// for React 15 and below
// import React, { PropTypes, Component } from 'react';

export default class Plane extends Component {

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

        let planeGeometry = new THREE.PlaneBufferGeometry( 5, 2, 2 ); 
        let lineMaterial = new THREE.LineBasicMaterial( {
            color: 0xffff00
            , transparent: true
            , opacity: 0.8
        } );
        let phongMaterial = new THREE.MeshPhongMaterial( {
            color: 0x156289
            , emissive: 0x072534
            , side: THREE.DoubleSide
            , flatShading: true
        } );

        let lineSegments = new THREE.LineSegments( planeGeometry, lineMaterial );
        let plane = new THREE.Mesh( planeGeometry, phongMaterial );

        // let group = new THREE.Group();
        let group = new THREE.Object3D();

        let renderer = new THREE.WebGLRenderer( { antialias: true } );

        // plane.rotation.x = Math.PI / 4;

        let lights = [];
        lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

        lights[ 0 ].position.set( 0, 200, 0 );
        lights[ 1 ].position.set( 100, 200, 100 );
        lights[ 2 ].position.set( - 100, - 200, - 100 );

        scene.add( lights[ 0 ] );
        scene.add( lights[ 1 ] );
        scene.add( lights[ 2 ] );

        group.add( lineSegments );
        group.add( plane );
        scene.add( camera );
        scene.add( group );

        $container.append( renderer.domElement );
        camera.position.z = 10;
        // camera.position.y = 2;
        // pointLight.position.set( 0, 20, 20 );
        renderer.setSize( $container.width(), $container.height() );
        renderer.setClearColor( 0x000000, 1 );

        const render = () => {
            renderer.render( scene, camera );
        };

        const animate = () => {
            requestAnimationFrame( animate );
            render();
            group.rotation.y += 0.02;
            // group.rotation.x += 0.01;
            plane.rotation.x += 0.01;
        };

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
        return (
            <div 
                className={styles[ 'canvas-container' ]} 
                ref="canvas-container">
            THREE Plane 
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





    /****************************************
     * Other
     */

}

