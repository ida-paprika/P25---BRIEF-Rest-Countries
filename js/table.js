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
                    <td class="text-end">${new Intl.NumberFormat('en-US').format(country.area)}</td>
                    <td class="text-end">${new Intl.NumberFormat('en-US').format(country.population)}</td>
                    <td>${country.capital}</td>
                </tr>`;
    });

    document.querySelector('#table-body').innerHTML = rows;
}