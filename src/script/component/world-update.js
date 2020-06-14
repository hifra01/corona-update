import moment from "moment";
import Chart from 'chart.js';
class WorldUpdate extends HTMLElement{

    constructor(){
        super();
        this.shadowDOM = this.attachShadow({mode:"open"});
    }

    set world(world){
        this._world = world;
        this.render()
    }

    set chart(chart){
        this._chart = chart;
        this.renderChart();
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
                width: 25%
            }
            .total {
                background-color: gray;
                color: white;
            }
            .active {
                background-color: deepskyblue;
                color: white;
            }
            .deaths {
                background-color: red;
                color: white;
            }
            .recovered {
                background-color: green;
                color: white;
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

            }
        </style>
        <div class="card">
            <h1 class="card-title">World Update</h1>
            <em class="last-update">Last updated on ${moment(this._world.updated).format('Do MMMM YYYY, H:mm:ss')}</em>
            <div class="content">
                <div class="box total">
                    <span>Total Cases</span>
                    <h2>${this._world.cases.toLocaleString()}</h2>
                </div>
                <div class="box active">
                    <span>Active Cases</span>
                    <h2>${this._world.active.toLocaleString()}</h2>
                </div>
                <div class="box deaths">
                    <span>Total deaths</span>
                    <h2>${this._world.deaths.toLocaleString()}</h2>
                </div>
                <div class="box recovered">
                    <span>Total recovered</span>
                    <h2>${this._world.recovered.toLocaleString()}</h2>
                </div>
            </div>
            <canvas id="worldChart"></canvas>
        </div>
        
        `;
    }
    renderChart(){
        const ctx = this.shadowDOM.getElementById('worldChart');
        const casesLabel = Object.keys(this._chart.cases);
        const casesData = Object.values(this._chart.cases);
        const deathsData = Object.values(this._chart.deaths);
        const recoveredData = Object.values(this._chart.recovered);
        const worldChart = new Chart(ctx, {
            type: 'line',
                data: {
                labels: casesLabel,
                    datasets: [{
                    label: 'Total Cases',
                    data: casesData,
                    borderColor: 'gray',
                    backgroundColor:'gray',
                    borderWidth: 5,
                    fill: false
                },
                {
                    label: 'Total Deaths',
                    data: deathsData,
                    borderColor: 'red',
                    backgroundColor:'red',
                    borderWidth: 5,
                    fill: false
                },
                {
                    label: 'Total Recovered',
                    data: recoveredData,
                    borderColor: 'green',
                    backgroundColor:'green',
                    borderWidth: 5,
                    fill: false
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

}
customElements.define("world-update", WorldUpdate);