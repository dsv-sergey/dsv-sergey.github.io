"use strict";

var _requestCoordinates = require("./services/requestCoordinates");

ymaps.ready(init);
var myMap, myPlacemark;

function init() {
  myMap = new ymaps.Map("map", {
    center: (0, _requestCoordinates.getLatLon)(),
    zoom: 7,
    controls: ['fullscreenControl']
  });
  myMap.controls.add(new ymaps.control.Button({
    data: {
      content: "",
      image: "../img/favorite.png"
    },
    options: {
      maxWidth: 16,
      selectOnClick: false
    }
  }));
  // myPlacemark = new ymaps.Placemark([55.76, 37.64], {
  //     hintContent: 'Москва!',
  //     balloonContent: 'Столица России'
  // });

  // myMap.geoObjects.add(myPlacemark);
}