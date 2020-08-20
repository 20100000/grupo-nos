import config from '../../../../config/config';
import fetch from 'node-fetch';

const _getTempTip = async (city) => {
    const URL = `https://api.hgbrasil.com/weather?key=${config.weather.KEY}&city_name=${city}`;

    const response = await fetch(URL);
    const res = await response.json();
    const temp = res.results.temp;
    const condition = res.results.condition_code;

    let tip = "";
    if(temp <= 18){
        tip = "Tome um chocolate quente";
    }else if(temp > 18 && temp <30 && condition == "32"){
        tip = "Bora joga futebol ar livre";
    }else if(temp > 18 && temp <30  && ( condition == "45" ||  condition == "40" || condition == "35" ||
        condition == "10" || condition == "6" || condition == "5" || condition == "9" || condition == "11"||
        condition == "12"|| condition == "42")){
        tip = "Vamos ver um filme";
    }else if(temp >= 30 && condition == "32"){
        tip = "Vamos a praia";
    }else if(temp >= 30 && ( condition == "45" ||  condition == "40" || condition == "35" ||
        condition == "10" || condition == "6" || condition == "5" || condition == "9" || condition == "11"||
        condition == "12"|| condition == "42")){
        tip = "Vamos tomar um sorvete";
    } else {
        tip = "Não sei";
    }
    const dataTemp = {
        temp: temp,
        description: res.results.description,
        tip: tip
    }

    return dataTemp;
}

module.exports.getTempTip = _getTempTip;
