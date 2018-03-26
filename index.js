var mapshaper = require('mapshaper')

var commandSlugs = []

commandSlugs.push('-i _data/QPF168hr_Day1-7_latest/97e2200.shp')
commandSlugs.push('-proj +proj=aea +lat_1=29.5 +lat_2=45.5 +lat_0=37.5 +lon_0=-96 +x_0=0 +y_0=0 +datum=NAD83 +units=m +no_defs')
commandSlugs.push('-svg-style where=QPF>4 fill=#21313D')
commandSlugs.push('-svg-style where=QPF<4 fill=#304D5D')
commandSlugs.push('-svg-style where=QPF<3.5 fill=#3C6C7E')
commandSlugs.push('-svg-style where=QPF<2.5 fill=#468C9E')
commandSlugs.push('-svg-style where=QPF<1.5 fill=#4EAFBE')
commandSlugs.push('-svg-style where=QPF<.75 fill=#55D3DC')
commandSlugs.push('-svg-style where=QPF<.25 fill=#5EF8F9')
commandSlugs.push('-svg-style where=QPF<.1 fill=white')
commandSlugs.push('-o _out/ format=svg')

var command = commandSlugs.join(' ')

mapshaper.runCommands(command, function(err){
  if (err) {
    console.log(err);
  }
  else {
    console.log("Success");
  }
})


'#21313D,#304D5D,#3C6C7E,#468C9E,#4EAFBE,#55D3DC,#5EF8F9'
