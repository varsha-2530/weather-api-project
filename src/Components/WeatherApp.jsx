import React, {useEffect, useState } from "react";
import './WeatherApp.css'
import search_icon from '../assets/search.png';
import temp_icon from '../assets/temp-sun.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind-img.png'


const WeatherApp = () => {

    const APP_ID = import.meta.env.VITE_API_ID;
    const [weatherData, setWeatherData] = useState('null')
    const [city, setCity] = useState("Delhi");
    const [search, setSearch] = useState('')

    useEffect(()=>{
         const fetchWeather = async () => {
            try{
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APP_ID}&units=metric`);
                const data = await response.json();
                console.log(data);
                setWeatherData({
                    humidity: data.main.humidity,
                    windspeed: data.wind.speed,
                    temperature: Math.floor( data.main.temp),
                    location: data.name
                })
                
            }catch(error){
                console.error("Error fetching weather data:", error);
              
            }
         }
         fetchWeather();
    },[city, APP_ID])

    const update = (event)=>{
       setSearch(event.target.value)
       
    }


    const handleSearch  = ()=> {
        if(search != ''){
            setCity(search)
        }
    }

    

   
    return (
        <div className="weather">
            <div className="search-bar">
                <input type="text" placeholder="search" onChange={update} />
                <img src={search_icon} alt="" onClick={handleSearch}/>
               
            </div>
            <img src={temp_icon} alt="" className="sun-icon" />
            <p className="temp">{weatherData.temperature}°C</p>
            <p className="place">{weatherData.location}</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidity_icon} className="humidity_icon" alt="" />
                    <div>
                        <span>Humidity : </span>
                        <p>{weatherData.humidity}</p>

                    </div>
                </div>
                <div className="col">
                    <img src={wind_icon} className="wind-icon" alt="" />
                    <div>
                    <span>Wind Speed :  </span>
                        <p>3.6km/h</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp;