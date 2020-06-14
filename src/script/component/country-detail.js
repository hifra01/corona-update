import moment from "moment";

class CountryDetail extends HTMLElement{
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({mode:"open"});
    }

    set country(country){
        this._country = country;
        this.render();
    }

    render(){
        this.shadowDOM.innerHTML = `
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            @keyframes slideIn{
                0%{
                    transform: translateX(-100%);
                    opacity: 0;
                }
                100%{
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            .card {
                animation: 0.7s ease-out 0s 1 slideIn;
                display: block;
                background-color: white;
                border-radius: 5px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                margin:20px 0;
                padding:30px;
            }
            .card-title{
                display: inline-block;
                margin:10px;
            }
            .last-updated{
                display: inline-block;
                position: relative;
            }
            .card .content{
                display: flex;
            }
            .box {
                text-align: right;
                display: inline-block;
                border:1px solid #bbb;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                margin: 10px;
                padding: 10px;
            }
            .total {
                background-color: gray;
                color: white;
                width: 25%;
            }
            .active {
                background-color: deepskyblue;
                color: white;
                width: 25%;
            }
            .deaths {
                background-color: red;
                color: white;
                width: 25%;
            }
            .recovered {
                background-color: green;
                color: white;
                width: 25%;
            }
            :host {
                display: block;
                width: 100%;
            }
            .box span {
                font-size: 18pt;
            }
            .box h2 {
                font-size: 36pt;
            }
            h1 img {
                height: 1em;
                margin-right: 10px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                border: 1px solid #ddd;
                
            }
            @media screen and (max-width: 1025px) {
                .card .content{
                    display: inline-block;
                }
                .box{
                    width:46%;
                }
            }
            @media screen and (max-width: 700px) {
                .card .content{
                    display: block;
                }
                .box{
                    width:100%;
                }
                .card-title{
                    display: block;
                }
        </style>
        <div class="card">
            <h1 class="card-title"><img src="${this._country.countryInfo.flag}"></img>${this._country.country}</h1>
            <em class="last-update">Last updated on ${moment(this._country.updated).format('Do MMMM YYYY, H:mm:ss')}</em>
            <div class="content">
                <div class="box total">
                    <span>Total Cases</span>
                    <h2>${this._country.cases.toLocaleString()}</h2>
                </div>
                <div class="box active">
                    <span>Active Cases</span>
                    <h2>${this._country.active.toLocaleString()}</h2>
                </div>
                <div class="box deaths">
                    <span>Total deaths</span>
                    <h2>${this._country.deaths.toLocaleString()}</h2>
                </div>
                <div class="box recovered">
                    <span>Total recovered</span>
                    <h2>${this._country.recovered.toLocaleString()}</h2>
                </div>
            </div>
        </div>
        `;
    }


}
customElements.define("country-detail", CountryDetail)