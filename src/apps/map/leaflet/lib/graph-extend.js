import L from 'leaflet';

L.Projection.Graph = {
    project: function ( latLng ) {
        var projectedPoint = new L.Point( latLng.lng, latLng.lat );
        return projectedPoint;
    },

    unproject: function ( projectedPoint ) {
        var latLng = new L.LatLng( projectedPoint.y, projectedPoint.x );
        return latLng;
    },

    // projected point bounds
    bounds: ( function () {
        var MAX = Math.pow( 2, 10 ) / 2;
        var bounds = new L.Bounds(
            [ -MAX, -MAX ]
            , [ MAX, MAX ]
        );
        return bounds;
    } )()
};

// Coordinate Reference System - 坐标引用系统
L.CRS.graph = L.extend( {}, L.CRS, {
    code: 'graph',
    projection: L.Projection.Graph,
    infinite: false,
    transformation: ( function () {
        var z = 2 + 8;
        var maxPixelLength = Math.pow( 2, z );
        // return new L.Transformation( 1 / maxPixelLength, 0.5, - 1 / maxPixelLength, 0.5 );
        return new L.Transformation( 1 / maxPixelLength, 0.5, - 1 / maxPixelLength, 0.5 );
    } )()
});

L.TileLayer.Graph = L.TileLayer.extend({
    options: {
        minZoom: 1,
        maxZoom: 6
    },

    initialize: function (type, options) {
        type = type || 'Normal.Map';
        options = options || {};

        var desc = L.TileLayer.Graph.desc
            , parts = type.split('.')
            , mapName = parts[0]
            , mapType = parts[1]
            , url = desc[mapName][mapType]
            ;

        options.subdomains = desc.subdomains;
        options.attribution = desc.attribution;
        L.TileLayer.prototype.initialize.call(this, url, options);
    },

    getTileUrl: function ( coords ) {
        if( void 0 == coords.z ) {
            coords.z = this._map.getZoom();
        }

        return L.TileLayer.prototype.getTileUrl.call( this, coords );
    }
});

L.TileLayer.Graph.desc = {
    Normal: {
        Map: '/static/graph-tiles/zr-181017/tree-{x}-{y}-{z}.png'
    }
    , subdomains: '0123456789'
    , attribution: 'graph map'
};

