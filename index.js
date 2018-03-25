var fs = require('fs')
var mapshaper = require('mapshaper')

var i = '-i 97e2200.shp '
var proj = '-proj +proj=aea +lat_1=29.5 +lat_2=45.5 +lat_0=37.5 +lon_0=-96 +x_0=0 +y_0=0 +datum=NAD83 +units=m +no_defs '
var svgstyle = '-svg-style fill=#303545 opacity=0.25 '
var qpf1 = "-svg-style where=QPF>1 fill=red "
var o = '-o format=svg '

var command = i + proj + svgstyle + qpf1 + o

var inputs = {}
inputs['97e2200.shp'] = '_data/QPF168hr_Day1-7_latest/97e2200.shp'

mapshaper.applyCommands(command, inputs, function done (err, out){
  if (err) {
    console.log(err);
  }
  else {
    fs.writeFile('_out/97e2200.svg', out['97e2200.svg'], 'utf8')
  }
})
