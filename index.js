const mapshaper = require('mapshaper')
const fs = require('fs');
const tar = require('tar-fs')
const jsftp = require("jsftp");

checkLocalFiles()

// we need to know what tars have been downloaded so that when we look at the
// filelist returned in getFilenames() we only download it if we need to
function checkLocalFiles() {
  fs.readdir('_data/', function(err,results){
    if (!err) {
      // loop through the filenames and find any instance of tar
      var tars = []
      results.forEach(function(e) {
        if (e.indexOf('tar') > 0) {
          tars.push(e)
        }
      })

      // separate out the date portion of the filename and sort to get the newest
      var tardates = []
      tars.forEach(function(e) {
        tardates.push(e.substr(4,10))
      })
      tardates.sort()

      // get the last date, except if it's the only date
      if (tardates.length > 1) {
        var lastTarDate = tardates.pop()
      }
      else {
        lastTarDate = tardates[0]
      }

      // rebuild the filename
      var latestTar = '97e_' + lastTarDate + '.tar'

      getFilenames(latestTar)
    }
    else {
      console.log(err);
    }
  })
}

function getFilenames (latestTar) {

  const ftp = new jsftp({
    host: 'ftp.wpc.ncep.noaa.gov',
    user: 'anonymous',
    password: 'user@example.com'
  });

    ftp.ls('/shapefiles/qpf/7day/', (err,res) => {
      if (err) {
        console.log(err);
      }
      else {
        var last = res.slice(-2)
        if (last[0].name == latestTar) {
          shpFilename(latestTar)
        }
        else {
          fetchQPF(last[0].name)
        }
      }
    })
}

function fetchQPF(qpftar) {
  var qpfpath = `_data/${qpftar}`
  if (!fs.existsSync(qpfpath)) {
    ftp.get(`/shapefiles/qpf/7day/${qpftar}`, qpfpath, err => {
      if (!err) {
        let unpacker = fs.createReadStream(qpfpath).pipe(tar.extract('_data/'))
        let had_error = false

        unpacker.on('error',function(err){
          had_error = true
          console.log(err)
        })

        unpacker.on('finish',function(){
          if(!had_error){
            shpFilename(qpftar)
          }
        })
      }
      else {
        console.log(err);
      }
    });
  }
  else {
    shpFilename(qpftar)
  }
}

function shpFilename (qpftar){
  var qpfshp = '_data/' + qpftar.substr(0,3) + qpftar.substr(10,4) + '.shp'
  processMap(qpfshp)
}


function processMap(qpfshp) {
  var commandSlugs = []

  commandSlugs.push(`-i ${qpfshp}`)
  commandSlugs.push('-proj +proj=aea +lat_1=29.5 +lat_2=45.5 +lat_0=37.5 +lon_0=-96 +x_0=0 +y_0=0 +datum=NAD83 +units=m +no_defs')
  // commandSlugs.push('-colorizer name=precip')
  // commandSlugs.push('colors=#21313D,#304D5D,#3C6C7E,#468C9E,#4EAFBE,#55D3DC,#5EF8F9,white')
  // commandSlugs.push('breaks=.1,.25,.75,1.5,2.5,3.5,4')
  // commandSlugs.push('-svg-style fill-color=precip(QPF)')
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

  mapshaper.runCommands(command, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Success");
    }
  })

}
