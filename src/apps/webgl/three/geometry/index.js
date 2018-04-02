import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import { Row, Col, Collapse, Button, Card, CardBody } from 'reactstrap';

import circleObject from './objects/circle';
import boxObject from './objects/box';
import coneObject from './objects/cone';
import cylinderObject from './objects/cylinder';
import dodecahedronObject from './objects/dodecahedron';
import edgesObject from './objects/edges';
import ringObject from './objects/ring';
import shapeObject from './objects/shape';
import sphereObject from './objects/sphere';
import torusObject from './objects/torus';
import torusKnotObject from './objects/torusknot';
import tubeObject from './objects/tube';
import tetrahedronObject from './objects/tetrahedron';
import polyhedronObject from './objects/polyhedron';
import wireframeObject from './objects/wireframe';

import styles from './index.scss';

export default class ThreeGeometry extends Component {

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
            45
            , $container.width() / $container.height()
            , 1
            , 500
        );
        let renderer = new THREE.WebGLRenderer( { antialias: true } );


        let groups = [];
        groups.push( circleObject() );
        groups.push( boxObject() );
        groups.push( coneObject() );
        groups.push( cylinderObject() );
        groups.push( edgesObject() );
        groups.push( ringObject() );
        groups.push( shapeObject() );
        groups.push( dodecahedronObject() );
        groups.push( torusObject() );
        groups.push( torusKnotObject() );
        groups.push( tubeObject() );
        groups.push( tetrahedronObject() );
        groups.push( polyhedronObject() );
        groups.push( wireframeObject() );
        groups.push( sphereObject() );

        groups.forEach( ( group ) => scene.add( group ) );

        let dirLight = new THREE.DirectionalLight( 0xff00ff, 0.7 );
        dirLight.position.set( 0, 0, 1 ).normalize();
        scene.add( dirLight );

        let pointLight = new THREE.PointLight( 0xffffff, 1.5 );
        pointLight.position.set( -10, -10, -20 );
        scene.add( pointLight );

        $container.append( renderer.domElement );
        camera.position.z = 20;
        camera.position.x = -20;
        camera.position.y = -10;
        camera.lookAt( 0, 0, 0 );
        renderer.setSize( $container.width(), $container.height() );

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
            render();
        };

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
                THREE Geometries: <Button color="primary" onClick={this.toggle}>Toogle</Button>
                <Row>
                    <Col>
                        <Collapse isOpen={this.state.showText}>
                            <Card>
                                <CardBody>
<Markdown source={`

    CircleGeometry              圆盘
    BoxGeometry                 立方体（三维方块）
    ConeGeometry                圆锥体
    CylinderGeometry            圆柱体
    DodecahedronGeometry        十二面体
    EdgesGeometry               边几何体，用于展示其他几何体
    RingGeometry                圆环
    ShapeGeometry               自定义形状
    SphereGeometry              球体 
    TorusGeometry               圆环面 
    TorusKnotGeometry           圆环结
    TubeGeometry                管状体
    TetrahedronGeometry         四面体
    PolyhedronGeometry          自定义多面体
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

