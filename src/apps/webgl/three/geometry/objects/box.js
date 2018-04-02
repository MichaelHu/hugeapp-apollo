import * as THREE from 'three';

export default function box() {

    /**
     * BoxGeometry(width : Float, height : Float, depth : Float
     *      , widthSegments : Integer, heightSegments : Integer, depthSegments : Integer)
     * 
     * width — Width of the sides on the X axis. Default is 1.
     * height — Height of the sides on the Y axis. Default is 1.
     * depth — Depth of the sides on the Z axis. Default is 1.
     * widthSegments — Optional. Number of segmented faces along the width of the sides. Default is 1.
     * heightSegments — Optional. Number of segmented faces along the height of the sides. Default is 1.
     * depthSegments — Optional. Number of segmented faces along the depth of the sides. Default is 1.
     */

    let boxGeometry = new THREE.BoxGeometry( 2, 2, 2 );
    // let basicMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    let phongMaterial = new THREE.MeshPhongMaterial( {
        color: 0x156289
        , emissive: 0x072534
        // , side: THREE.DoubleSide
        , flatShading: true
    } );
    let box = new THREE.Mesh( boxGeometry, phongMaterial );
    let lineMaterial = new THREE.LineBasicMaterial( {
        color: 0xffffff
        , transparent: true
        , opacity: 0.3
    } );

    let group = new THREE.Group();
    group.add( box );

    let lineSegments = new THREE.LineSegments( boxGeometry, lineMaterial );
    group.add( lineSegments );
    let edges = new THREE.EdgesGeometry( boxGeometry );
    lineSegments = new THREE.LineSegments( edges, lineMaterial );
    group.add( lineSegments );

    return group;
}

