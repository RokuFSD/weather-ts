import { WeatherApi, WeatherDaily, WeatherHourly, WeatherCurrent } from '../interfaces';

const WEATHERKEY = '8710bae7bc7ce06a37610be17e7edbd7';
const apiServices = (() => {
  let weatherData: WeatherApi;
  let weatherDays: WeatherDaily[];
  let weatherHours: WeatherHourly[];
  let weatherCurrent: WeatherCurrent;
  let weatherCity: string;

  function setData({ current, daily, hourly }: WeatherApi) {
    weatherCurrent = current;
    weatherDays = daily.slice(1);
    weatherHours = hourly.slice(1, 25);
  }

  function getDaysData(): WeatherDaily[] {
    return weatherDays;
  }

  function getHoursData(): WeatherHourly[] {
    return weatherHours;
  }

  function getCurrentData(): WeatherCurrent {
    return weatherCurrent;
  }

  function getCity(): string {
    return weatherCity;
  }

  async function fetchCoord(cityName: string, stateCode?: string, countryCode?: string) {
    let result = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode ? stateCode : ''},${countryCode ? countryCode : ''}&appid=${WEATHERKEY}`);
    let data = await result.json();
    if (data && data.length > 0) {
      weatherCity = data[0].name;
      return data;
    } else {
      throw new Error('Bad Input');
    }
  }

  async function fetchWeatherInfo(inputValue: string, units: string = 'imperial') {
    try {
      let [{ lon, lat }] = await fetchCoord(inputValue);
      let weatherResult = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=minutely,alerts&appid=${WEATHERKEY}`);
      weatherData = await weatherResult.json();
      setData(weatherData);
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  return {
    fetchWeatherInfo,
    getDaysData,
    getHoursData,
    getCurrentData,
    getCity,
  };
})();
export default apiServices;