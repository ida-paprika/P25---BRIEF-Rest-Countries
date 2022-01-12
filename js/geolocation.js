
window.onload = () => {
    render();
}

    /*
    PROCESS :
        ONLOAD
          - afficher la France, puis le reste 
          (fetch all countries, récupération de capitalInfo pour ne plus faire appel à l'API Rest Country)
          - afficher maps centré sur Paris
        
        ONCHANGE
          - récup from json where name = id/value ?
            -> ou fetcher initialement "cca2"/"ccn3" pour utiliser comme value/id à comparer ?
          - option selected ?
          - RELOAD map : mapDisplay() with lat-lng from selected country

    CLBRDLDSMTT :
        - écoconception : appels d'API (rest country et/ou googleMaps)
        - async des étapes pour éviter le flood dans la console
        - France à attraper / sortir du forEach : how ?
        - c'est l'bordel ce code, va falloir refactorer è_é
    */

async function render() {
    let response = await fetch('https://restcountries.com/v3.1/region/europe?fields=name,capitalInfo');
    const COUNTRIES = await response.json();
    let france;
    let select = document.querySelector('#selectCountry');
    let options = '';

    if (!response.ok) {
        response = await fetch('./json/geolocation.json', {
            headers: {
            'Accept': 'application/json'
            }
        });
    }

// get France from json and set the first option with it
    COUNTRIES.forEach (country => {
        if (country.name.common == 'France') {
            france = country;
        }
    });

    options = `<option value="${france.name.common}">${france.name.official}</option>`;

    mapDisplay(france.capitalInfo.latlng[0], france.capitalInfo.latlng[1]);
    
// get all countries except from France to create the other options
    COUNTRIES.forEach(country => {
        if (country.name.common != 'France') {
            options += `<option value="${country.name.common}">${country.name.official}</option>`;
        }
    });

    document.querySelector('#selectCountry').innerHTML = options;
    
// change the map according to the selected country
    select.onchange = () => {
        console.log(select.value);
        COUNTRIES.forEach(country => {
            if (country.name.common == select.value) {
                mapDisplay(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1]);
            }
        });
    }
}

// wildly taken from the internet
function mapDisplay(lat, lng) {
    var mapProp= {
      center:new google.maps.LatLng(lat,lng),
      zoom:10,
    };
    var map = new google.maps.Map(document.getElementById("mapFrame"),mapProp);
}