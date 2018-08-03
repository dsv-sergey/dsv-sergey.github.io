"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});


UserInfo.getInfo(function (data) {
    var userLocation = [data[position][latitude], data[position][longitude]];

    // the "data" object contains the info
}, function (err) {
    // the "err" object contains useful information in case of an error
});

// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY
var GOOGLE_API_KEY = "AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY";
var getLatLng = function getLatLng(addr) {
    return fetch("https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=${GOOGLE_API_KEY}").then(function (req) {
        return req.json();
    }).then(function (data) {
        return data.results[0].geometry.location;
    });
};
/*  { lat: 53.890838, lng: 27.5372046 }  */

var getLatLon = function getLatLon() {
    var latLonCoord = function latLonCoord() {
        return fetch("http://ip-api.com/json").then(function (req) {
            return req.json();
        }).then(function (data) {
            return [data.lat, data.lon];
        });
    };
};

exports.default = { getLatLon: getLatLon };