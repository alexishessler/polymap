var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!coords) {
    var coords = null;
  }
  res.render('index', {
    coords
  });
});

// /* GET home page. */
// router.post('/search', function(req, res, next) {
//   console.log(req.body.city)
//   request('http://polygons.openstreetmap.fr/get_geojson.py?id=7444', function(err, request, body){
//     body = JSON.parse(body);
//     var coords = body.geometries[0].coordinates[0][0]
//     console.log(coords.length)
//     var coordsArray = [];
//     for (var i = 0; i < coords.length; i++) {
//       coordsArray.push(coords[i]);
//     }
//     console.log(coordsArray);
//     res.render('index', { coords: coordsArray });
//   })
// });


router.post('/search', function(req, res, next) {
  var options = {
    url: 'https://nominatim.openstreetmap.org/search.php?city='+req.body.city+'&format=json',
    headers: {
      Referer: 'http://localhost:3000/'
    }
  }
  request(options, function(err, reque, body1) {

    let osmId;
    
    if(body1.length != 2){
      body1 = JSON.parse(body1);
      osmId = body1[0].osm_id;

      request('http://polygons.openstreetmap.fr/get_geojson.py?id='+osmId, function(error, respy, body2) {
        if(body2 != 'None\n'){
          body2 = JSON.parse(body2);
            var coords = body2.geometries[0].coordinates[0][0]
            var coordsArray = [];
            for (var i = 0; i < coords.length; i++) {
              coordsArray.push(coords[i]);
            }
            res.render('index', {coords: coordsArray })
        } else {
          res.render('index', {coords: null })
        }
      })
    } else {
      res.render('index', {coords: null })
    }
  })
});

// router.get("/map", function(req, res, next){
//   request('http://polygons.openstreetmap.fr/get_geojson.py?id='+osmId, function(error, req, body2) {
//     body2 = JSON.parse(body2);
//     var coords = body2.geometries[0].coordinates[0][0]
//     console.log(coords.length)
//     var coordsArray = [];
//     for (var i = 0; i < coords.length; i++) {
//       coordsArray.push(coords[i]);
//     }
//     console.log(coordsArray);
//   res.render('index', {coords: coordsArray })
// })
// })

module.exports = router;
