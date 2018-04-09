import * as THREE from 'three';

export default function wireframe( texture = false ) {

    /**
     * This can be used as a helper object to view a Geometry object as a wireframe.
     *
     * WireframeGeometry( geometry : Geometry )
     * 
     * geometry — any geometry object. 
     */

    let sphereGeometry = new THREE.SphereGeometry( 1.5 );
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
    let wireframe = new THREE.WireframeGeometry( sphereGeometry );
    let lineSegments = new THREE.LineSegments( wireframe, lineMaterial );

    let group = new THREE.Group();
    group.add( sphere );
    group.add( lineSegments );

    return group;
}

