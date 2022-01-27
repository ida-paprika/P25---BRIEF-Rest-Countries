
window.onload = () => {
    render();
}


async function render() {

    let response = await fetch('https://restcountries.com/v3.1/region/europe?fields=name,cca2');
    const COUNTRIES = await response.json();
    let select = document.querySelector('#selectCountry');
    let options = '';
    let option;
    let cca2;
    const QUERYSTRING = window.location.search;
    const URLPARAMS = new URLSearchParams(QUERYSTRING);
    let mapFrame = (lat, lng) => {
        document.querySelector('#mapFrame').innerHTML = 
        `<iframe src="https://www.google.com/maps/embed/v1/view?key=AIzaSyCtI7aeTjJOVaB9Zc-r9m3mFHZnGcJoBZ4
        &center=${lat},${lng}&zoom=10&language=en" 
        allowfullscreen></iframe>`;
    };
    
// get all countries to create the select options
    COUNTRIES.forEach(country => {
        options += `<option value="${country.cca2}">${country.name.official}</option>`;
    });
    select.innerHTML = options;

// define cca2's value depending on link followed or not
    URLPARAMS.has('cca2') ? cca2 = URLPARAMS.get('cca2') : cca2 = 'FR';
// display select's default option and map
    select.value = cca2;
    response = await fetch(`https://restcountries.com/v3.1/alpha/${cca2}?fields=capitalInfo`);
    const COUNTRY = await response.json();
    mapFrame(COUNTRY.capitalInfo.latlng[0], COUNTRY.capitalInfo.latlng[1]);
    

// change the map according to the selected country
    select.onchange = async () => {
        response = await fetch(`https://restcountries.com/v3.1/alpha/${select.value}?fields=capitalInfo`);
        option = await response.json();
        mapFrame(option.capitalInfo.latlng[0], option.capitalInfo.latlng[1]);
    }
}
