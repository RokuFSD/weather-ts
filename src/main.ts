import './styles/main.css';
import './styles/reset.css';
import { HeaderView, FooterView, WeatherAppView } from './views';
import HeaderController from './controllers/header.controller';
import HeaderModel from './models/header.model';
import WeatherAppController from './controllers/weatherapp.controller';
import WeatherAppModel from './models/weatherapp.model';

const app = (() => {
  const rootElement = document.querySelector<HTMLDivElement>('#app')!;
  const headerModel = new HeaderModel();
  const headerController = new HeaderController(headerModel);
  const headerView = new HeaderView(headerController);
  const weatherAppModel = new WeatherAppModel();
  const weatherAppController = new WeatherAppController(weatherAppModel);
  const weatherAppView = new WeatherAppView(weatherAppController);
  const footerView = new FooterView();

  function start():void {
    rootElement.appendChild(headerView.domElement);
    rootElement.appendChild(weatherAppView.domElement);
    rootElement.appendChild(footerView.domElement);
  }

  return {
    start,
  };
})();

app.start();
