import { Observer, Observable } from '../interfaces';

class ConcreteObservable implements Observable {
  observers: Array<Observer>;

  constructor() {
    this.observers = [];
  }

  addObserver(observer: Observer) {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify(data: string) {
    if (this.observers.length > 0) {
      this.observers.forEach((obs: Observer) => {
        obs.update(data);
      });
    }
  }
}

export default ConcreteObservable;