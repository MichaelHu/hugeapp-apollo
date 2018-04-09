import * as THREE from 'three';

export default function ring( texture = false ) {

    /**
     * RingGeometry(innerRadius : Float, outerRadius : Float, thetaSegments : Integer
     *      , phiSegments : Integer, thetaStart : Float, thetaLength : Float)
     * 
     * innerRadius — Default is 0.5. 
     * outerRadius — Default is 1. 
     * thetaSegments — Number of segments. A higher number means the ring will be more round. Minimum is 3. Default is 8. 
     * phiSegments — Minimum is 1. Default is 8.
     * thetaStart — Starting angle. Default is 0. 
     * thetaLength — Central angle. Default is Math.PI * 2.
     */

    let ringGeometry = new THREE.RingGeometry( 1, 2, 8, 8, 0, 2 * Math.PI );
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

    let ring = new THREE.Mesh( ringGeometry, phongMaterial );
    let lineMaterial = new THREE.LineBasicMaterial( {
        color: 0xffffff
        , transparent: true
        , opacity: 0.3
    } );
    let lineSegments = new THREE.LineSegments( ringGeometry, lineMaterial );

    let group = new THREE.Group();
    group.add( ring );
    group.add( lineSegments );

    return group;
}

