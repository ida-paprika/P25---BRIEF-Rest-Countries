
window.onload = () => {
    render();
}

async function render() {

    let response = await fetch('https://restcountries.com/v3.1/region/europe?fields=name,cca2');
    const COUNTRIES = await response.json();
    let map = '';
    let select = document.querySelector('#selectCountry');
    let options = '';
    let option;
    
// get all countries to create the select options
// must use dispatchEvent instead of if-else to add 'selected'
    COUNTRIES.forEach(country => {
        if (country.cca2 == 'FR') {
            options += `<option value="${country.cca2}" selected>${country.name.official}</option>`;
        } else {
            options += `<option value="${country.cca2}">${country.name.official}</option>`;
        }
    });
    select.innerHTML = options;

// reuse of 'response' to fetch paris's geographic coordinates and display the map
// doesn't feels right to fetch directly without using the countries list .json
    response = await fetch(`https://restcountries.com/v3.1/alpha/fr?fields=capitalInfo`);
    const FRANCE = await response.json();
    map = `<iframe src="https://www.google.com/maps/embed/v1/view?key=AIzaSyCtI7aeTjJOVaB9Zc-r9m3mFHZnGcJoBZ4
            &center=${FRANCE.capitalInfo.latlng[0]},${FRANCE.capitalInfo.latlng[1]}&zoom=10" 
            allowfullscreen></iframe>`;
    document.querySelector('#mapFrame').innerHTML = map;

// change the map according to the selected country
    select.onchange = async () => {
        response = await fetch(`https://restcountries.com/v3.1/alpha/${select.value}?fields=capitalInfo`);
        option = await response.json();
        map = `<iframe src="https://www.google.com/maps/embed/v1/view?key=AIzaSyCtI7aeTjJOVaB9Zc-r9m3mFHZnGcJoBZ4
                &center=${option.capitalInfo.latlng[0]},${option.capitalInfo.latlng[1]}&zoom=10" 
                allowfullscreen></iframe>`;
        document.querySelector('#mapFrame').innerHTML = map;
    }
}
