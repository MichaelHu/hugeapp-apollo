import * as THREE from 'three';

export default function torus() {

    /**
     * 圆环面
     * TorusGeometry(radius : Float, tube : Float, radialSegments : Integer
     *      , tubularSegments : Integer, arc : Float)
     * 
     * radius - Radius of the torus, from the center of the torus to the center of the tube. Default is 1. 
     * tube — Radius of the tube. Default is 0.4. 
     * radialSegments — Default is 8 
     * tubularSegments — Default is 6. 
     * arc — Central angle. Default is Math.PI * 2.
     */
    let torusGeometry = new THREE.TorusGeometry( 3, 0.5, 10, 20 );
    // let basicMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    let phongMaterial = new THREE.MeshPhongMaterial( {
        color: 0x156289
        , emissive: 0x072534
        // , side: THREE.DoubleSide
        , flatShading: true
    } );
    let torus = new THREE.Mesh( torusGeometry, phongMaterial );
    let lineMaterial = new THREE.LineBasicMaterial( {
        color: 0xffffff
        , transparent: true
        , opacity: 0.3
    } );
    let lineSegments = new THREE.LineSegments( torusGeometry, lineMaterial );

    let group = new THREE.Group();
    group.add( torus );
    group.add( lineSegments );

    return group;
}

