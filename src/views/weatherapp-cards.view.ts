import { DetailsCardData, Observer, View, WeatherController } from 'interfaces';
import { createElement, instanceOfMainData } from '../utils';
import { DetailCardBuilder, ForecastCardBuilder, MainCardBuilder } from '../components/CardBuilders';
import Slider from '../components/Slider';
import layout from '../styles/layout.module.css';
import typo from '../styles/typography.module.css';
import WeatherAppForm from '../views/weatherapp-form.view';

class WeatherAppCards implements View, Observer {
  controller: WeatherController;

  element: HTMLElement;

  mainSection: HTMLElement;

  forecastSection: HTMLElement;

  detailsSection: HTMLElement;

  constructor(controller: WeatherController) {
    this.controller = controller;
    this.controller.model.addObserver(this);
    this.mainSection = createElement('section', { class: `${layout.weatherMain}` });
    this.forecastSection = createElement('section', { class: `${layout.weatherForecast}` });
    this.detailsSection = createElement('section', { class: `${layout.weatherDetails}` });
    this.element = createElement('section', {
      class: `${layout.weatherApp}`,
      id: 'cards',
    }, [this.mainSection, this.forecastSection]);
    this.createTitle();
    this.buildMainSection();
    this.buildForecastSection();
    this.buildDetailsSection();
  }

  private buildDetail(data: keyof DetailsCardData): HTMLElement {
    let detailData = this.controller.model.detailsData;
    let builder = new DetailCardBuilder();
    builder.produceIcon(detailData[data].name);
    builder.produceTitle(detailData[data].name);
    builder.produceDescription(detailData[data].value, detailData[data].unit);
    return builder.Card.domElement;
  }


  private createTitle() {
    let formInput = WeatherAppForm.getInstance();
    let title = this.controller.model.weatherCity.split(' ');
    let city = title[0];
    title = [...title.slice(1)];
    let details = title.join(' ');
    let detailsDom = createElement('span', { class: `${typo.titleSpan}` }, new Text(details));
    this.element.appendChild(formInput.domElement);
    this.element.appendChild(createElement('h1', { class: `${typo.title}` }, [new Text(`${city} `), detailsDom]));
  }

  private buildMainSection() {
    let data = this.controller.model.mainData;
    let builder = new MainCardBuilder();
    /* Generate Card */
    builder.produceIcon(data.weather.main);
    builder.produceDescription(data.temp, data.weather.description, data.feelsLike, data.unit);
    builder.produceMinMax(data.tempDay.min, data.tempDay.max, data.unit);
    builder.produceButtonUnits(this.controller, data.unit);
    this.mainSection.appendChild(builder.Card.domElement);
    /* Append Result */
    this.element.appendChild(this.mainSection);
  }

  private buildForecastSection() {
    let builder = new ForecastCardBuilder();
    let foreCastSlider = new Slider(true, {
      tabsText: ['Weekly', 'Daily'],
    });

    this.controller.model.dailyData.forEach(day => {
      builder.produceTitle(day.dt);
      builder.produceMinMax(day.temp.min, day.temp.max, day.unit);
      builder.produceIcon(day.weather.main);
      foreCastSlider.addItems(builder.Card, 'Weekly');
    });

    this.controller.model.hourlyData.forEach(hour => {
      builder.produceTitle(hour.dt);
      builder.produceDescription(hour.temp, hour.unit);
      builder.produceIcon(hour.weather.main);
      foreCastSlider.addItems(builder.Card, 'Daily');
    });

    this.forecastSection.appendChild(foreCastSlider.domElement);
    this.element.appendChild(this.forecastSection);
  }

  private buildDetailsSection() {
    let title = createElement('h2', { class: `${typo.sectionTitle}` }, new Text('Details'));
    let cards: HTMLElement[] = [];
    cards.push(this.buildDetail('windSpeed'));
    cards.push(this.buildDetail('humidity'));
    cards.push(this.buildDetail('uvi'));
    cards.forEach(card => this.detailsSection.appendChild(card));
    this.element.appendChild(title);
    this.element.appendChild(this.detailsSection);
  }

  private restartSections() {
    this.element.innerHTML = '';
    this.mainSection.innerHTML = '';
    this.forecastSection.innerHTML = '';
    this.detailsSection.innerHTML = '';
  }

  update(data: any) {
    if (typeof data === 'string') return;
    if (instanceOfMainData(data)) {
      this.restartSections();
      this.createTitle();
      this.buildMainSection();
      this.buildForecastSection();
      this.buildDetailsSection();
    }
  }

  get domElement(): HTMLElement {
    return this.element;
  }
}

export default WeatherAppCards;