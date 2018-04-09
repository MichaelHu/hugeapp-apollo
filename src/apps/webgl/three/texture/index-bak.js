import Markdown from 'react-markdown';
import { Row, Col, Collapse, Button, Card, CardBody } from 'reactstrap';
import $ from 'jquery';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';

import styles from './index.scss';
// import imgA from './assets/America-China-2018.jpg';
// import imgA from './assets/mm-300-300.jpg';
import imgA from './assets/benz-1024-1024-1.jpg';
import imgB from './assets/sky-1024-1024.jpg';

console.log( imgA );

// for React 15 and below
// import React, { PropTypes, Component } from 'react';

export default class ThreeTexture extends Component {

    /**
     * Constructing
     */
    constructor( props ) {
        super( props );
        this.state = { showText: false };
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

        let geometry = new THREE.BoxGeometry( 1, 1, 1 );
        let cubeTextureLoader = new THREE.CubeTextureLoader();
        let textureLoader = new THREE.TextureLoader();
        let textureFace = textureLoader.load( imgA );
        let textureCube = cubeTextureLoader.load( 
            [ imgB, imgB, imgB, imgB, imgB, imgB ] 
        );

        textureCube.mapping = THREE.UVMapping;
        // textureCube.wrapS = THREE.RepeatWrapping;
        // textureCube.wrapT = THREE.RepeatWrapping;
        textureCube.wrapS = THREE.ClampToEdgeWrapping;
        textureCube.wrapT = THREE.ClampToEdgeWrapping;
        textureCube.magFilter = THREE.NearestFilter;
        textureCube.minFilter = THREE.NearestFilter;
        textureCube.magFilter = THREE.LinearFilter;
        textureCube.minFilter = THREE.LinearFilter;
        textureCube.repeat.set( 1, 1 );

        let material = new THREE.MeshBasicMaterial( { 
            color: 0xffffff 
            , opacity: 0.8
            , transparent: true
            // , envMap: textureCube
            , map: textureFace // color map
        } );
        let cube = new THREE.Mesh( geometry, material );
        scene.add( cube );
        camera.position.z = 2.5;

        function animate() {
            requestAnimationFrame( animate );
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
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
        return (
            <div>
                <div className={styles[ 'canvas-container' ]} ref="canvas-container"></div>
                THREE Geometries: <Button color="link" onClick={this.toggle}>Toogle</Button>
                <Row>
                    <Col>
                        <Collapse isOpen={this.state.showText}>
                            <Card>
                                <CardBody>
<Markdown source={`

## Texture

> three.js:19704 THREE.WebGLRenderer: image is not power of two (300x300). Resized to 256x256

* 尺寸为2的指数次幂，否则报warning

## CubeTexture

* 图片长宽必须一致
* material的envMap设置，是环境纹理，如何做皮肤设置？

`}/>
                                </CardBody>
                            </Card>
                        </Collapse>
                    </Col>
                </Row>
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


    toggle = () => {
        this.setState( {
            showText: !this.state.showText
        } );
    }



    /****************************************
     * Other
     */

}



