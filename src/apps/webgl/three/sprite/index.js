import Markdown from 'react-markdown';
import { Row, Col, Collapse, Button, Card, CardBody } from 'reactstrap';
import $ from 'jquery';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';

import styles from './index.scss';
// import imgA from './assets/America-China-2018.jpg';
import imgA from '../texture/assets/mm-300-300.jpg';

console.log( imgA );

// for React 15 and below
// import React, { PropTypes, Component } from 'react';

export default class ThreeSprite extends Component {

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
        let loader = new THREE.TextureLoader();
        let spriteMap = loader.load( imgA );

        let material = new THREE.SpriteMaterial( { 
            color: 0xffffff 
            // , opacity: 0.8
            // , transparent: false
            , map: spriteMap
        } );
        let sprite = new THREE.Sprite( material );
        scene.add( sprite );
        camera.position.z = 5;

        function animate() {
            requestAnimationFrame( animate );
            // console.log( sprite.rotation );
            // sprite.rotation.y += 0.05;
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




