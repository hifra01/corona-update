import "./country-detail.js";
class CountryUpdate extends HTMLElement{
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({mode:"open"});
    }

    set countries(countries){
        this._countries = countries;
        this.render();
    }

    renderError(message){
        this.shadowDOM.innerHTML=`
        <style>
            .placeholder {
                font-weight: lighter;
                color: rgba(0,0,0,0.5);
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }
        </style>
        `;
        this.shadowDOM.innerHTML += `<h2 class="placeholder">${message}</h2>`;
    }

    render(){
        this.shadowDOM.innerHTML="";
        if(Array.isArray(this._countries)){
            this._countries.forEach(country => {
                const countryDetailElement = document.createElement("country-detail");
                countryDetailElement.country = country;
                this.shadowDOM.appendChild(countryDetailElement);
                countryDetailElement.scrollIntoView();
            })
        } else {
            const countryDetailElement = document.createElement("country-detail");
            countryDetailElement.country = this._countries;
            this.shadowDOM.appendChild(countryDetailElement);
            countryDetailElement.scrollIntoView();
        }


        /*this._countries.forEach(country => {

        })*/
    }
}
customElements.define("country-update", CountryUpdate)