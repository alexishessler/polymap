
// var initials = [48.866667, 2.333333];

var mymap = L.map('worldmap',
      {
       center: [48.866667, 2.333333],
       zoom: 8
      }
      );


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
 attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);

// L.marker([48.858370, 2.294481]).addTo(mymap);
//
// L.marker([48.858370, 2.294481]).addTo(mymap).bindPopup('La Tour Eiffel');

var idCoords = document.getElementById('coords');
var dataCoords = idCoords.dataset.coords;

var coordsArray = dataCoords.split(',');

var coordsArrayOrdered = [];

for (var i = 0; i < coordsArray.length; i+=2) {
  coordsArrayOrdered.push([coordsArray[i+1], coordsArray[i]])
}

var coord1 = coordsArrayOrdered[0][0];
var coord2 = coordsArrayOrdered[0][1];

// console.log(initials);

var polygon = L.polygon(coordsArrayOrdered).addTo(mymap)

mymap.setView([coord1, coord2], 11)
