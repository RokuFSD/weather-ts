import { Observer, View, WeatherController } from 'interfaces';
import { createElement } from '../utils';
import layout from '../styles/layout.module.css';
import Loading from '../components/Loading';
import WeatherAppForm from '../views/weatherapp-form.view';
import WeatherAppCards from '../views/weatherapp-cards.view';

class WeatherAppView implements Observer, View {
  controller: WeatherController;

  element: HTMLElement;

  view: HTMLElement;

  constructor(controller: WeatherController) {
    this.controller = controller;
    this.controller.model.addObserver(this);
    this.element = createElement('main', { class: `${layout.main}`, id: 'main' });
    this.view = this.currentView();
    this.element.appendChild(this.view);
  }

  private currentView(): HTMLElement {
    if (this.element.innerHTML) {
      this.element.innerHTML = '';
    }
    switch (this.controller.model.currentView) {
      case 'form': {
        let formView = WeatherAppForm.getInstance();
        formView.setController(this.controller);
        return formView.domElement;
      }
      case 'cards':
        return new WeatherAppCards(this.controller).domElement;
      default :
        return createElement('section', { class: 'error' }, document.createTextNode('No Current View'));
    }
  }

  private renderView() {
    if (this.view.getAttribute('id') !== this.controller.model.currentView) {
      this.view = this.currentView();
    }
    this.element.appendChild(this.view);
  }

  update(data: any): void {
    if (typeof data === 'string') {
      if (data === 'pending') return Loading.start();
      Loading.end();
      this.renderView();
    }
  }

  get domElement(): HTMLElement {
    return this.element;
  }
}

export default WeatherAppView;