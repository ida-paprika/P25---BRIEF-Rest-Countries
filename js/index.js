
window.onload = () => {
    render();
}

async function render() {
    let response = await fetch('https://restcountries.com/v3.1/region/europe?fields=name');
    if (!response.ok) {
        response = await fetch('./json/index.json', {
            headers: {
            'Accept': 'application/json'
            }
        });
    }
    const COUNTRIES = await response.json();    
    let list = '';
    // COUNTRIES.sort((a,b) => a.name.official > b.name.official);

    COUNTRIES.forEach(country => {
        list += `<li>${country.name.official}</li>`;
    });

    document.querySelector('#countriesList').innerHTML = list;
}
