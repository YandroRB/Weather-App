//Variables
const data={};
const weather={};

//Utilizacion del DOM Y BOM
window.onload= async function(){
   await getLocation(data);
   await getWeatherLocation(data,weather);
   console.log(weather)
}
//Funciones
//Obtiene la localizacion del usuario
async function getLocation(data){
    await fetch("https://ipinfo.io/json?token=64a2ce40924112")
    .then((response) => response.json())
    .then((jsonResponse) => {
        data.city=jsonResponse.city;
        data.loc=jsonResponse.loc;
        data.region=jsonResponse.region;
        data.country=jsonResponse.country;
    })
}
//Obtiene el clima de la zona
async function getWeatherLocation(data,weather){
    const latLon=data.loc.split(',');
    const API_KEY='10569e70d6aa20fb2a1f7701c81b4865';
    await fetch(`https://api.openweathermap.org/data/2.5/weather?lang=es&units=metric&lat=${latLon[0]}&lon=${latLon[1]}&appid=${API_KEY}`)
    .then((response)=>response.json())
    .then((jsonResponse)=>{
        for(let key in jsonResponse){
            weather[key]=jsonResponse[key]
        }
    })
}