import * as THREE from 'three';

export default function torusKnot() {

    /**
     * 圆环面
     * TorusKnotGeometry(radius : Float, tube : Float, tubularSegments : Integer
     *      , radialSegments : Integer, p : Integer, q : Integer)
     *
     * radius - Radius of the torus. Default is 1.
     * tube — Radius of the tube. Default is 0.4.
     * tubularSegments — Default is 64.
     * radialSegments — Default is 8.
     * p — This value determines, how many times the geometry winds around its axis of rotational symmetry. Default is 2.
     * q — This value determines, how many times the geometry winds around a circle in the interior of the torus. Default is 3.
     */
    let torusKnotGeometry = new THREE.TorusKnotGeometry( 1.5, 0.4, 64, 8, 1, 4 );
    // let basicMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    let phongMaterial = new THREE.MeshPhongMaterial( {
        color: 0x156289
        , emissive: 0x072534
        // , side: THREE.DoubleSide
        , flatShading: true
    } );
    let torusKnot = new THREE.Mesh( torusKnotGeometry, phongMaterial );
    let lineMaterial = new THREE.LineBasicMaterial( {
        color: 0xffffff
        , transparent: true
        , opacity: 0.3
    } );
    let lineSegments = new THREE.LineSegments( torusKnotGeometry, lineMaterial );

    let group = new THREE.Group();
    group.add( torusKnot );
    group.add( lineSegments );

    return group;
}

