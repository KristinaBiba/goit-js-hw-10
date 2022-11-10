import './css/styles.css';
import { Notify } from '../node_modules/notiflix/build/notiflix-notify-aio';

import { fetchCountries } from './fetchCountries.js';

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  let currentRequest = '';
  currentRequest += e.target.value;
  // if ((currentRequest.split('').length() = '')) {
  //   console.log('пусто');
  //   return;
  // } else {
  const final = fetchCountries(currentRequest.trim()).then(data => {
    if (data.length > 10) {
      countryInfoEl.innerHTML = '';
      countryListEl.innerHTML = '';
      Notify.info('Too many matches found. Please enter a more specific name.');
    } else if ((data.length > 1) & (data.length <= 10)) {
      const counryList = data
        .map(country => {
          countryInfoEl.innerHTML = '';
          return `<li>
          <p><img src=${country.flags.svg} alt = "${country.name.official} flag" width=50px /> <b>${country.name.official}</b></p>
        </li>`;
        })
        .join('');
      countryListEl.innerHTML = counryList;
    } else {
      countryListEl.innerHTML = '';
      const counryInfo = data
        .map(country => {
          return `
          <p><img src=${country.flags.svg} alt = "${
            country.name.official
          } flag" width=50px /> <b>${country.name.official}</b></p>
          <p><b>Capital: <b> ${country.capital}<p>
          <p><b>Population: <b> ${country.population}<p>
          <p><b>Languages: <b> ${Object.values(country.languages)}<p>`;
        })
        .join('');
      countryInfoEl.innerHTML = counryInfo;
    }
  });
}
// console.log(data);
