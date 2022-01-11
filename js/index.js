
window.onload = () => {
    render();
}

async function render() {
    let response = await fetch('https://restcountries.com/v3.1/region/europe?fields=name');
    let countries = await response.json();
    let list = '';
    // countries.sort((a,b) => a.name.official > b.name.official);

    countries.forEach(country => {
        list += `<li>${country.name.official}</li>`;
    });
    
    document.querySelector('#countries-list').innerHTML = list;
}