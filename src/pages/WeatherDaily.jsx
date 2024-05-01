import React, { useState, useEffect } from "react";
import styles from "./WeatherDaily.module.css";

const WeatherDaily = () => {
  const [weatherData, setWeatherData] = useState({});
  const [inputLocation, setInputLocation] = useState("");
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const key = "7e9a4ad422514285b5585651243004";
  const APP_ID = "8224S7QjRI4KSscL7UyUZ5vbypvEt4IkcMfkgl6r51U";
  const url = "http://api.weatherapi.com/v1/";
  const imgUrl = "https://api.unsplash.com/";

  let imgSrc = 'https://images.unsplash.com/photo-1547628641-ec2098bb5812?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

  const fetchData = async (e) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${url}current.json?key=${key}&q=${inputLocation}&aqi=no`
      );
      if (response.status != 200) {
        console.log("Something went wrong!");
      } else {
        const data = await response.json();
        console.log(data);
        setWeatherData(data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
    try {
      const response = await fetch(
        `${imgUrl}search/photos?query=${inputLocation}&client_id=${APP_ID}`
      );
      const data = await response.json();
      setPhotos(data?.results[0]?.urls.raw);
      console.log(data?.results[1]?.urls.raw);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [inputLocation]);

  const submitForm = (e) => {
    if (inputLocation.length === 0) {
      setErrorMsg("Location must be provided.");
    }
    fetchData();
    setInputLocation("");
    setWeatherData({});
  };

  return (
    <main className={styles["main-container"]}>
      <div className={styles.form}>
        {errorMsg && !inputLocation && <p>{errorMsg}</p>}
        <input
          type="text"
          id="location"
          value={inputLocation}
          onChange={(e) => setInputLocation(e.target.value)}
          placeholder="Enter location"
        />
      </div>
      {inputLocation && (
        <div className={styles.info}>
          <section className={styles["top-container"]}>
            <header className={styles.header}>
              <h1>{weatherData?.current?.temp_c}°C</h1>
              <h4>
                {weatherData?.location?.name}/{weatherData?.location?.country}
              </h4>
            </header>
            <div className={styles["description-cont"]}>
              <img
                src={weatherData?.current?.condition?.icon}
                alt="weather icon"
              />
              <p>{weatherData?.current?.condition?.text}</p>
            </div>
          </section>
          <img
            src={photos}
            alt="photo of the location"
            className={styles["local-image"]}
          />
          <section className={styles["condition-cont"]}>
            <div className={styles.condition}>
              <p>{weatherData?.current?.humidity}</p>
              <p>humidity</p>
            </div>
            <div className={styles.condition}>
              <p>{weatherData?.current?.wind_mph}</p>
              <p>wind</p>
            </div>
            <div className={styles.condition}>
              <p>{weatherData?.current?.precip_in}</p>
              <p>precipitation</p>
            </div>
            <div className={styles.condition}>
              <p>{weatherData?.current?.pressure_mb}</p>
              <p>pressure</p>
            </div>
          </section>
        </div>
      )}
    </main>
  );
};

export default WeatherDaily;
