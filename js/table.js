window.onload = () => {
    render();
}

async function render() {
    let response = await fetch('https://restcountries.com/v3.1/region/europe?fields=name,capital,area,population,capitalInfo,cca2');

    if (!response.ok) {
        response = await fetch('./json/table.json', {
            headers: {
            'Accept': 'application/json'
            }
        });
    }
    
    const COUNTRIES = await response.json();    
    let rows = '';
    const FORMATER = new Intl.NumberFormat('en-US');

    COUNTRIES.forEach(country => {
        rows += `<tr>
                    <th scope="row">${country.name.official}</td>
                    <td class="text-end">${FORMATER.format(country.area)}</td>
                    <td class="text-end">${FORMATER.format(country.population)}</td>
                    <td><a href="geolocation.html?cca2=${country.cca2}&lat=${country.capitalInfo.latlng[0]}&lng=${country.capitalInfo.latlng[1]}">${country.capital[country.capital.length-1]}</a></td>
                </tr>`;
    });

    document.querySelector('#countriesTable').innerHTML = rows;
}