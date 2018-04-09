import * as THREE from 'three';

export default function polyhedron( texture = false ) {

    /**
     * A polyhedron is a solid in three dimensions with flat faces. This class will take 
     *      an array of vertices, project them onto a sphere, and then divide them up to 
     *      the desired level of detail.
     *
     * PolyhedronGeometry(vertices : Array, indices : Array, radius : Float, detail : Integer)
     * 
     * vertices — Array of points of the form [1,1,1, -1,-1,-1, ... ]
     * indices — Array of indices that make up the faces of the form [0,1,2, 2,3,0, ... ]
     * radius — Float - The radius of the final shape
     * detail — Integer - How many levels to subdivide the geometry. The more detail, the smoother the shape.
     */

    let verticesOfCube = [
        -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
        -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
    ];

    let indicesOfFaces = [
        2,1,0,    0,3,2,
        0,4,7,    7,3,0,
        0,1,5,    5,4,0,
        1,2,6,    6,5,1,
        2,3,7,    7,6,2,
        4,5,6,    6,7,4
    ];

    let polyhedronGeometry = new THREE.PolyhedronGeometry( verticesOfCube, indicesOfFaces, 2 );
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

    let polyhedron = new THREE.Mesh( polyhedronGeometry, phongMaterial );
    let lineMaterial = new THREE.LineBasicMaterial( {
        color: 0xffffff
        , transparent: true
        , opacity: 0.3
    } );

    let group = new THREE.Group();
    group.add( polyhedron );

    let lineSegments = new THREE.LineSegments( polyhedronGeometry, lineMaterial );
    group.add( lineSegments );
    let edges = new THREE.EdgesGeometry( polyhedronGeometry );
    lineSegments = new THREE.LineSegments( edges, lineMaterial );
    group.add( lineSegments );

    return group;
}

