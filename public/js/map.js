mapboxgl.accessToken = 'pk.eyJ1Ijoia2V2YWx0aGFrYXJhcjEwMTAiLCJhIjoiY2wwbmZzcXo0MDdoZjNpcGt1b21peHZ3OSJ9.c7mEEqQk0ZFtwV0_xiKa2A';

var map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [70.064, 22.469], // starting position [lng, lat]
    zoom: 12, // starting zoom
    //attributionControl: true

});
map.addControl(new mapboxgl.GeolocateControl({
  positionOptions: {
      enableHighAccuracy: true
  },
  trackUserLocation: true,
  showUserHeading: true
}));

const marker = new mapboxgl.Marker({
  color: "blue",
  draggable: true
  }).setLngLat([71.064, 22.469])
  .addTo(map);



//Fetch coordinate from dbs

async function getStores(){
    const res = await fetch('/api/v1/stores');
    const data = await res.json();
    
    const stores = data.data.map((store) => {
        return {
                type : 'Feature',
                geometry : {
                    type : 'Point',
                    coordinates : [store.location.coordinates[0] ,store.location.coordinates[1]]
                },
                properties : {
                    storeId : store.storeId,
                    icon : 'shop'
                }
        }
    });
    loadMap(stores);
}


function loadMap(stores){
    map.on('load', function() {
        map.addLayer({
          id: 'points',
          type: 'symbol',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features : stores,
            }
          },
          layout: {
            'icon-image': '{icon}-15',
            'icon-size': 1.5,
            'text-field': '{storeId}',
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-offset': [0, 0.9],
            'text-anchor': 'top'
          }
        });
      });
}

getStores();



const mark = document.getElementById('mark');
mark.addEventListener('click' , () =>{
  const lngLat = marker.getLngLat();
  localStorage.setItem('lng' , lngLat.lng)
  localStorage.setItem('lat' , lngLat.lat)
})