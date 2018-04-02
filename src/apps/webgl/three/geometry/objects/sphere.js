import * as THREE from 'three';

export default function sphere() {

    /**
     * SphereGeometry(radius : Float, widthSegments : Integer, heightSegments : Integer
     *      , phiStart : Float, phiLength : Float
     *      , thetaStart : Float, thetaLength : Float)
     * 
     * radius — sphere radius. Default is 1.
     * widthSegments — number of horizontal segments. Minimum value is 3, and the default is 8.
     * heightSegments — number of vertical segments. Minimum value is 2, and the default is 6.
     * phiStart — specify horizontal starting angle. Default is 0.
     * phiLength — specify horizontal sweep angle size. Default is Math.PI * 2.
     * thetaStart — specify vertical starting angle. Default is 0.
     * thetaLength — specify vertical sweep angle size. Default is Math.PI.
     */

    let sphereGeometry = new THREE.SphereGeometry( 2 );
    // let basicMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    let phongMaterial = new THREE.MeshPhongMaterial( {
        color: 0x156289
        , emissive: 0x072534
        // , side: THREE.DoubleSide
        , flatShading: true
    } );
    let sphere = new THREE.Mesh( sphereGeometry, phongMaterial );
    let lineMaterial = new THREE.LineBasicMaterial( {
        color: 0xffffff
        , transparent: true
        , opacity: 0.3
    } );
    let lineSegments = new THREE.LineSegments( sphereGeometry, lineMaterial );

    let group = new THREE.Group();
    group.add( sphere );
    group.add( lineSegments );

    return group;
}

