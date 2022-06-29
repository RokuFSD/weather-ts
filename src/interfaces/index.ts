export interface Weather {
  description: 'string',
  icon: 'string',
  id: number,
  main: 'string',
}

export interface DetailsCardData {
  [k: string]: {
    name: string
    value: number
    unit?: string
  }
}

export interface MainCardData {
  temp: number,
  feelsLike: number,
  weather: Weather,
  tempDay: {
    min: number,
    max: number
  }

  unit: string;
}

export interface ForecastDailyData {
  dt: string,
  temp: {
    min: number,
    max: number,
  }
  weather: Weather,
  unit: string;
}

export interface ForecastHourlyData {
  dt: string,
  temp: number,
  weather: Weather
  unit: string
}

export interface WeatherCurrent {
  dt: number,
  feels_like: number,
  temp: number,
  weather: Weather[]
  uvi: number,
  humidity: number,
  wind_speed: number,
}

export interface WeatherDaily {
  dt: number,
  temp: {
    max: number,
    min: number
  },
  weather: Weather[]
}

export interface WeatherHourly {
  dt: number,
  temp: number,
  weather: Weather[];
}

export interface WeatherApi {
  current: WeatherCurrent
  daily: WeatherDaily[],
  hourly: WeatherHourly[]
}

export interface HeadingModel extends Observable {
  heading: string;
  lastPosition: number;
  ticking: boolean;
}

export interface WeatherModel extends Observable {
  inputValue: string;
  currentView: string;
  weatherCity: string;
  weatherForecast: {
    currentWeather: WeatherCurrent;
    dailyWeather: WeatherDaily[];
    hourlyWeather: WeatherHourly[];
  };
  status: string;
  units: string;
  mainData: MainCardData;
  dailyData: ForecastDailyData[];
  detailsData: DetailsCardData;
  hourlyData: ForecastHourlyData[];
}

export interface WeatherController extends Controller {
  model: WeatherModel;
}

export interface HeadingController extends Controller {
  model: HeadingModel;
}

export interface Controller {
  handleEvent(evt: Event): void;
}

export interface View {
  controller: Controller;
  element: HTMLElement;

  get domElement(): HTMLElement;
}

export interface ElementProps {
  [key: string]: string;
}

export interface Observer {
  update(data: string): void;
}

export interface Observable {
  observers: Array<Observer>;

  addObserver(observer: Observer): void;

  removeObserver(observer: Observer): void;

  notify(data: any): void;
}

export interface ElementDOM {
  domElement: HTMLElement;
}

export interface SliderComponent {
  itemsContainer: HTMLElement | HTMLElement[];
  domElement: HTMLElement;
  hasTabs: boolean;
  options: SliderOptions | undefined;
}

export interface SliderOptions {
  tabsText?: string[];
}