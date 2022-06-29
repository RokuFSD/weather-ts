import { ElementDOM, SliderComponent, SliderOptions } from '../interfaces';
import { createElement } from '../utils';
import components from '../styles/components.module.css';
class Slider implements SliderComponent {

  tabsContainer: HTMLElement;

  itemsContainer: HTMLElement[] | HTMLElement;

  domElement!: HTMLElement;

  hasTabs: boolean;

  options: SliderOptions | undefined;

  isDown: boolean;

  startX: number;

  scrollLeft: number;

  constructor(tabs: boolean, options?: SliderOptions) {
    this.isDown = false;
    this.startX = 0;
    this.scrollLeft = 0;
    this.hasTabs = tabs;
    this.options = options;
    this.itemsContainer = this.generateItemsContainer() as HTMLElement[];
    this.tabsContainer = this.generateTabs() as HTMLElement;
    this.domElement = createElement('section', { class: `${components.slider}` }, [this.tabsContainer, ...this.itemsContainer]);
  }

  setUpScroll(dom: HTMLElement) {
    dom.addEventListener('mousedown', this.startSlide.bind(this));
    dom.addEventListener('touchstart', this.startSlide.bind(this));
    dom.addEventListener('mousemove', this.moveSlide.bind(this));
    dom.addEventListener('touchmove', this.moveSlide.bind(this));
    dom.addEventListener('mouseleave', this.moveEnd.bind(this));
    dom.addEventListener('mouseup', this.moveEnd.bind(this));
    dom.addEventListener('touchend', this.moveEnd.bind(this));
  }

  startSlide(e:MouseEvent | TouchEvent) {
    e.preventDefault();
    let target = e.target as HTMLElement;
    target.classList.add(`${components.sliderActive}`);
    this.isDown = true;
    this.startX = e instanceof MouseEvent ? e.pageX - target.offsetLeft : e.touches[0].pageX - target.offsetLeft;
    this.scrollLeft = target.scrollLeft;
  }

  moveSlide(e:MouseEvent | TouchEvent) {
    if (!this.isDown) return;
    let target = e.target as HTMLElement;
    const x = e instanceof MouseEvent ? e.pageX - target.offsetLeft : e.touches[0].pageX - target.offsetLeft;
    const dist = (x - this.startX);
    target.scrollLeft = this.scrollLeft - dist;
  }

  moveEnd(e: Event) {
    let target = e.target as HTMLElement;
    this.isDown = false;
    target.classList.remove(`${components.sliderActive}`);
  }

  generateTabs() {
    if (!this.hasTabs) return;
    let tabsContainer = createElement('div', { class: `${components.sliderTabsContainer}` });
    if (this.options !== undefined && this.options.tabsText) {
      this.options.tabsText.forEach((tabText, i) => {
        let tab = createElement('div', {
          class: i === 0 ? `${components.sliderTab} ${components.sliderTabActive}` : `${components.sliderTab}`,
          id: `tab-${tabText.toLowerCase()}`,
        }, new Text(tabText));
        tabsContainer.appendChild(tab);
      });
    }
    tabsContainer.addEventListener('click', this.handleTabClick.bind(this));
    return tabsContainer;
  }

  addItems(items: ElementDOM[] | ElementDOM, toContainer?: string) {
    let currentContainer: HTMLElement;
    currentContainer = toContainer ? this.findContainer(toContainer) : this.itemsContainer as HTMLElement;
    if (Array.isArray(items) && items.length <= 0) return;
    if (!Array.isArray(items)) {
      currentContainer.appendChild(items.domElement);
    } else {
      for (let item of items) {
        currentContainer.appendChild(item.domElement);
      }
    }
  }

  private findContainer(id: string) {
    for (let element of this.itemsContainer as HTMLElement[]) {
      let elementId = element.getAttribute('id');
      if (elementId && elementId.toLowerCase().includes(id.toLowerCase())) return element;
    }
    throw new Error('No container id founded');
  }

  private generateItemsContainer() {
    if (!this.hasTabs) return;
    let arrContainers: HTMLElement[] = [];
    for (let i = 0; i < this.options!.tabsText!.length; i++) {
      let container = (createElement('div', {
        class: i === 0 ? `${components.sliderContainer} ${components.sliderContainerActive}` : `${components.sliderContainer}`,
        id: `container${this.options!.tabsText![i]}`,
      }));
      this.setUpScroll(container);
      arrContainers.push(container);
    }
    return arrContainers;
  }

  private handleTabClick(evt: Event) {
    if (evt.type === 'click') {
      let tab = evt.target as HTMLDivElement;
      if (!tab.id) return;
      let tabId = tab.id.split('-');
      let container = this.findContainer(tabId[1]);
      this.onTabClick(tab, container);
    }
  }

  private onTabClick(tab: HTMLDivElement, container: HTMLElement) {
    let currentTab = document.querySelector(`.${components.sliderTabActive}`);
    let currentContainer = document.querySelector(`.${components.sliderContainerActive}`);
    if (currentContainer && currentContainer.id !== container.id) {
      tab.classList.add(`${components.sliderTabActive}`);
      container.classList.add(`${components.sliderContainerActive}`);
      currentContainer.classList.remove(`${components.sliderContainerActive}`);
      currentTab!.classList.remove(`${components.sliderTabActive}`);
    }
    return;
  }
}

export default Slider;
