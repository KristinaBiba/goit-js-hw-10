import './css/styles.css';
import { Notify } from 'notiflix';
// '../node_modules/notiflix/build/notiflix-notify-aio'
import { fetchCountries } from './fetchCountries.js';

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  clearWrapper();
  let currentRequest = '';
  currentRequest += e.target.value;
  if (currentRequest.trim().split('').length === 0) {
    return;
  } else {
    fetchCountries(currentRequest.trim()).then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length > 1 && data.length <= 10) {
        fillCountryList(data);
      } else {
        fillCountryInfo(data);
      }
    });
  }
}

function clearWrapper() {
  countryInfoEl.innerHTML = '';
  countryListEl.innerHTML = '';
}
function fillCountryList(counties) {
  countryListEl.innerHTML = counties
    .map(({ flags, name }) => {
      return `<li>
          <p><img src=${flags.svg} alt = "${name.official} flag" width=32px /> ${name.official}</p>
        </li>`;
    })
    .join('');
}
function fillCountryInfo(country) {
  countryInfoEl.innerHTML = country
    .map(({ flags, name, capital, population, languages }) => {
      return `
          <h2><img src=${flags.svg} alt = "${
        name.official
      } flag" width=50px /> <b>${name.official}</b></h2>
          <p><b>Capital: </b> ${capital}<p>
          <p><b>Population: </b> ${population}<p>
          <p><b>Languages: </b> ${Object.values(languages).join(', ')}<p>`;
    })
    .join('');
}
