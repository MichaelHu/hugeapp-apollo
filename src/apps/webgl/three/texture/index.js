import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import { Row, Col, Collapse, Button, Card, CardBody } from 'reactstrap';

import circleObject from '../geometry/objects/circle';
import boxObject from '../geometry/objects/box';
import coneObject from '../geometry/objects/cone';
import cylinderObject from '../geometry/objects/cylinder';
import dodecahedronObject from '../geometry/objects/dodecahedron';
import edgesObject from '../geometry/objects/edges';
import ringObject from '../geometry/objects/ring';
import shapeObject from '../geometry/objects/shape';
import sphereObject from '../geometry/objects/sphere';
import torusObject from '../geometry/objects/torus';
import torusKnotObject from '../geometry/objects/torusknot';
import tubeObject from '../geometry/objects/tube';
import tetrahedronObject from '../geometry/objects/tetrahedron';
import polyhedronObject from '../geometry/objects/polyhedron';
import wireframeObject from '../geometry/objects/wireframe';

import 'three/examples/js/controls/OrbitControls';

import styles from './index.scss';
import imgA from './assets/benz-1024-1024-1.jpg';

export default class ThreeGeometry extends Component {

    /**
     * Constructing
     */
    constructor( props ) {
        super( props );
        this.state = { showText: false };
        this.unregisterEvents = [];
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
        let renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setClearColor( new THREE.Color( 0xff0000, 0.6 ) );


        let groups = [];
        groups.push( circleObject( imgA ) );
        groups.push( boxObject( imgA ) );
        groups.push( coneObject( imgA ) );
        groups.push( cylinderObject( imgA ) );
        groups.push( edgesObject( imgA ) );
        groups.push( ringObject( imgA ) );
        groups.push( shapeObject( imgA ) );
        groups.push( dodecahedronObject( imgA ) );
        groups.push( torusObject( imgA ) );
        groups.push( torusKnotObject( imgA ) );
        groups.push( tubeObject( imgA ) );
        groups.push( tetrahedronObject( imgA ) );
        groups.push( polyhedronObject( imgA ) );
        groups.push( wireframeObject( imgA ) );
        groups.push( sphereObject( imgA ) );

        groups.forEach( ( group ) => scene.add( group ) );

        let dirLight = new THREE.DirectionalLight( 0xff00ff, 1 );
        dirLight.position.set( 0, 0, 1 ).normalize();
        scene.add( dirLight );

        let pointLight = new THREE.PointLight( 0xffffff, 2.5 );
        pointLight.position.set( -10, -10, -20 );
        scene.add( pointLight );

        $container.append( renderer.domElement );
        camera.position.z = 20;
        camera.position.x = -20;
        camera.position.y = -10;
        camera.lookAt( 0, 0, 0 );
        renderer.setSize( $container.width(), $container.height() );

        /**
         * OrbitControls( object : Camera, domElement : HTMLDOMElement )
         * 
         * object: (required) The camera to be controlled.
         * domElement: (optional) The HTML element used for event listeners. By default this is the whole document, however if you only want to the controls to work over a specific element (e.g. the canvas) you can specify that here.
         */
        let controls = new THREE.OrbitControls( camera );
        controls.update();
        this.unregisterEvents.push( () => controls.dispose() );

        const layout = () => {
            let level = 0;
            for ( let i = 0; i < groups.length; i++ ) {
                let group = groups[ i ];
                if ( i == groups.length - 1 ) {
                    group.position.set( 0, 0, 0 );
                }
                else if ( i % 6 == 0 ) {
                    level += 5;
                    group.position.set( level, 0, 0 );
                }
                else if ( i % 6 == 1 ) {
                    group.position.set( -level, 0, 0 );
                }
                else if ( i % 6 == 2 ) {
                    group.position.set( 0, level, 0 );
                }
                else if ( i % 6 == 3 ) {
                    group.position.set( 0, -level, 0 );
                }
                else if ( i % 6 == 4 ) {
                    group.position.set( 0, 0, level );
                }
                else {
                    group.position.set( 0, 0, -level );
                }
            }
        }

        const render = () => {
            renderer.render( scene, camera );
        };

        const animate = () => {
            requestAnimationFrame( animate );
            groups.forEach( ( group ) => group.rotation.y += 0.01 );
            controls.update();
            render();
        };

        const onresize = () => {
            renderer.setSize( $container.width(), $container.height() );
            render();
        };

        $( window ).on( 'resize', onresize );

        this.unregisterEvents.push( () => $( window ).off( 'resize', onresize ) );

        layout();
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
                <div className={styles[ 'canvas-container' ]} 
                    ref="canvas-container">
                </div>
                THREE Geometries: <Button color="link" onClick={this.toggle}>Toogle</Button>
                <Row>
                    <Col>
                        <Collapse isOpen={this.state.showText}>
                            <Card>
                                <CardBody>
<Markdown source={`
## 光

    DirectionalLight            方向光源，发射平行光
    PointLight                  点光源

## 几何体

    CircleGeometry              圆盘
    BoxGeometry                 立方体（三维方块）
    ConeGeometry                圆锥体
    CylinderGeometry            圆柱体
    DodecahedronGeometry        十二面体
    RingGeometry                圆环
    ShapeGeometry               自定义形状
    SphereGeometry              球体 
    TorusGeometry               圆环面 
    TorusKnotGeometry           圆环结
    TubeGeometry                管状体
    TetrahedronGeometry         四面体
    PolyhedronGeometry          自定义多面体

## 辅助类几何体

    EdgesGeometry               边几何体，用于展示其他几何体
    WireframeGeometry           线框体，用于展示其他几何体

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
    componentWillUnmount() {
        this.unregisterEvents.forEach( unreg => unreg() );
    }





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


