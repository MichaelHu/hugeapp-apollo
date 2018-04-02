import * as THREE from 'three';

export default function cylinder() {

    /**
     * CylinderGeometry(radiusTop : Float, radiusBottom : Float, height : Float
     *      , radialSegments : Integer, heightSegments : Integer, openEnded : Boolean
     *      , thetaStart : Float, thetaLength : Float)
     * 
     * radiusTop — Radius of the cylinder at the top. Default is 1.
     * radiusBottom — Radius of the cylinder at the bottom. Default is 1.
     * height — Height of the cylinder. Default is 1.
     * radialSegments — Number of segmented faces around the circumference of the cylinder. Default is 8
     * heightSegments — Number of rows of faces along the height of the cylinder. Default is 1.
     * openEnded — A Boolean indicating whether the ends of the cylinder are open or capped. Default is false, meaning capped.
     * thetaStart — Start angle for first segment, default = 0 (three o'clock position).
     * thetaLength — The central angle, often called theta, of the circular sector. The default is 2*Pi, which makes for a complete cylinder.
     */

    let cylinderGeometry = new THREE.CylinderGeometry( 1, 1, 3, 32, 3 );
    // let basicMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    let phongMaterial = new THREE.MeshPhongMaterial( {
        color: 0x156289
        , emissive: 0x072534
        // , side: THREE.DoubleSide
        , flatShading: true
    } );
    let cylinder = new THREE.Mesh( cylinderGeometry, phongMaterial );
    let lineMaterial = new THREE.LineBasicMaterial( {
        color: 0xffffff
        , transparent: true
        , opacity: 0.3
    } );

    let group = new THREE.Group();
    group.add( cylinder );

    let lineSegments = new THREE.LineSegments( cylinderGeometry, lineMaterial );
    group.add( lineSegments );
    let edges = new THREE.EdgesGeometry( cylinderGeometry );
    lineSegments = new THREE.LineSegments( edges, lineMaterial );
    group.add( lineSegments );

    return group;
}

