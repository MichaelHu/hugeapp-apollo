import * as THREE from 'three';

const heartShape = ( x, y, size ) => {
    x = x || 0;
    y = y || 0;
    let s = size || 1;
    let shape = new THREE.Shape();

    s /= 10;

    shape.moveTo( x + 5 * s, y + 5 * s );
    shape.bezierCurveTo(  x + 5 * s,    y + 5 * s,  x + 4 * s,            y,          x,          y );
    shape.bezierCurveTo(  x - 6 * s,            y,  x - 6 * s,    y + 7 * s,  x - 6 * s,  y + 7 * s );
    shape.bezierCurveTo(  x - 6 * s,   y + 11 * s,  x - 3 * s, y + 15.4 * s,  x + 5 * s, y + 19 * s );
    shape.bezierCurveTo( x + 12 * s, y + 15.4 * s, x + 16 * s,   y + 11 * s, x + 16 * s,  y + 7 * s );
    shape.bezierCurveTo( x + 16 * s,    y + 7 * s, x + 16 * s,            y, x + 10 * s,          y );
    shape.bezierCurveTo(  x + 7 * s,            y,  x + 5 * s,    y + 5 * s,  x + 5 * s,  y + 5 * s );

    return shape;
};

export default function shape() {

    /**
     * iShapeGeometry(shapes : Array, curveSegments : Integer)
     * 
     * shapes — Array of shapes or a single shape.
     * curveSegments - Integer - Number of segments per shape. Default is 12.
     */

    let shapeGeometry = new THREE.ShapeGeometry( heartShape( 0, -2, 2 ) );
    // let basicMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    let phongMaterial = new THREE.MeshPhongMaterial( {
        color: 0x156289
        , emissive: 0x072534
        , side: THREE.DoubleSide
        , flatShading: true
    } );
    let shape = new THREE.Mesh( shapeGeometry, phongMaterial );
    let lineMaterial = new THREE.LineBasicMaterial( {
        color: 0xffffff
        , transparent: true
        , opacity: 0.3
    } );
    let lineSegments = new THREE.LineSegments( shapeGeometry, lineMaterial );

    let group = new THREE.Group();
    group.add( shape );
    group.add( lineSegments );

    return group;
}

