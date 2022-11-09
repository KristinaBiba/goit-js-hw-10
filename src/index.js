import './css/styles.css';
import { Notify } from '../node_modules/notiflix/build/notiflix-notify-aio';

import { fetchCountries } from './fetchCountries.js';

const inputEl = document.querySelector('#search-box');
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  let currentRequest = '';
  currentRequest += e.target.value;
  if ((currentRequest.split('').length() = '')) {
    console.log('пусто');
    return;
  } else {
    fetchCountries(currentRequest.trim());
  }
}
