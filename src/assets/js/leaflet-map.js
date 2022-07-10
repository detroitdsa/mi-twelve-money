async function addGeojsonMap(){
    var map = L.map('map').setView([42.3370,-83.2733], 9.4);
    const response = await fetch("/assets/geojson/District12.geojson");
    const data = await response.json();
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
    }).addTo(map);

    L.geoJSON(data,{
        style:function (feature){
            return {color: "green"};
        }
    }).bindPopup(function (layer){
        return "District "+ layer.feature.properties.DISTRICTN;
    }).addTo(map);
    
    return;
    }

    addGeojsonMap();