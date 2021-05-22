import './sass/main.scss';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';
import 'material-design-icons/iconfont/material-icons.css';
import { defaults } from '@pnotify/core';
defaults.styling = 'material';
defaults.icons = 'material';
import { alert, notice, info, success, error } from '@pnotify/core';


import countryInfo from './templates/country-info.hbs';
import countryList from './templates/country-list.hbs';

import fetchCountries from './fetchCountries';

import _ from 'lodash';
    
const refs = {
    searchForm: document.querySelector('.js-search-form'),
    countryContainer: document.querySelector('.js-country-container'),
}

refs.searchForm.addEventListener('input', _.debounce(onSearchType, 500));

function onSearchType(e) {
    clearMarkup();
    e.preventDefault();
    const sQuery = e.target.value;

    if (sQuery.trim() === '') {
        return;
    }

    fetchCountries(sQuery).then(createMarkup);
}

function createMarkup(list) {
    const numOfCountries = list.length;

    if (numOfCountries > 2 && numOfCountries < 10) {
        return markup(list, countryList);
    }

    if (numOfCountries === 1) {
        return markup(list, countryInfo);
    }

    return console.log("foooo");
} 

function markup(list, mark) {
    const fetchedCountries = list.map(mark).join('');
    refs.countryContainer.insertAdjacentHTML('beforeend', fetchedCountries);
}

function clearMarkup() {
    refs.countryContainer.innerHTML = "";
}