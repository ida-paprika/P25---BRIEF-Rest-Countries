
window.onload = () => {
    render();
}

async function render() {
    let response = await fetch('https://restcountries.com/v3.1/region/europe?fields=name,capital,flags,maps');
    if (!response.ok) {
        response = await fetch('./json/cards.json', {
            headers: {
            'Accept': 'application/json'
            }
        });
    }
    const COUNTRIES = await response.json();    
    let cards = '';

    COUNTRIES.forEach(country => {
        cards += `<div class="col"><div class="card h-100">
                    <a href="${country.maps.openStreetMaps}" title="Open Street Maps" target="_blank">
                      <img src="${country.flags.png}" class="card-img-top" alt="flag of ${country.name.official}">
                    </a>
                    <div class="card-body">
                      <h5 class="card-title">${country.name.official}</h5>
                      <p class="card-text">${country.capital}</p>
                    </div>
                  </div></div>`;
    });

    document.querySelector('#countriesCards').innerHTML = cards;
}
