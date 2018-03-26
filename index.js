var mapshaper = require('mapshaper')

var commandSlugs = []

commandSlugs.push('-i _data/QPF168hr_Day1-7_latest/97e2200.shp')
commandSlugs.push('-proj +proj=aea +lat_1=29.5 +lat_2=45.5 +lat_0=37.5 +lon_0=-96 +x_0=0 +y_0=0 +datum=NAD83 +units=m +no_defs')
// commandSlugs.push('-colorizer name=precip')
// commandSlugs.push('colors=#21313D,#304D5D,#3C6C7E,#468C9E,#4EAFBE,#55D3DC,#5EF8F9,white')
// commandSlugs.push('breaks=.1,.25,.75,1.5,2.5,3.5,4')
// commandSlugs.push('-svg-style name=precip')
commandSlugs.push('-svg-style where=QPF<20 fill=#20313E')
commandSlugs.push('-svg-style where=QPF<10 fill=#2D4958')
commandSlugs.push('-svg-style where=QPF<5 fill=#386374')
commandSlugs.push('-svg-style where=QPF<3 fill=#417E90')
commandSlugs.push('-svg-style where=QPF<2 fill=#499BAC')
commandSlugs.push('-svg-style where=QPF<1.5 fill=#50B9C7')
commandSlugs.push('-svg-style where=QPF<1 fill=#57D8E0')
commandSlugs.push('-svg-style where=QPF<.25 fill=#5EF8F9')
commandSlugs.push('-svg-style where=QPF<.1 fill=#CEFDFD') //prev color @ 90 lighness vs 67
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


'#20313E,#2D4958,#386374,#417E90,#499BAC,#50B9C7,#57D8E0,#5EF8F9'
