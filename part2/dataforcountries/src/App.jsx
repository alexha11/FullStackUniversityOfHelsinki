import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './index.css'
import Temp from './component/Temp'

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

const ShownInformation = ({shownInfor, handleShow}) => {
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
          <div>
            {infor.name.common}
            <button type='summit' onClick={() => {
              //console.log(infor.name.common)
              handleShow(infor.name.common)
            }}>show</button>
          </div>
        ))}
      </div>
    )
  }
  else if(shownInfor.length === 1) {
    //console.log(shownInfor[0].flag)
    // for(const lan in shownInfor[0].languages) {
    //   console.log(shownInfor[0].languages[lan])
    // }
    return(
      <Temp shownInfor={shownInfor[0]}/> 
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

  const handleShow = (name) => {
    setCountry(name)
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
      <ShownInformation shownInfor={shownInformation} handleShow={handleShow}/>
    </div>
  )
}

export default App
