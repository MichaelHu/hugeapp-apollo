import * as THREE from 'three';

export default function cone( texture = false ) {

    /**
     * 圆锥体
     * ConeGeometry(radius : Float, height : Float, radialSegments : Integer
     *      , heightSegments : Integer, openEnded : Boolean
     *      , thetaStart : Float, thetaLength : Float)
     * 
     * radius — Radius of the cone at the base. Default is 20.
     * height — Height of the cone. Default is 100.
     * radialSegments — Number of segmented faces around the circumference of the cone. Default is 8
     * heightSegments — Number of rows of faces along the height of the cone. Default is 1.
     * openEnded — A Boolean indicating whether the base of the cone is open or capped. Default is false, meaning capped.
     * thetaStart — Start angle for first segment, default = 0 (three o'clock position).
     * thetaLength — The central angle, often called theta, of the circular sector. The default is 2*Pi, which makes for a complete cone.
     */

    let coneGeometry = new THREE.ConeGeometry( 1.5, 2, 8 );
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

    let cone = new THREE.Mesh( coneGeometry, phongMaterial );
    let lineMaterial = new THREE.LineBasicMaterial( {
        color: 0xffffff
        , transparent: true
        , opacity: 0.3
    } );
    let edges = new THREE.EdgesGeometry( coneGeometry );

    let group = new THREE.Group();
    group.add( cone );

    let lineSegments = new THREE.LineSegments( edges, lineMaterial );
    group.add( lineSegments );

    lineSegments = new THREE.LineSegments( coneGeometry, lineMaterial );
    group.add( lineSegments );

    return group;
}

