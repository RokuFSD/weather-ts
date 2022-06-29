import { ElementProps, MainCardData } from '../interfaces';
import { format } from 'date-fns';

export function createElement(tag: string, props: ElementProps, childs?: HTMLElement[] | Node[] | Node): HTMLElement {
  let dom = document.createElement(tag);

  for (let prop of Object.keys(props)) {
    dom.setAttribute(prop, props[prop]);
  }

  if (childs) {
    if (Array.isArray(childs)) {
      for (let child of childs) {
        dom.appendChild(child);
      }
    } else {
      dom.appendChild(childs);
    }
  }
  return dom;
}

const weatherMap = new Map(
  [
    ['Clouds', 'fa-cloud'],
    ['Clear', 'fa-sun'],
    ['Rain', 'fa-cloud-rain'],
    ['Thunderstorm', 'fa-cloud-bolt'],
    ['Wind Speed', 'fa-wind'],
    ['Humidity', 'fa-droplet'],
    ['UV Index', 'fa-sun'],
  ],
);

export function getIconName(weatherIcon: string): string {
  if (weatherMap.has(weatherIcon)) {
    let result = weatherMap.get(weatherIcon);
    if (result) return result;
  }
  return `Error searching ${weatherIcon}`;
}

/* ==== Dates ==== */
export function formatUnixDay(unix: number): string {
  return format(new Date(unix * 1000), 'eeee');
}

export function formatUnixHour(unix: number): string {
  return format(new Date(unix * 1000), 'haaa');
}

export function formatUnixCurrent(unix: number): string {
  return format(new Date(unix * 1000), 'PPPPp');
}

/* ==== Interface Check ==== */
export function instanceOfMainData(value: MainCardData): value is MainCardData {
  return 'weather' in value;
}