import { DataObject } from '../../types';
import { createElement } from '../generateElement';

function createCard(data: DataObject): HTMLElement {
    const container = document.createElement('div');
    container.classList.add('item-container');
    createElement('h3', container, ['item-name'], data.name);
    const path = require(`../../../assets/img/${data.img}`);
    createElement('img', container, ['item-img'], '', [['src', `../../../assets/img/${data.img}`]]);
    createElement('p', container, ['description'], `Quantity: ${data.items}`);
    createElement('p', container, ['description'], `Production year: ${data.age}`);
    createElement('p', container, ['description'], `Company: ${data.make}`);
    createElement('p', container, ['description'], `Color: ${data.color}`);
    createElement('p', container, ['description'], `Brakes: ${data.brakes}`);
    createElement('p', container, ['description'], `Price: ${data.price}`);
    createElement('p', container, ['description'], `Popular: ${data.popular ? 'Yes' : 'No'}`);
    return container;
}

export function renderItems(parentElement: HTMLElement, data: DataObject[]): void {
    parentElement.innerHTML = '';
    data.forEach((item) => parentElement.appendChild(createCard(item)));
    //console.log(path.basename);
}
