import React, { useState, useEffect } from "react";


const WeatherDaily = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [inputData, setInputData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const key = '7e9a4ad422514285b5585651243004'
  const url = 'http://api.weatherapi.com/v1/'

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${url}current.json?key=${key}&q=${inputData}&aqi=no`);
      if (response != 200) {
        setErrorMsg('Something went wrong!')
      } else {
        const data = await response.json();
        console.log(data)
        setWeatherData(data);
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData();
  }, [inputData])


  const submitForm = (e) => {
    e.preventDefault();
    fetchData()
    setInputData('')
    console.log(weatherData)
  }

  console.log(weatherData)

  return (
    <div>
      <form onSubmit={submitForm}>
        <label htmlFor="location">location</label>
        <input type="text" id="location" value={inputData} onChange={(e) => setInputData(e.target.value)} />
        <button type="submit" >Search</button>
      </form>
      <pre>{JSON.stringify(weatherData)}</pre>
    </div>);
};

export default WeatherDaily;
