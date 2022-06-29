import { Controller } from '../interfaces';
import { createElement, getIconName } from '../utils';
import Button from '../components/Button';
import Card from '../components/Card';
import components from '../styles/components.module.css';
import typo from '../styles/typography.module.css';

class CardBuilder {
  protected card: Card;

  constructor() {
    this.card = new Card();
  }

  get Card() {
    let returnedCard = this.card;
    this.card = new Card();
    return returnedCard;
  }

  produceIcon(weatherIcon: string) {
    let iconName = getIconName(weatherIcon);
    let domIcon = createElement('i', { class: `fa-solid ${iconName} fa-xl` });
    this.card.addChild(domIcon);
  }

  produceTitle(title: string) {
    let domTitle = createElement('h2', { class: `${typo.subTitleCard}` }, new Text(title));
    this.card.addChild(domTitle);
  }

  produceDescription(temp: number, description: string, feels: number, unit: string) {
    let domTemp = createElement('h3', { class: `${typo.titleCard}` }, new Text(`${temp} ${unit}`));
    let domDescription = createElement('div', { class: `${components.cardDetails}` }, [
      createElement('p', { class: `${typo.paragraph} ${typo.capitalize}` }, new Text(`${description}`)),
      createElement('p', { class: `${typo.paragraph}` }, new Text(`Feels like: ${feels} ${unit}`)),
    ]);
    let domSection = createElement('section', { class: `${components.cardDescription}` }, [domTemp, domDescription]);
    this.card.addChild(domSection);
  }
}

export class DetailCardBuilder extends CardBuilder {

  constructor() {
    super();
    this.card.addClass(`${components.detailCard}`);
  }

  get Card() {
    let card = super.Card;
    card.addClass(`${components.detailCard}`);
    return card;
  }

  produceDescription(temp: number, unit = '') {
    let domTemp = createElement('p', {}, new Text(`${temp} ${unit}`));
    this.card.addChild(domTemp);
  }
}

export class ForecastCardBuilder extends CardBuilder {

  constructor() {
    super();
    this.card.addClass(`${components.forecastCard}`);
  }

  get Card() {
    let card = super.Card;
    this.card.addClass(`${components.forecastCard}`);
    return card;
  }

  produceMinMax(minTemp: number, maxTemp: number, unit: string) {
    let lowLabel = createElement('span', { class: `${typo.smallText}` }, new Text(`${minTemp} ${unit}`));
    let highLabel = createElement('p', {}, new Text(`${maxTemp} ${unit}`));
    let fragment = new DocumentFragment();
    highLabel.appendChild(lowLabel);
    fragment.appendChild(highLabel);
    this.card.addChild(fragment);
  }

  produceDescription(temp: number, unit: string) {
    let domTemp = createElement('p', {}, new Text(`${temp} ${unit}`));
    this.card.addChild(domTemp);
  }
}

export class MainCardBuilder extends CardBuilder {

  constructor() {
    super();
    this.card.addClass(`${components.mainCard}`);
  }

  get Card() {
    let card = super.Card;
    this.card.addClass(`${components.mainCard}`);
    return card;
  }

  produceButtonUnits(eventHandler: Controller, unit: string) {
    let domButton = new Button();
    domButton.addClass(`${components.cardBtn}`);
    domButton.addEvent({ type: 'click', cb: eventHandler });
    domButton.addInner(`${unit}`);
    domButton.addTooltip('Change units');
    this.card.addChild(domButton.domElement);
  }

  produceMinMax(minTemp: number, maxTemp: number, unit: string) {
    let highLabel = createElement('div', { class: `${components.label} ${components.labelHigh}` }, new Text(`H: ${maxTemp} ${unit}`));
    let lowLabel = createElement('div', { class: `${components.label} ${components.labelLow}` }, new Text(`L: ${minTemp} ${unit}`));
    let domMinMax = createElement('section', { class: `${components.cardMinMax} ${typo.smallerText}` }, [highLabel, lowLabel]);
    this.card.addChild(domMinMax);
  }
}