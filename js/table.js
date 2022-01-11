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
    
    let countries = await response.json();    
    let rows = '';

    countries.forEach(country => {
        rows += `<tr>
                    <th scope="row">${country.name.official}</td>
                    <td class="text-end">${country.area.toLocaleString('en-US')}</td>
                    <td class="text-end">${country.population.toLocaleString('en-US')}</td>
                    <td>${country.capital}</td>
                </tr>`;
    });

    document.querySelector('#table-body').innerHTML = rows;
}