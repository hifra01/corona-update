class DataSource{
    static worldUpdate(){
        return fetch(`https://corona.lmao.ninja/v2/all`)
            .then(response =>{
                return response.json();
            })
            .then(responseJson => {
                return Promise.resolve(responseJson);
            })
    }

    static searchCountry(keyword){
        const getKeyword = keyword.toString();
        const restrictedPattern = /[^a-zA-Z,]/g;
        const searchKeyword = getKeyword.replace(restrictedPattern, '');
        if(searchKeyword !== ""){
            return fetch(`https://corona.lmao.ninja/v2/countries/${searchKeyword}`)
                .then(response =>{
                    return response.json();
                })
                .then(responseJson =>{
                    if(responseJson.message){
                        return Promise.reject(`${responseJson.message}`);
                    }
                    else{
                        return Promise.resolve(responseJson);
                    }
                })
        } else {
            return Promise.reject(`Please insert a country name!`);
        }

    }
    static getWorldHistory(){
        return fetch(`https://corona.lmao.ninja/v2/historical/all?lastdays=15`)
            .then(response => {
                return response.json()
            })
            .then(responseJson => {
                return Promise.resolve(responseJson)
            })
    }
}

export default DataSource;