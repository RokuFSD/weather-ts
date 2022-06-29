import { WeatherController, WeatherModel } from 'interfaces';
import apiServices from '../api/weatherapi';
import { formatUnixHour, formatUnixDay, formatUnixCurrent } from '../utils';

class WeatherAppController implements WeatherController {
  model: WeatherModel;

  constructor(model: WeatherModel) {
    this.model = model;
  }

  handleEvent(evt: Event) {
    evt.stopPropagation();
    evt.preventDefault();
    if (evt.type === 'submit') {
      let form = evt.target as HTMLFormElement;
      this.onFormSubmit(form);
    }
    if (evt.type === 'click') {
      this.changeUnits();
      this.apiCall();
    }
  }

  onFormSubmit(form: HTMLFormElement) {
    let formData = new FormData(form);
    let { city } = Object.fromEntries(formData);
    this.model.inputValue = String(city);
    this.apiCall();
  }

  changeUnits() {
    if (this.model.units === 'imperial') {
      this.model.units = 'metric';
    } else {
      this.model.units = 'imperial';
    }
  }

  apiCall() {
    this.changeStatus('pending');
    apiServices.fetchWeatherInfo(this.model.inputValue, this.model.units)
      .then(() => {
        this.model.weatherForecast.currentWeather = apiServices.getCurrentData();
        this.model.weatherForecast.dailyWeather = apiServices.getDaysData();
        this.model.weatherForecast.hourlyWeather = apiServices.getHoursData();
        this.model.weatherCity = apiServices.getCity() + ' ' + formatUnixCurrent(this.model.weatherForecast.currentWeather.dt);
        this.filterForecastData();
        this.filterMainData();
        this.changeStatus('success');
      })
      .catch(() => {
        this.changeStatus('failed');
      });
  }

  filterMainData() {
    let {
      temp,
      feels_like: feelsLike,
      weather: [weather],
      uvi,
      humidity,
      wind_speed: windSpeed,
    } = this.model.weatherForecast.currentWeather;
    let [{ temp: tempDay }] = this.model.weatherForecast.dailyWeather; //Current day extra data
    this.model.mainData = {
      temp: Math.floor(temp),
      feelsLike: Math.floor(feelsLike),
      weather,
      tempDay: { min: Math.floor(tempDay.min), max: Math.floor(tempDay.max) },
      unit: this.model.units === 'imperial' ? '°F' : '°C',
    };

    this.model.detailsData = {
      uvi: {
        name: 'UV Index',
        value: uvi,
      },
      humidity: {
        name: 'Humidity',
        value: humidity,
        unit: '%',
      },
      windSpeed: {
        name: 'Wind Speed',
        value: windSpeed,
        unit: this.model.units === 'imperial' ? 'Mp/h' : 'Km/h',
      },
    };

    this.model.notify(this.model.mainData);
  }

  filterForecastData() {
    this.resetModelData();
    this.model.weatherForecast.dailyWeather.forEach(day => {
      let { dt, temp, weather: [weather] } = day;
      this.model.dailyData.push({
        dt: formatUnixDay(dt),
        temp: { min: Math.floor(temp.min), max: Math.floor(temp.max) },
        weather,
        unit: this.model.units === 'imperial' ? '°F' : '°C',
      });
    });
    this.model.weatherForecast.hourlyWeather.forEach(hour => {
      let { dt, temp, weather: [weather] } = hour;
      this.model.hourlyData.push({
        dt: formatUnixHour(dt),
        temp: Math.floor(temp),
        weather,
        unit: this.model.units === 'imperial' ? '°F' : '°C',
      });
    });
  }

  resetModelData() {
    this.model.dailyData.length = 0;
    this.model.hourlyData.length = 0;
  }

  changeStatus(currentStatus: string) {
    switch (currentStatus) {
      case 'success':
        this.model.currentView = 'cards';
        break;
      case 'failed':
        this.model.currentView = 'form';
        break;
      default:
        this.model.currentView = 'form';
    }
    this.model.status = currentStatus;
    this.model.notify(this.model.status);
  }
}

export default WeatherAppController;