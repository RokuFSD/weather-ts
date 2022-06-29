import { createElement } from '../utils';
import { Observer, WeatherController } from 'interfaces';
import InputGroup from '../components/InputGroup';
import components from '../styles/components.module.css';
import padding from '../styles/padding.module.css';
import typo from '../styles/typography.module.css';

class WeatherAppForm implements Observer {
  private static instance: WeatherAppForm;

  public controller: WeatherController;

  private element: HTMLFormElement | undefined;

  private readonly inputGroup: InputGroup;

  private errorWarning: () => void;

  private hasFailed: boolean;

  constructor() {
    this.controller = {} as WeatherController;
    this.inputGroup = new InputGroup();
    this.inputGroup.addInput('text', 'city', 'city', 'Enter a city...');
    this.inputGroup.addIcon('search');
    this.errorWarning = this.handleError();
    this.hasFailed = false;
  }

  private static errorDOM() {
    let errorMsg = document.createTextNode('Location not found.\n Search must be in the form:\n "City", "City State Code" or \n"City State Code Country Code:"');
    return createElement('div', { class: `${components.formError} ${padding.medium} ${typo.smallText}` }, errorMsg);
  }

  private generateDom(input: InputGroup) {
    let element = createElement('form', { class: `${components.weather__form}`, id: 'form' }, input.element);
    element.addEventListener('submit', this.controller);
    return element as HTMLFormElement;
  }

  public setController(controller: WeatherController) {
    this.controller = controller;
    this.controller.model.addObserver(WeatherAppForm.getInstance());
    this.element = this.generateDom(this.inputGroup);
  }

  public static getInstance() {
    if (!WeatherAppForm.instance) {
      WeatherAppForm.instance = new WeatherAppForm();
    }
    return WeatherAppForm.instance;
  }

  get domElement(): HTMLElement {
    return this.element!;
  }

  private handleError() {
    let counter = 0;
    return () => {
      if (counter > 0) return;
      this.element!.appendChild(WeatherAppForm.errorDOM());
      counter++;
    };
  }

  private clean() {
    this.hasFailed = false;
    this.errorWarning = this.handleError();
    let errorMsg = document.querySelector(`.${components.formError}`);
    this.element!.removeChild(errorMsg!);
  }

  public update(data: any): void {
    if (data === 'failed') {
      this.hasFailed = true;
      this.errorWarning();
    }
    if (data === 'success') {
      if (this.hasFailed) {
        this.clean();
      } else {
        this.element?.reset();
      }
    }
  }
}

export default WeatherAppForm;