export function fetchCountries(nameOfCountry) {
  console.log(nameOfCountry);
  return fetch(`
https://restcountries.com/v3.1/name/${nameOfCountry}?fields=name.official,capital,population,flags,languages`)
    .then(resolve => resolve.json())
    .then(data => console.log(data));
}
// ?fields=name.official,capital,population,flags.svg,languages
