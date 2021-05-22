export default function fetchCountries(searchQuery) {
    const url = 'https://restcountries.eu/rest/v2/name/';
    return fetch(url + searchQuery)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            return error;
        });
        
}