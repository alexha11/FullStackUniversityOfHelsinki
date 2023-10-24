import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './index.css'

const SearchCountry = ({country, handleChangeSearchCountry}) => {
  return(
    <form>
      <div>
        find countries   
        <input value={country} onChange={handleChangeSearchCountry} />
      </div>
    </form>
  )
}

const ShownInformation = ({shownInfor}) => {
  if(shownInfor.length > 10) {
    return(
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  else if (shownInfor.length <= 10 && shownInfor.length > 1) {
    return(
      <div>
        {shownInfor.map((infor) => (
          <div>{infor.name.common}</div>
        ))}
      </div>
    )
  }
  else if(shownInfor.length === 1) {
    console.log(shownInfor[0].flag)
    // for(const lan in shownInfor[0].languages) {
    //   console.log(shownInfor[0].languages[lan])
    // }
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
         alt = {shownInfor[0].flags.alt}
        >
        </img>
        </div>
      </div>
    )
  }
  else {
    return(
      null
    )
  }
  
}

const App = () => {
  const [country, setCountry] = useState(null);
  const [shownInformation, setShownInformation] = useState([])

  const handleChangeSearchCountry = (event) => {
    setCountry(event.target.value)
  }

  useEffect(() => {
    console.log('effect run, country is now', country)  
    if(country) {
      axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
      const countriesData = response.data.filter((countryData) =>
        countryData.name.common.toLowerCase().includes(country.toLowerCase())
      );
      setShownInformation(countriesData)
      // countriesData.map(country => {
      //   console.log(country.name.common)
      // })
  })
    }
    else {
      setShownInformation([])
    }
  }, [country])

  return(
    <div>
      <SearchCountry country={country} handleChangeSearchCountry={handleChangeSearchCountry}/>
      <ShownInformation shownInfor={shownInformation}/>
    </div>
  )
}

export default App
