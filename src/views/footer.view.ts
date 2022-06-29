import { createElement } from '../utils';
import layout from '../styles/layout.module.css';
import typo from '../styles/typography.module.css';

class FooterView {
 
  element: HTMLElement;

  constructor() {
    this.element = createElement('footer', { id: 'footer', class:`${layout.footer} ${typo.paragraph}` });
    this.element.textContent = 'RokuFSD \u00A9 2022';
  }

  get domElement() {
    return this.element;
  }
}

export default FooterView;
