import 'css.gg/icons/css/search.css';
import { createElement } from '../utils';
import components from '../styles/components.module.css';
import padding from '../styles/padding.module.css';
import typo from '../styles/typography.module.css';

export interface FormGroup {
  element: HTMLElement,
  addIcon(iconName: string): void,
  addInput(inputType: string, name: string, id: string, placeholder: string): void
}

class InputGroup implements FormGroup {
  element: HTMLElement;

  constructor() {
    this.element = createElement('section', { class: `${components.inputGroup}` });
  }

  private addChild(innerElement: HTMLElement) {
    this.element.appendChild(innerElement);
  }

  addIcon(iconName: string) {
    let icon = createElement('i', { class: `gg-${iconName}` });
    this.addChild(icon);
  }

  addInput(inputType: string, name: string, id: string, placeholder: string) {
    let input = createElement('input', {
      class: `${components.input} ${padding.medium} ${typo.inputText}`,
      type: `${inputType}`,
      name: `${name}`,
      id: `${id}`,
      placeholder: `${placeholder}`,
    });
    this.addChild(input);
  }
}

export default InputGroup;
