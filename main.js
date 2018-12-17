//Daten abfragen & alle anzeigen (default)
var data = [];
fetch('https://overpass-api.de/api/interpreter?data=%2F*%0AThis%20has%20been%20generated%20by%20the%20overpass-turbo%20wizard.%0AThe%20original%20search%20was%3A%0A%E2%80%9Crestaurant%20in%20switzerland%E2%80%9D%0A*%2F%0A%5Bout%3Ajson%5D%5Btimeout%3A25%5D%3B%0A%2F%2F%20fetch%20area%20%E2%80%9Cswitzerland%E2%80%9D%20to%20search%20in%0Aarea%283600051701%29-%3E.searchArea%3B%0A%2F%2F%20gather%20results%0A%28%0A%20%20%2F%2F%20query%20part%20for%3A%20%E2%80%9Crestaurant%E2%80%9D%0A%20%20node%5B%22amenity%22%3D%22restaurant%22%5D%28area.searchArea%29%3B%0A%29%3B%0A%2F%2F%20print%20results%0Aout%20body%3B%0A%3E%3B%0Aout%20skel%20qt%3B')
.then(function(response) {
    return response.json();
})
.then(function(myJson) {
    data = myJson.elements;
    showAll();
});

//Leaflet Karte anzeigen
var mymap = L.map('mapid', { zoomControl:false }).setView([46.805, 8.20],8);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZ2lhbmJydW5uZXIiLCJhIjoiY2puazFqbXV3MGFmNTNrbWgyNG5zcDFyZSJ9.87l6WgQ_tzccQJif8HcnVA', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZ2lhbmJydW5uZXIiLCJhIjoiY2puazFqbXV3MGFmNTNrbWgyNG5zcDFyZSJ9.87l6WgQ_tzccQJif8HcnVA'
}).addTo(mymap);

//Marker erzeugen und anzeigen
var markers;
function createMarkers(dataInput){
    markers = L.markerClusterGroup();
    dataInput.forEach(element => {
        //Marker für jedes Restaurant erzeugen
        var lat = element.lat;
        var lon = element.lon;
        if(lat!=undefined&&lon!=undefined){
            var marker = L.marker([lat, lon]);
            //Popup für Marker erzuegen
            var popupString;
            if(element.tags.name!=undefined){
                popupString = "Name des Restaurants: "+ element.tags.name;
            }else{
                popupString = "Restaurant ohne Namen";
            }
            if(element.tags.website!=undefined){
                popupString += "<br>Website: "+ "<a href="+ element.tags.website + ">"+ element.tags.website + "</a>";
            }
            if(element.tags.phone!=undefined||element.tags['contact:phone']!=undefined){
                if(element.tags.phone!=undefined){
                    popupString += "<br>Tel: "+ element.tags.phone;
                }else{
                    popupString += "<br>Tel: "+ element.tags['contact:phone'];
                }
            }
            marker.bindPopup(popupString);
            markers.addLayer(marker);
        }
    });
    mymap.addLayer(markers);
}

// Statistik im Footer
function createStatistics(statisticsData){
    var statisticsString = "Anzahl angezeigte Restaurants: " + statisticsData.length;
    document.getElementById("statistics").innerHTML = statisticsString;
}