import './sass/main.scss';

import { error } from '@pnotify/core';
import "../node_modules/@pnotify/core/dist/PNotify.css";
import "../node_modules/@pnotify/core/dist/BrightTheme.css";

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
        return error({
            text: "Please type text",
            delay: 1500
        });
    }

    fetchCountries(sQuery).then(createMarkup).catch(onError);
}

function createMarkup(list) {
    const numOfCountries = list.length;

    if (numOfCountries >= 2 && numOfCountries <= 10) {
        return markup(list, countryList);
    }

    if (numOfCountries === 1) {
        return markup(list, countryInfo);
    }

    if (numOfCountries > 10) {
        return error({
            text: "Too many matches..",
            delay: 1500
        });
    }
} 

function markup(list, mark) {
    const fetchedCountries = list.map(mark).join('');
    refs.countryContainer.insertAdjacentHTML('beforeend', fetchedCountries);
}

function clearMarkup() {
    refs.countryContainer.innerHTML = "";
}

function onError() {
    return error({
        text: "Country not found",
        delay: 1500
    });
}