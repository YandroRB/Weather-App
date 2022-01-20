//Variables
const data=[];
const weather={};
const fecha=new Date();

//Utilizacion del DOM Y BOM
window.onload= async function(){
   await getLocation(data);
   await getWeatherLocation(data.loc,weather);
   const {current,location}=weather
    const view={
       ubicacion:`${location.region}/${location.name}`,
       status:current.condition.icon.replace('64x64','128x128'),
       temperature:`Temperatura: ${current.temp_c}°C`,
       feel_like:`Temperatura ambiente: ${current.feelslike_c}°C`,
       wind:`Viento: ${current.wind_dir} ${current.wind_kph}Km/h`,
       humidicity:`Humedad: ${current.humidity}%`,
       precipitacion:`Precipitacion: ${current.precip_mm}mm`,
       dia:getDayName(fecha.getDay()),
       fecha:fecha.toLocaleDateString('es-ES',{year:"numeric",month:"long",day:"numeric"})
   }
   loaderData(view)
}
const ciudad=document.getElementById('ciudad');
const resultElement=document.getElementById('resultados');
ciudad.addEventListener('keyup',async (e)=>{
    e.preventDefault();
    const city=ciudad.value;
    let resultados={};
    if(city.length>2){
        await searchWeather(city,resultados);
        showResult(resultados,resultElement);
    }
})


function showResult(resultados,contenedor){

    if(Object.keys(resultados).length == 0){
        return;
    }
    contenedor.innerHTML='';

    Object.entries(resultados).forEach(([key,value])=>{
        const li=document.createElement('li');
        const a=document.createElement('a');
        a.textContent=`${value.name} / ${value.region} / ${value.country}`;
        a.href='#'
        li.id=value.url;
        li.addEventListener('click',mostrar)
        li.appendChild(a);
        contenedor.appendChild(li);

    })
}

async function mostrar(event){
    showLoader();
    const weatherData={}
    const address=event.target.parentNode.id
    await getWeatherLocation(address,weatherData)
    const {current,location}=weatherData
    const view={
        ubicacion:`${location.region}/${location.name}`,
        status:current.condition.icon.replace('64x64','128x128'),
        temperature:`Temperatura: ${current.temp_c}°C`,
        feel_like:`Temperatura ambiente: ${current.feelslike_c}°C`,
        wind:`Viento: ${current.wind_dir} ${current.wind_kph}Km/h`,
        humidicity:`Humedad: ${current.humidity}%`,
        precipitacion:`Precipitacion: ${current.precip_mm}mm`,
        dia:getDayName(fecha.getDay()),
        fecha:fecha.toLocaleDateString('es-ES',{year:"numeric",month:"long",day:"numeric"})
    }
    
    loaderData(view)
}

function loaderData(data){
    Object.keys(data).forEach((dat)=>{
        if(dat=='status'){
            document.getElementById(dat).src=data[dat];
        }
        document.getElementById(dat).textContent=data[dat];
    })
    clearLoader();

}
function showLoader(){
    document.getElementById('loader').style.display='inline-block';
    document.getElementById('card').style.display='none';
}
function clearLoader(){
    document.getElementById('loader').style.display='none';
    document.getElementById('card').style.display='inline-block';

}


//Funciones
//Funcion para buscar el clima de una ciudad
async function searchWeather(city,resultados){
    const API_KEY='5cf355d1310f419a91c52809210712';
    const url=`https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${city}`;
    await fetch(url)
    .then(res=>res.json())
    .then(data=>{
        for(let key in data){
            resultados[key]=data[key];
        }
    })
    .catch(err=>console.log(err))  
}

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
    const API_KEY='5cf355d1310f419a91c52809210712';
    await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${data}&aqi=yes`)
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
}/*
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
} */