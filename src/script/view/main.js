import '../component/world-update.js';
import '../component/search-country.js';
import '../component/country-update.js';
import DataSource from '../data/data-source.js';

const main = () => {
    const worldUpdateElement = document.querySelector("world-update");
    const searchElement = document.querySelector('search-country');
    const countryUpdateElement = document.querySelector('country-update');

    /* functions for world-update */
    const onDocumentLoad = () => {
        DataSource.worldUpdate()
            .then(renderWorldUpdate)

    };

    const renderWorldUpdate = results => {
        worldUpdateElement.world = results;
        DataSource.getWorldHistory()
            .then(renderWorldChart)
    };

    const renderWorldChart = results => {
        worldUpdateElement.chart = results;
    };

    /*functions for country-update*/

    const onButtonSearchClicked = () => {
        DataSource.searchCountry(searchElement.value)
            .then(renderResult)
            .catch(fallbackResult)
    };

    const renderResult = results => {
        countryUpdateElement.countries = results;
    };

    const fallbackResult = message => {
        countryUpdateElement.renderError(message);
    };


    searchElement.clickEvent = onButtonSearchClicked;
    document.onload = onDocumentLoad();
}

export default main;