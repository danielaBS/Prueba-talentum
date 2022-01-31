//define variables to randomize

var moment = require('moment'); // require

moment.locale('es');

let weather = {}

let base = {
  1: "Estaciones",
  2: "Tropical",
  3: "Templado"
}

let cities =  {
	1: "Santa Fé de Bogotá",
	2: "Santiago de Cali",
  3: "Neiva",
  4: "Pereira",
  5: "Roldanillo",
  6: "Manizales",
	7: "Medellín"
}

let time = {
  1: "Soleado",
  2: "Nublado",
  3: "Vientos suaves",
  4: "Vientos fuertes",
  5: "Lluvia",    
  6: "Vientos huracanados"
}

let averageTemperature = [];

// Method to randomize weather data
const randomize = (parameter, min, max, randomNmbr) => {
  var random;
  if(min !==null && max !==null && parameter === null){
    random = Math.random() * (max - min) + min;
  } else {
    random = Math.random() * (Object.keys(parameter).length -1) + 1;    
  }
    
  return Math.round(random)
}

//Method to create JSON to be shown in Front 
const createWeather = (data) => 
  new Promise((resolve, reject) => {
    if (!data) {
      return setTimeout(
        () => reject(new Error('No se pudo consultar el clima')),
        250
      );
    }

    var rndTime = randomize(time, null, null);
    var rndBase = randomize(base, null, null);
    var rndMin = randomize (null, 0,10);
    var rndMax = randomize (null, 20,30);
    var rndTemp = randomize(null, rndMin,rndMax);    
    var rndCity;

    if(data.data.city !==null && data.data.city !==undefined) {
      rndCity = cities[data.data.city]
    } else {
      rndCity = cities[randomize(cities, null, null)]
    }

    setTimeout(() => {        
        weather = {
            "weather": [
                {
                    "id": Math.round(Math.random() *100),
                    "main": time[rndTime],
                    "precip": '3.1mm',
                    "uv": '10'
                }
            ],
            "base": base[rndBase],
            "main": {
                "temp": rndTemp,
                "temp_min": rndMin,
                "temp_max": rndMax,
                "humidity": Math.round(Math.random() * (50 -30)+ 30)
            },
            "wind": {
                "speed": 1.5,
                "air-q": "Ecxelente"
            },
            "sys": {
                "type": 1,
                "id": 8590,
                "country": "CO"
            },
            "name": rndCity,
            "cod": 200
        }
        setTimeout(() => resolve(weather), 250);
      });
});

const createAverage = (range) => 
  new Promise((resolve, reject) => {  
    averageTemperature=[];
    for (var i=0; i <range; i++){
      var rndTemperature = randomize(null, 10, 35);
      var date = moment().subtract(i, 'days').format('MMM DD');
      averageTemperature.push({date: date, temperature: rndTemperature})
    }
    averageTemperature.reverse();
  });

const getWeather = (data) =>
  new Promise((resolve, reject) => {
    if(!data) {
      () => reject(new Error('No se pudo consultar el clima'))
    }
    createWeather(data);
    setTimeout(() => resolve(weather), 250);    
  });

const getByTimeRange = (range) =>
  new Promise((resolve, reject) => {
    if(!range) {
      () => reject(new Error('No se pudo consultar el clima'))
    }
    createAverage(range.data.range);
    setTimeout(() => resolve(averageTemperature), 250);    
  });
module.exports = {getWeather, getByTimeRange}
