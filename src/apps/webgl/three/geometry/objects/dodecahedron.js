import * as THREE from 'three';

export default function dodecahedron( texture = false ) {

    /**
     * DodecahedronGeometry(radius : Float, detail : Integer)
     * 
     * radius — Radius of the dodecahedron. Default is 1.
     * detail — Default is 0. Setting this to a value greater than 0 adds vertices making it no longer a dodecahedron.
     */
    let dodecahedronGeometry = new THREE.DodecahedronGeometry( 1.5 );
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

    let dodecahedron = new THREE.Mesh( dodecahedronGeometry, phongMaterial );
    let lineMaterial = new THREE.LineBasicMaterial( {
        color: 0xffffff
        , transparent: true
        , opacity: 0.3
    } );
    let edges = new THREE.EdgesGeometry( dodecahedronGeometry );
    let lineSegments = new THREE.LineSegments( edges, lineMaterial );

    let group = new THREE.Group();
    group.add( dodecahedron );
    group.add( lineSegments );

    return group;
}

