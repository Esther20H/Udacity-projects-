/* Global Variables */
const generate = document.querySelector('#generate');
const zip = document.querySelector('#zip');
const feelings = document.querySelector('#feelings');
const feeling = document.querySelector('.feelings');
const temp = document.querySelector('#temp');
const message = document.querySelector('#error');
const city = document.querySelector('.city');
const country = document.querySelector('#country');
const icons = document.querySelector('.icons');
const deg = document.querySelector('#deg');
const description = document.querySelector('#description');
// Create a new date instance dynamically with JS
let d = new Date();
const date = d.toDateString;
const currentDate = document.querySelector('#currentDate');
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
const sampleKey = "https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}" ;
const baseURI = "https://api.openweathermap.org/data/2.5/weather?zip=";
const key = "&appid=957a02b4d09f082602451e1241dab983&units=imperial";

const getData = async(url) =>{
    try{
        const result = await fetch(url);
        const data = await result.json;
        if(data.cod != 200){
            //console.log(data);
            message.innerHTML = data;
            message.style.visibility = 'visible';
            return data;
        }
        else{
            return data;
        }
    }
    catch(err){
        console.log(err.message);
    }
}

const projectData = async(data) => {
    try{
        if(data.cod != 200){
            message.innerHTML = data;
            message.style.visibility = 'visible';
            return data;
        }
        else{
            const info = {
                date: newDate,
                feelings: feelings.value,
                temp: Math.round(data.main.temp),
                city: data.name,
                country: data.sys.country,
                description: data.weather[0].description,
                icons: data.weather[0].icon
            };
            return info;
        }
    }
    catch(err){
        console.error(err.message);
    }
};

const postData = async(url='', data={}) => {
    try{
        const response = await fetch(url, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        return response;
    }
    catch(err){
        console.error(err.message);
    }
};

const retrieveData = async(url) =>{
    const data =await fetch(url);
    try{
        const result = await data.json();
        //console.log(response);
        return result;
    }
    catch(err){
        console.error(err);
    }
};

const updateUI = async (data) => {
    if(date.message){
        document.querySelector('#entryHolder').style.display = "block";
        document.querySelector('#error').style.display = "none";
        document.querySelector('.fa-map-marker-alt').style.visibility = "visible";
        document.querySelector('.fa-thermometer-three-quarters').style.visibility = "visible";
        deg.innerHTML = "°";
        city.innerHTML = response.city;
        country.innerHTML = response.country;
        currentDate.innerHTML = response.date;
        icons.innerHTML = response.icons;
        description.innerHTML = response.description;
        temp.innerHTML =`${response.temp} ${deg} C`;
        feeling.innerHTML = response.feelings ? response.feelings: "what are feeling?";
    }
    else{
        document.querySelector('#error').style.display = "block";
        document.querySelector('#entryHolder').style.display = "none";
        //document.querySelector('#error').innerHTML = response.data;
        message.innerHTML= data.message;
    }
}

generate.addEventListener('click', (event) =>{
    event.preventDefault();
    const madeURI = `${baseURI}${zip.value}${key},${country.value}${key}`;
    getData(madeURI).then((data) => {
        projectData(data)
            .then((info) =>{
            postData("/add", info).then((data) =>{
                retrieveData('/all').then((data) => {
                    updateUI(data);
                });
            });
        });
    });
});
