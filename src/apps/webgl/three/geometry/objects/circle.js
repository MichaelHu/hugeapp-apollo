import * as THREE from 'three';

export default function circle() {

    /**
     * CircleGeometry(radius : Float, segments : Integer, thetaStart : Float, thetaLength : Float)
     * radius — Radius of the circle, default = 1.
     * segments — Number of segments (triangles), minimum = 3, default = 8.
     * thetaStart — Start angle for first segment, default = 0 (three o'clock position).
     * thetaLength — The central angle, often called theta, of the circular sector. The default is 2*Pi, which makes for a complete circle.
     */
    let circleGeometry = new THREE.CircleGeometry( 2, 16 );
    // let basicMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    let phongMaterial = new THREE.MeshPhongMaterial( {
        color: 0x156289
        , emissive: 0x072534
        , side: THREE.DoubleSide
        , flatShading: true
    } );
    let circle = new THREE.Mesh( circleGeometry, phongMaterial );
    let lineMaterial = new THREE.LineBasicMaterial( {
        color: 0xffffff
        , transparent: true
        , opacity: 0.3
    } );
    let lineSegments = new THREE.LineSegments( circleGeometry, lineMaterial );

    let group = new THREE.Group();
    group.add( circle );
    group.add( lineSegments );

    return group;
}
