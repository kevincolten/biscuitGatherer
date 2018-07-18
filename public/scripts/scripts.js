window.onload = function () {

  var mapOptions = {
    center: [17.342761, 78.552432],
    zoom: 10
  }



  var locations = L.layerGroup();


  L.marker([30.45672010958028, -97.78756856918335]).bindPopup("Jongers Barracks").addTo(locations),
    L.marker([30.38957219379311, -97.88230419158936]).bindPopup('The land of Laur').addTo(locations),
    L.marker([30.26593619644542, -97.75179862976074]).bindPopup('The enchanted Hall of Ideas').addTo(locations),
    L.marker([30.421602277410972, -97.84548282623291,]).bindPopup('The grinding wheel').addTo(locations);



  var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
  mbUrl1 = 'https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png';

  var grayscale = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
    streets = L.tileLayer(mbUrl, {id: 'mapbox.streets', attribution: mbAttr});
  waterColor = L.tileLayer(mbUrl1);


  var map = L.map('map', {
    // center: [39.73, -104.99],
    zoom: 16,
    layers: [grayscale, locations],
    mapOptions
  }).setView([30.27344, -97.7431], 11);


  var baseLayers = {
    "Grayscale": grayscale,
    "Streets": streets,
    "Water": waterColor,
  };

  var overlays = {
    "Locations": locations
  };

  // var videoElement = videoOverlay.getElement();
// var map = L.map('map').setView([37, -97.7431], 6).addLayer(osm);


    $('.icon').click(function (e) {
      iconPath = $(this).attr('src');
        theIcon = L.icon({
        iconUrl: iconPath,
        iconSize: [80, 80], // size of the icon
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor: [-3, -76],
        draggable: true// point from which the popup should open relative to the iconAnchor
      })
    });
  $('.icon').click(function (e) {
    console.log()

  });
  function onMapClick(e) {
    let userMarkers = [];
    console.log("youclicked")
    let marker = L.marker(e.latlng, {
      icon: theIcon,
      draggable: true

    }).addTo(map).bindPopup("<form id='popupForm' method='POST' action='/spotForm'> <div class='form-group'><label for='spotName'>Name</label><input type='text'class='form-control' id='spotName' placeholder='Name this spot!' name='spotName'></div><div class='form-group'><label for='location'>Turn on location coordinates</label><input type='text' class='location' id='location' name='location'> <div class='btn-group-toggle' data-toggle='buttons'><label class='btn btn-secondary active'><input class='cords' type='checkbox' checked autocomplete='on'> Checked</label></div><small id='' class='form-text text-muted'>This will generate latlng position of this marker. use this to share between map platforms</small></div><div class='form-group'><label for='comment'></label>Leave a comment about this spot<textarea class='form-control' rows='5'id='comment' placeholder='This spot....' name='comment'></textarea></div><div class='form-group'><label for='pics'>Add some pics</label><button class='form-control' id='pics' onclick='' name='pics'></button></div><div class='form-group'>User<label for='spotUser'></label><input type='text' class='form-control' id='spotUser' placeholder='Leave your userName here' name='spotUser'></div><button type='submit' class='btn btn-primary'>Add Spot Data</button></form>")
    // $('.cords').click(function(){alert('hi')}));
    userMarkers.push(e.latlng.toString());
    console.log(userMarkers, "hi");
    // $('.cords').click(function(){
      // if(!$('.cords').prop('checked'))
        // console.log('box checked')
      // document.getElementById('location').innerHTML += "hihihihiihih";
    // })
  }
  map.on('click', onMapClick);
  L.control.layers(baseLayers, overlays).addTo(map);
  map.on('popupopen',function(e){
    var latLng = e["popup"]._latlng;
    var form = document.querySelector('#popupForm');
    form['location'].value = latLng['lat'] + ', ' +latLng['lng'];
  });

  // console.log(e.latlng);




  // map.on('draw:created', function (e) {
  //   var type = e.layerType,
  //     layer = e.layer;
  //
  //   map.addLayer(layer);
  //
  //   if (type === 'marker') {
  //     layer.bindPopup('LatLng: ' + layer.getLatLng()).openPopup();
  //   }
  //
  // });






var videoUrls = [
  '/images/Red Bull Perspective - A Skateboard Film.mp4',
    'https://www.youtube.com/watch?v=EdA-YTaUKOs'
];

  var bounds = L.latLngBounds([[ 30.2, -98.7], [30.1, -97.6 ]]);

  var videoOverlay = L.videoOverlay( videoUrls, bounds, {
    autoplay: false,

    opacity: 0.8
  }).addTo(map);
  videoOverlay.on('load', function () {
    var MyPauseControl = L.Control.extend({
      onAdd: function() {
        var button = L.DomUtil.create('button');
        button.innerHTML = '⏸';
        L.DomEvent.on(button, 'click', function () {
          videoOverlay.getElement().pause();
        });
        return button;
      }
    });
    var MyPlayControl = L.Control.extend({
      onAdd: function() {
        var button = L.DomUtil.create('button');
        button.innerHTML = '⏵';
        L.DomEvent.on(button, 'click', function () {
          videoOverlay.getElement().play();
        });
        return button;
      }
    });

    var pauseControl = (new MyPauseControl()).addTo(map);
    var playControl = (new MyPlayControl()).addTo(map);
  });
}


