var fs = require('fs')
var shapefile = require("shapefile");
var gj2svg = require('geojson-to-svg'); // factory 

global.geojson = {};
global.geojson['type'] = 'FeatureCollection';
global.geojson['features'] = [];

shapefile.open("QPF168hr_Day1-7_latest/97e2200.shp")
  .then(source => source.read()
    .then(function log(result) {
      if (result.done) return;

      var filename = '97e2200.geojson'
      geojson.features.push(result.value)
      fs.writeFile(filename, JSON.stringify(geojson), 'utf8');

      return source.read().then(log);
    }))
  .catch(error => console.error(error.stack));
