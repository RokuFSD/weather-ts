import { createElement } from '../utils';
import { Controller } from '../interfaces';
import components from '../styles/components.module.css';

interface Component {
  element: HTMLElement,
  addClass(className: string): void,
}

class Button implements Component {
  element: HTMLElement;

  constructor() {
    this.element = createElement('button', { class: 'btn' });
  }

  addClass(className: string) {
    this.element.classList.add(className);
  }

  addEvent({ type, cb }: { type: string, cb: Controller }) {
    this.element.addEventListener(type, cb);
  }

  addInner(innerDom: HTMLElement | string) {
    let innerTextNode: Text;
    if (typeof innerDom === 'string') {
      innerTextNode = new Text(innerDom);
      return this.element.appendChild(innerTextNode);
    }
    return this.element.appendChild(innerDom);
  }

  addTooltip(text: string) {
    let tooltipDOM = createElement('span', { class: `${components.cardTooltip}` }, new Text(text));
    this.element.appendChild(tooltipDOM);
  }

  get domElement() {
    return this.element;
  }
}

export default Button;