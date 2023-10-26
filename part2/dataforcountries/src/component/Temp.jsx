import React, { useState, useEffect } from 'react';
import axios from 'axios'

const temp = () =>  {
    const myApi = '7dbf885a4aaa697da1ef065934e59600'
    const changeVar = 273.15
    const cityName = shownInfor[0].capital[0]
    //const URL = `https://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png`
    useEffect(() => {
      axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + cityName +'&appid=' + myApi)
      .then((res) => {
        //console.log(res.data)
        setCityData(res.data)
        
      })
    })
    console.log(cityData.main.temp)
    return(
      <div>
        <h2>
          {shownInfor[0].name.common}
        </h2>
        <div>
          capital {shownInfor[0].capital[0]}
        </div>
        <div>
          area {shownInfor[0].area}
        </div>
        <h3>
          languages:
        </h3>
        <div>
          {Object.values(shownInfor[0].languages).map(value =><li>{value}</li>)}
        </div>
        <div>
        <img
         src = {shownInfor[0].flags.png} 
        >
        </img>
        </div>
        <h2>Weather in {cityData.name}</h2>
        <div>
        </div>
       
       
      </div>
    )
}
export default Temp