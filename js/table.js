window.onload = () => {
    render();
}

async function render() {
    let response = await fetch('https://restcountries.com/v3.1/region/europe?fields=name,capital,area,population');

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
                    <td>${country.capital}</td>
                </tr>`;
    });

    document.querySelector('#table-body').innerHTML = rows;
}