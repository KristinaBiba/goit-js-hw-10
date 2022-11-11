import { Notify } from '../node_modules/notiflix/build/notiflix-notify-aio';

export function fetchCountries(nameOfCountry) {
  return fetch(`
https://restcountries.com/v3.1/name/${nameOfCountry}?fields=name,capital,population,flags,languages`)
    .then(response => {
      if (!response.ok) {
        Notify.failure('Oops, there is no country with that name');
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => console.log(error));
}
