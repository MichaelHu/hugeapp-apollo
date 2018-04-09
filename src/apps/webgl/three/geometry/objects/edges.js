import * as THREE from 'three';

export default function edges( texture = false ) {

    /**
     * EdgesGeometry( geometry : Geometry, thresholdAngle : Integer )
     * 
     * geometry — Any geometry object.
     * thresholdAngle — An edge is only rendered if the angle (in degrees) between the face normals of the adjoining faces exceeds this value. default = 1 degree.
     */

    let boxGeometry = new THREE.BoxGeometry( 2, 2, 2 );
    // let basicMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    let phongMaterial = new THREE.MeshPhongMaterial( {
        color: 0x156289
        , emissive: 0x072534
        // , side: THREE.DoubleSide
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

    let box = new THREE.Mesh( boxGeometry, phongMaterial );
    let lineMaterial = new THREE.LineBasicMaterial( {
        color: 0xffffff
        , transparent: true
        , opacity: 0.3
    } );
    let edges = new THREE.EdgesGeometry( boxGeometry );
    let lineSegments = new THREE.LineSegments( edges, lineMaterial );

    let group = new THREE.Group();
    group.add( box );
    group.add( lineSegments );

    return group;
}


