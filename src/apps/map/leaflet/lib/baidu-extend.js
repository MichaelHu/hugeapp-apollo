import { projection, datum } from '../../lib/projzh';
import L from 'leaflet';

L.Projection.BaiduMercator = {
    project: function (latLng) {
        var a = projection.baiduMercator.forward([latLng.lng, latLng.lat]);
        var leafletPoint = new L.Point(a[0], a[1]);
        return leafletPoint;
    },

    unproject: function (bpoint) {
        var a = projection.baiduMercator.inverse([bpoint.x, bpoint.y]);
        var latLng = new L.LatLng(a[1], a[0]);
        return latLng;
    },

    bounds: (function () {
        // var MAX_X = 20037726.37;
        // var MIN_Y = -11708041.66;
        // var MAX_Y = 12474104.17;
        // var bounds = L.bounds(
        //     [-MAX_X, MIN_Y], //-180, -71.988531
        //     [MAX_X, MAX_Y]  //180, 74.000022
        // );
        var MAX = 33554432;
        var bounds = new L.Bounds(
                [-MAX, -MAX],
                [MAX, MAX]
        );
        return bounds;
    })()
};

// Coordinate Reference System - 坐标引用系统
L.CRS.baidu = L.extend({}, L.CRS, {
    code: 'baidu',
    projection: L.Projection.BaiduMercator,
    transformation: (function () {
        var z = -18 - 8;
        var scale = Math.pow(2, z);
        return new L.Transformation(scale, 0.5, -scale, 0.5);
    }())
});

L.TileLayer.Baidu = L.TileLayer.extend({
    options: {
        minZoom: 3,
        maxZoom: 19
    },

    initialize: function (type, options) {
        type = type || 'Normal.Map';
        options = options || {};

        var desc = L.TileLayer.Baidu.desc
            , parts = type.split('.')
            , mapName = parts[0]
            , mapType = parts[1]
            , url = desc[mapName][mapType]
            ;

        options.subdomains = desc.subdomains;
        options.attribution = L.TileLayer.Baidu.attribution;
        L.TileLayer.prototype.initialize.call(this, url, options);
    },

    getTileUrl: function (coords) {
        if(void 0 == coords.z){
            coords.z = this._map.getZoom();
        }
        var offset = Math.pow(2, coords.z - 1)
            , x = coords.x - offset
            , y = offset - coords.y - 1
            , baiduCoords = L.point(x, y)
            ;
        baiduCoords.z = coords.z;
        return L.TileLayer.prototype.getTileUrl.call(this, baiduCoords);
    }
});

L.TileLayer.Baidu.desc = {
    Normal: {
        Map: 'http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=pl'
    },
    Satelite: {
        Map: 'http://shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46',
        Road: 'http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=sl'
    },
    subdomains: '0123456789'
};

L.tileLayer.baidu = function( type, options ) {
    return new L.TileLayer.Baidu( type, options );
}

