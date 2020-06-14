class PageJumbotron extends HTMLElement{
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({mode:"open"});
    }

    connectedCallback(){
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
            :host {
                display: flex;
                width:100%;
                text-align: center;
            }
            .jumbotron {
                margin: 20px auto;
            }
            h1 {
                font-size: 3em;
                color: #4a4a4a;
                font-weight: 700pt;
            }
            span {
                color: #4a4a4a;
            }
        </style>
        <div class="jumbotron">
            <h1>Coronavirus Update</h1>
            <span><em>Get your latest update on COVID-19</em></span>
        </div>
        
        `;
    }
}
customElements.define("page-jumbotron", PageJumbotron);