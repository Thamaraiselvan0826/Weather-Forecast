import './Weather.css'
import clear from '../assets/images/clear-sky.png'
import wind from '../assets/images/wind.png'
import deizzle from '../assets/images/drizzle.png'
import heavy from '../assets/images/heavy-rain.png'
import humidity from '../assets/images/humidity.png'
import snow from '../assets/images/snow.png'
import { useState } from 'react'


const WeatherData = ({ icon, temp, city, country, lat, log, Humidity, winds }) => {


    return (
        <>
            <div className="weather-data">
                <div className='weather'>
                    <div className="img">
                        <img src={icon} alt="image" className='clear' />
                    </div>
                    <div className="temp">
                        {temp} ℃
                    </div>
                    <div className="city">
                        {city}
                    </div>
                    <div className="country">
                        {country}
                    </div>
                </div>
                <div className="cord">
                    <div>
                        <span className="lat">Latitude</span>
                        <span>{lat}</span>
                    </div>
                    <div>
                        <span className="log">Longitude</span>
                        <span>{log}</span>
                    </div>
                </div>
                <div className="winds">
                    <div className="imges">
                        <img src={humidity} alt="wind" className='wind' />
                        <div className='humidity-percent'>{Humidity}%</div>
                        <div className='humidity-text'>Humidity</div>
                    </div>
                    <div className="imges">
                        <img src={wind} alt="wind" className='wind' />
                        <div className='wind-percent'>{winds}km /h</div>
                        <div className='wind-text'>Speed</div>
                    </div>
                </div>

            </div>
        </>
    )
};
const Weather = () => {

    let api_key = "appid=68961dae32e8adcee3ea01baba0bf3be"

    const [text, setText] = useState("Salem")
    const [icon, setIcon] = useState(clear)
    const [temp, setTemp] = useState(0)
    const [city, setCity] = useState("salem")
    const [country, setCountry] = useState("")
    const [lat, setLat] = useState(0)
    const [log, setLog] = useState(0)
    const [Humidity, setHumidity] = useState(0)
    const [winds, setWind] = useState(0)
    const [citynotfound, setCitynotfound] = useState(false)
    const [loading, setLoading] = useState(false)

    
    const search = async () => {
        setLoading(true)
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&${api_key}`
        try {
            let res = await fetch(url);
            let data = await res.json();
            if (data.cod === "404") {
                console.log("city not found")
                setCitynotfound(true)
                setLoading(false)
                return;
            }
            setHumidity(data.main.humidity)
            setWind(data.wind.speed)
            setTemp(Math.floor(data.main.temp))
            setCity(data.name)
            setCountry(data.sys.country)
            setLat(data.coord.lat)
            setLog(data.coord.lon)
        } catch (error) {
            console.log(error)
        }
        finally {
            loading(false)
        }
    }
    const cityChange = (e) => {
        setText(e.target.value)
    }

    const keyDown = (e) => {
        if (e.key === "Enter") {
            search()
        }
    }
    return (
        <>
            <div className="container">
                <div className="app">
                    <input type="search" name="search" id="search" className='search-icon' placeholder='Enter City' onChange={cityChange} value={text} onKeyDown={keyDown} />
                    <ion-icon name="search-outline" onClick={() => search()}></ion-icon>
                </div>
                <WeatherData icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} Humidity={Humidity} winds={winds} />
                <span className='copy-rights'>Design By Lotus</span>
            </div>

        </>
    )
}

export default Weather
