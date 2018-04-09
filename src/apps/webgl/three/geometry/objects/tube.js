import * as THREE from 'three';

function CustomSinCurve( scale ) {
    THREE.Curve.call( this );
    this.scale = ( scale === undefined ) ? 1 : scale;
}

CustomSinCurve.prototype = Object.create( THREE.Curve.prototype );
CustomSinCurve.prototype.constructor = CustomSinCurve;

// one argument method
CustomSinCurve.prototype.getPoint = function( t ) {
    let tx = t * 3 - 1.5;
    let ty = Math.sin( 2 * Math.PI * t );
    let tz = 0;
    return new THREE.Vector3( tx, ty, tz ).multiplyScalar( this.scale );
};

export default function tube( texture = false ) {

    /**
     * TubeGeometry(path : Curve, tubularSegments : Integer, radius : Float
     *      , radialSegments : Integer, closed : Boolean)
     * 
     * path — Curve - A path that inherits from the Curve base class
     * tubularSegments — Integer - The number of segments that make up the tube, default is 64
     * radius — Float - The radius of the tube, default is 1
     * radialSegments — Integer - The number of segments that make up the cross-section, default is 8 
     * closed — Boolean Is the tube open or closed, default is false 
     */

    let path = new CustomSinCurve( 1 ); 
    let tubeGeometry = new THREE.TubeGeometry( path, 64, 0.3, 10, false );
    // let basicMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    let phongMaterial = new THREE.MeshPhongMaterial( {
        color: 0x156289
        , emissive: 0x072534
        , side: THREE.DoubleSide
        , flatShading: true
    } );

    if ( texture ) {
        let mapImage, envImage;
        let mapTexture, envTexture;
        let textureLoader, envTextureLoader;

        if ( 'string' == typeof texture ) {
            mapImage = texture;
            envTexture = null;
            textureLoader = new THREE.TextureLoader();;
            mapTexture = textureLoader.load( texture );
        }
        else {
            mapImage = texture.map;
            envTexture = texture.env;
            textureLoader = new THREE.TextureLoader();;
            mapTexture = textureLoader.load( texture );
            // todo
        }
        phongMaterial.map = mapTexture; 
    }      

    let tube = new THREE.Mesh( tubeGeometry, phongMaterial );
    let lineMaterial = new THREE.LineBasicMaterial( {
        color: 0xffffff
        , transparent: true
        , opacity: 0.3
    } );
    let lineSegments = new THREE.LineSegments( tubeGeometry, lineMaterial );

    let group = new THREE.Group();
    group.add( tube );
    group.add( lineSegments );

    return group;
}


