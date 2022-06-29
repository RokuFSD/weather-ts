import { HeadingController, HeadingModel } from 'interfaces';

class HeaderController implements HeadingController {
  model: HeadingModel;

  constructor(model: HeadingModel) {
    this.model = model;
  }

  handleEvent(evt: UIEvent): void {
    evt.stopPropagation();
    switch (evt.type) {
      case 'scroll':
        this.handleScroll();
        break;
      default:
        console.log('Not handler founded for this event');
    }
  }

  handleScroll() {
    this.model.lastPosition = window.scrollY;

    const stickHeader = (position: number) => {
      if (position < 200) {
        this.model.notify('unstick');
      } else {
        this.model.notify('stick');
      }
    };

    if (!this.model.ticking) {
      window.requestAnimationFrame(() => {
        stickHeader(this.model.lastPosition);
        this.model.ticking = false;
      });
    }
    this.model.ticking = true;


  }
}

export default HeaderController;