import { createElement } from '../utils';
import components from '../styles/components.module.css';

class Card {
  domElement: HTMLElement;

  constructor() {
    this.domElement = createElement('div', { class: `${components.card}` });
  }

  addChild(element: HTMLElement | Text | Node) {
    this.domElement.appendChild(element);
  }

  addClass(className: string) {
    this.domElement.classList.add(className);
  }
}

export default Card;