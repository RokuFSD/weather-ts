import { createElement } from '../utils';
import components from '../styles/components.module.css';

const Loading = (() => {
  let loaderElement: HTMLElement = createElement('div', { class: `${components.loader}` });
  let element: HTMLElement = createElement('div', { class: `${components.loader__outter}` }, loaderElement);
  function start() {
    let root = document.querySelector('#app');
    if (root) {
      root.appendChild(element);
    }
  }
  function end() {
    element.remove();
  }
  return {
    start,
    end,
  };
})();

export default Loading;