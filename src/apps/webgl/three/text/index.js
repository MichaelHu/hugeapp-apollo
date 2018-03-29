import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import * as THREE from 'three';
import { Row, Col, Form, FormGroup
    , Label, Input, Button } from 'reactstrap';

import styles from './index.scss';
import * as fonts from '../assets/fonts';

// for React 15 and below
// import React, { PropTypes, Component } from 'react';

export default class Text extends Component {

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
        scene.background = new THREE.Color( 0x000000 );
        scene.fog = new THREE.Fog( 0x000000, 250, 1400 );

        let camera = new THREE.PerspectiveCamera(
            30
            , $container.width() / $container.height()
            , 1
            , 1500
        );
        let cameraTarget = new THREE.Vector3( 0, 150, 0 );
        camera.position.set( 0, 400, 700 );

        // 1. parallel light rays
        // 2. used to simulate daylights
        // 3. DirectionalLight( color: Integer, intensity: Float )
        // 4. <https://threejs.org/docs/index.html#api/lights/DirectionalLight>
        let dirLight = new THREE.DirectionalLight( 0xffffff, 0.125 );
        dirLight.position.set( 0, 0, 1 ).normalize();
        scene.add( dirLight );

        let pointLight = new THREE.PointLight( 0xffffff, 2.5 );
        pointLight.position.set( 0, 100, 200 );
        scene.add( pointLight );
        // set HSL color: setHSL( h: Float, s: Float, l: Float )
        //    h( 色相 )   - hue value between 0.0 and 1.0
        //    s( 饱和度 ) - saturation value between 0.0 and 1.0
        //    l( 明度 )   - lightness value between 0.0 and 1.0
        // pointLight.color.setHSL( Math.random(), 1, 0.5 );
        // pointLight.color.setHSL( 0.32, 1, 0.8 );
        // pointLight.color.set( 0xd62728 );
        pointLight.color.set( 0x2ca02c );
        
        let materials = [
            // front
            new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } )
            // side
            , new THREE.MeshPhongMaterial( { color: 0xffffff } )
        ];

        let group = new THREE.Group();
        group.position.y = 100;
        scene.add( group );

        // loadFont();

        // 1. A two dimensional surface that extends infinitely in 3d space, represented in 
        //    `Hessian normal form` by a unit length normal vector and a constant.
        // 2. Plane: <https://threejs.org/docs/index.html#api/math/Plane>
        // 3. Hessian normal form: <http://mathworld.wolfram.com/HessianNormalForm.html>
        let plane = new THREE.Mesh(
            new THREE.PlaneBufferGeometry( 10000, 10000 )
            , new THREE.MeshBasicMaterial( { 
                color: 0x98df8a
                , opacity: 0.5
                , transparent: true 
                // , side: THREE.DoubleSide
            } )
        );
        plane.position.y = 100;
        plane.rotation.x = - Math.PI / 2;
        scene.add( plane );

        let renderer = new THREE.WebGLRenderer( { antialias: true } );
        // renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( $container.width(), $container.height() );
        $container.append( renderer.domElement );

        let text = '阿波罗号';
        let textMesh1, textMesh2;
        // let fontName = 'Gentilis';
        // let fontWeight = 'Bold';
        let fontName = 'FZQiTi';
        let fontWeight = 'Regular';
        let font;
        // the thickness of the text
        let height = 30;
        let size = 70;
        let hover = 40;
        let curveSegments = 4;
        let bevelThickness = 2;
        let bevelSize = 1.5;
        let bevelSegments = 3;
        let bevelEnabled = true;
        let useMirror = true;

        loadFont();
        // this.unbindKeyEvents = bindKeyEvents();
        this.refreshText = refreshText;
        animate();

        // console.log( this.refs.input );
        // let input = this.refs.input;
        // $( input ).on( 'keydown keypress', ( e ) => {
        //     console.log( '== input key events ' + e.type );
        //     e.stopPropagation();
        // } );


        function animate() {
            requestAnimationFrame( animate );
            render();
        }

        function render() {
            camera.lookAt( cameraTarget );
            renderer.clear();
            group.rotation.y += 0.01;
            renderer.render( scene, camera );
        }

        function loadFont() {
            let loader = new THREE.FontLoader();
            loader.load( fonts[ fontName + fontWeight ], ( response ) => {
                font = response;
                refreshText();
            } );
        }

        function createText() {
            let textGeo = new THREE.TextGeometry(
                text
                , {
                    font: font
                    , size: size
                    , height: height
                    , curveSegments: curveSegments
                    , bevelThickness: bevelThickness
                    , bevelSize: bevelSize
                    , bevelEnabled: bevelEnabled
                }
            );

            textGeo.computeBoundingBox();
            textGeo.computeVertexNormals();

            // if ( ! bevelEnabled ) { ... }
            
            let centerOffset = - 0.5 * ( textGeo.boundingBox.max.x  - textGeo.boundingBox.min.x );
           
            textMesh1 = new THREE.Mesh( textGeo, materials );
            textMesh1.position.x = centerOffset;
            textMesh1.position.y = hover;
            textMesh1.position.z = 0;

            textMesh1.rotation.x = 0;
            // ? why 2PI
            textMesh1.rotation.y = Math.PI * 2;
            group.add( textMesh1 );

            if ( useMirror ) {
                textMesh2 = new THREE.Mesh( textGeo, materials );

                textMesh2.position.x = centerOffset;
                textMesh2.position.y = - hover;
                textMesh2.position.z = height;

                textMesh2.rotation.x = Math.PI;
                // ? why 2PI
                textMesh2.rotation.y = Math.PI * 2;

                group.add( textMesh2 );
            }
        }

        function refreshText( newText ) {
            text = newText || text;
            group.remove( textMesh1 );

            if ( useMirror ) {
                group.remove( textMesh2 );
            }

            if ( ! text ) {
                return ;
            }

            createText();
        }

        function bindKeyEvents() {
            const onkeydown = ( e ) => {
                console.log( 'document keydown' );
                // backspace
                if ( e.keyCode == 8 ) {
                    e.preventDefault();
                    text = text.substr( 0, text.length - 1 );
                    refreshText();
                }
            };
            const onkeypress = ( e ) => {
                console.log( 'document keypress' );
                // backspace
                if ( e.keyCode == 8 ) {
                    e.preventDefault();
                }
                let char = String.fromCharCode( e.charCode );
                console.log( char );
                text += char;
                refreshText();
            };

            $( document ).on( 'keydown', onkeydown );
            $( document ).on( 'keypress', onkeypress );

            return () => {
                $( document ).off( 'keydown', onkeydown );
                $( document ).off( 'keypress', onkeypress );
            };

        }

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
            <div className={styles[ 'canvas-container' ]} ref="canvas-container"> 
            THREE Text 
                <Form>
                    <FormGroup>
                        <Input ref="input"
                            onKeyDown={this.onTextKeyDown}
                            placeholder="Type text to show in 3D space"
                            />
                    </FormGroup>
                </Form>
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

    onTextKeyDown = ( e ) => {
        if ( e.keyCode == 13 ) {
            e.preventDefault();
            this.refreshText( e.target.value );
        }
        e.stopPropagation();
    }





    /****************************************
     * Other
     */

}

