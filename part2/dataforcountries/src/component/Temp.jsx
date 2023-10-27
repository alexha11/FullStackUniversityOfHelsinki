import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Temp = (shownInfor) =>  {
    //console.log(shownInfor.shownInfor.name.common)
    
    const [cityData , setCityData] = useState([])
    const myApi = import.meta.env.VITE_SOME_KEY
    const changeVar = 273.15
    const cityName = shownInfor.shownInfor.capital[0]

    useEffect(() => {
      axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + cityName +'&appid=' + myApi)
      .then((res) => {
        //console.log(res.data)
        setCityData(res.data)
        
      })
    }, [])
    //make sure that cityData is not null 
    const temp = cityData.main ? cityData.main.temp : null
    const windSpeed = cityData.main ? cityData.wind.speed : null
    const iconId = cityData.main ? cityData.weather[0].icon : null
    const URL = `https://openweathermap.org/img/wn/${iconId}@2x.png`
    console.log(temp);



    return(
      <div>
        <h2>
          {shownInfor.shownInfor.name.common}
        </h2>
        <div>
          capital {shownInfor.shownInfor.capital[0]}
        </div>
        <div>
          area {shownInfor.shownInfor.area}
        </div>
        <h3>
          languages:
        </h3>
        <div>
          {Object.values(shownInfor.shownInfor.languages).map(value =><li>{value}</li>)}
        </div>
        <div>
        <img
         src = {shownInfor.shownInfor.flags.png} 
        >
        </img>
        </div>
          <h2>Weather in {cityName}</h2>
          <p>temperature {(temp - changeVar).toFixed(2)} Celcius</p>
          <img src={URL}></img>
          <p>wind {windSpeed} m/s</p>
        <div>
        </div>
       
       
      </div>
    )
}
export default Temp