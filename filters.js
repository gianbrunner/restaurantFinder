
//Alle anzeigen
function showAll(){
    if(markers!=undefined){
        mymap.removeLayer(markers);
    }
    createMarkers(data);
    createStatistics(data);
}

//Filter anwenden
function filter(){
    var dataToFilter = data;
    var filteredData = [];
    //Ortschaftsfilter anwenden
    if($('#location').val()!=""){
        filteredData = locationFilter(dataToFilter);
    }else{
        filteredData = dataToFilter;
    }
    //Rollstuhl-Filter anwenden
    if($('#wheelchair').prop('checked')){
        filteredData = wheelchairFilter(filteredData);
    }
    //Takeaway-Filter anwenden
    if($('#takeaway').prop('checked')){
        filteredData = takeawayFilter(filteredData);
    }
    //Vegan-Filter anwenden
    if($('#vegan').prop('checked')){
        filteredData = veganFilter(filteredData);
    }
    //Angezeigte Daten löschen und neue Daten darstellen
    mymap.removeLayer(markers);
    createMarkers(filteredData);
    createStatistics(filteredData);
}

//Ortschaftsfilter
function locationFilter(dataInput){
    var filteredData = [];
    dataInput.forEach(element => {
        let cityTag = element.tags['addr:city'];
        if(cityTag!=undefined){
            cityTag = cityTag.toLowerCase();
        }
        let cityInput = $("#location").val().toLowerCase();
        if(cityTag == cityInput){
            filteredData.push(element);
        }
    });
    return filteredData;
}
// Rollstuhl-Filter
function wheelchairFilter(dataInput){
    var filteredData = [];
    dataInput.forEach(element => {
        if(element.tags.wheelchair == "yes"){
            filteredData.push(element);
        }
    });
    return filteredData;
}
// Takeaway-Filter
function takeawayFilter(dataInput){
    var filteredData = [];
    dataInput.forEach(element => {
        if(element.tags.takeaway == "yes"){
            filteredData.push(element);
        }
    });
    return filteredData;
}
// Vegan-Filter
function veganFilter(dataInput){
    var filteredData = [];
    dataInput.forEach(element => {
        if(element.tags['diet:vegan'] == "yes"){
            filteredData.push(element);
        }
    });
    return filteredData;
}
