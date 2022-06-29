import { View, Observer, HeadingController } from '../interfaces';
import { createElement } from '../utils';
import typo from '../styles/typography.module.css';
import padding from '../styles/padding.module.css';
import layout from '../styles/layout.module.css';

class HeaderView implements Observer, View {
  controller: HeadingController;

  element: HTMLElement;

  constructor(controller: HeadingController) {
    this.controller = controller;
    this.element = createElement('header', { id: 'header', class: `${layout.header} ${padding.medium} ${typo.headerTitle}` });
    this.element.textContent = controller.model.heading;
    window.addEventListener('scroll', controller);
    this.controller.model.addObserver(this);
  }

  update(data: string): void {
    if (data && data === 'stick') {
      let titleText = document.querySelector(`.${typo.title}`)!.textContent!.split(' ')[0];
      this.element.textContent = titleText;
      this.element.classList.add(`${layout.headerStick}`);
    } else {
      this.element.textContent = this.controller.model.heading;
      this.element.classList.remove(`${layout.headerStick}`);
    }
  }

  get domElement() {
    return this.element;
  }

} 

export default HeaderView;
