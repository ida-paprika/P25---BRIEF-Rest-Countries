
window.onload = () => {
    render();
}

    /*
    CLBRDLDSMTT :
        - chargement initial extra-slow
        - écoconception : appels d'API (rest country et/ou googleMaps)
        - async des étapes pour éviter le flood dans la console
        - c'est l'bordel ce code, va falloir refactorer è_é
    */

async function render() {
    let response = await fetch('https://restcountries.com/v3.1/name/france?fields=name,capitalInfo,cca2');
    const FRANCE = await response.json();
    let select = document.querySelector('#selectCountry');
    let options = `<option value="${FRANCE[0].cca2}">${FRANCE[0].name.official}</option>`;
    let option;

// reuse of "response" to fetch the full list of countries
    response = await fetch('https://restcountries.com/v3.1/region/europe?fields=name,cca2');
    const COUNTRIES = await response.json();
    mapDisplay(FRANCE[0].capitalInfo.latlng[0], FRANCE[0].capitalInfo.latlng[1]);
    
// get all countries except from France to create the other options
    COUNTRIES.forEach(country => {
        if (country.cca2 != FRANCE[0].cca2) {
            options += `<option value="${country.cca2}">${country.name.official}</option>`;
        }
    });

    document.querySelector('#selectCountry').innerHTML = options;
    
// change the map according to the selected country
    select.onchange = async () => {
        response = await fetch(`https://restcountries.com/v3.1/alpha/${select.value}?fields=capitalInfo`);
        option = await response.json();
        mapDisplay(option.capitalInfo.latlng[0], option.capitalInfo.latlng[1]);
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