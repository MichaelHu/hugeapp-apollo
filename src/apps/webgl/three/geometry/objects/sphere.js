import * as THREE from 'three';

export default function sphere( texture = false ) {

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

    let sphereGeometry = new THREE.SphereGeometry( 2, 20, 16 );
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

