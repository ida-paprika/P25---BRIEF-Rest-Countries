
window.onload = () => {
    render();
}


async function render() {

    let response = await fetch('https://restcountries.com/v3.1/region/europe?fields=name,cca2');
    const COUNTRIES = await response.json();
    let select = document.querySelector('#selectCountry');
    let options = '';
    let option;
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
    select.value = 'FR';

// also need to change select value
    if(URLPARAMS.has('lat') && URLPARAMS.has('lng')) {
        mapFrame(URLPARAMS.get('lat'), URLPARAMS.get('lng'));
    } else {
        response = await fetch(`https://restcountries.com/v3.1/alpha/fr?fields=capitalInfo`);
        const FRANCE = await response.json();
        mapFrame(FRANCE.capitalInfo.latlng[0], FRANCE.capitalInfo.latlng[1]);
    }
    

// change the map according to the selected country
    select.onchange = async () => {
        response = await fetch(`https://restcountries.com/v3.1/alpha/${select.value}?fields=capitalInfo`);
        option = await response.json();
        mapFrame(option.capitalInfo.latlng[0], option.capitalInfo.latlng[1]);
    }
}
