var geoLayer, geoList,
    map = new L.Map('map', {
    zoomControl:false,
    center: [23.5000,121.0000],
    zoom: 7,
    maxBounds: [[-90,-180],[90,180]],

layers: [   
L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
attribution: '&copy;<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
subdomains: 'abcd',
//minZoom: 2,
//maxZoom: 3,
        }),
//L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', {
//minZoom: 4,
//maxZoom: 20,
//attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//}),
]           
});

map.addControl(L.control.zoom({position:'topright'}));

$.getJSON('today_marksV.geojson', function(json) {
    geoLayer = L.geoJson(json, {
    style: function(feature) {
      var mag = feature.properties.VI;
      if (mag >= 400) { return { color: "green" }; }
      else if (mag >= 300) { return { color: "yellow" }; } 
      else if (mag >= 200) { return { color: "orange" }; } 
      else { return { color: "red" };}},
    onEachFeature: function(feature,layer) {
	var popupText = "<b>VI=</b> " + feature.properties.VI + "m2/s @" + feature.properties.date;
            layer.bindPopup(popupText, {closeButton: false, offset: L.point(0, -20)});
            layer.on('mouseover', function() { layer.openPopup(); });
            layer.on('mouseout', function() { layer.closePopup(); });      
 	},
    pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
  	radius: Math.round(Math.sqrt(feature.properties.VI)+6)/3,             
    opacity: 1,
    style: function(feature) {
      var mag = feature.properties.VI;
      if (mag >= 400) { return { color: "red" }; }
      else if (mag >= 300) { return { color: "orange" }; } 
      else if (mag >= 200) { return { color: "yellow" }; } 
      else { return { color: "green" };}},
  	});
      },
}).addTo(map);
    });
