import { HeadingModel } from '../interfaces';
import ConcreteObservable from './Observable';

class HeaderModel extends ConcreteObservable implements HeadingModel {
  heading: string;

  lastPosition: number;

  ticking: boolean;

  constructor() {
    super();
    this.heading = 'Weatherly';
    this.lastPosition = 0;
    this.ticking = false;
  }
}

export default HeaderModel;
