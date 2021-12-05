//Variables
const data={};
const weather={};
const fecha=new Date();

//Utilizacion del DOM Y BOM
window.onload= async function(){
   await getLocation(data);
   await getWeatherLocation(data,weather);
   console.log(weather)
   const view={
       ubicacion:weather.name,
       status:`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`,
       temperature:weather.main.temp,
       feel_like:weather.main.feels_like,
       tiempo:getTiempo(fecha.getHours()),
       dia:getDayName(fecha.getDay()),
       fecha:fecha.toLocaleDateString('es-ES',{year:"numeric",month:"long",day:"numeric"})
   }
   loaderData(view)
   clearLoader();
}

function loaderData(data){
    Object.keys(data).forEach((dat)=>{
        if(dat=='status'){
            document.getElementById(dat).src=data[dat]
        }
        document.getElementById(dat).textContent=data[dat]
    })

}
function clearLoader(){
    document.getElementById('loader').style.display='none';
    document.getElementById('card').style.display='block';

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
function getDayName(day){
    const names=['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
    return names[day]
}
function getTiempo(hora){
    if(hora>6&&hora<12){
        return 'Buenos días';
    }
    else if(hora>11 && hora<19){
        return 'Buenas tardes';
    }
    else if(hora>18 &&hora<=23 || hora == 0){
        return 'Buenas noches';
    }
    else{
        return 'Buenas madrugadas';
    }
}