import {
  WeatherModel,
  WeatherCurrent,
  WeatherDaily,
  WeatherHourly,
  MainCardData,
  ForecastDailyData,
  ForecastHourlyData, DetailsCardData,
} from 'interfaces';
import ConcreteObservable from './Observable';

class WeatherAppModel extends ConcreteObservable implements WeatherModel {
  inputValue: string;

  currentView: string;

  weatherCity: string;

  status: string;

  units: string;

  weatherForecast: {
    currentWeather: WeatherCurrent;

    dailyWeather: WeatherDaily[];

    hourlyWeather: WeatherHourly[];
  };

  mainData: MainCardData;

  dailyData: ForecastDailyData[];

  detailsData: DetailsCardData;

  hourlyData: ForecastHourlyData[];

  constructor() {
    super();
    this.status = 'idle';
    this.inputValue = '';
    this.currentView = 'form';
    this.units = 'imperial';
    this.weatherForecast = {} as {
      currentWeather: WeatherCurrent;
      dailyWeather: WeatherDaily[];
      hourlyWeather: WeatherHourly[];
    };
    this.weatherCity = '';
    this.mainData = {} as MainCardData;
    this.detailsData = {} as DetailsCardData;
    this.dailyData = [];
    this.hourlyData = [];
  }
}


export default WeatherAppModel;