import { basketItemsStorage } from '../../constants/constants';
import { DataObject } from './../types';
import { addToDOMStorage, createElement, elementDomStorage } from './generateElement';

function createCard(data: DataObject): HTMLElement {
    const container = document.createElement('div');
    container.classList.add('item-container');
    addToDOMStorage(container);
    createElement('h3', container, ['item-name'], data.name);
    require(`../../assets/img/${data.img}`);
    createElement('img', container, ['item-img'], '', [['src', `../../assets/img/${data.img}`]]);
    createElement('p', container, ['description'], `Quantity: ${data.items}`);
    createElement('p', container, ['description'], `Production year: ${data.age}`);
    createElement('p', container, ['description'], `Company: ${data.make}`);
    createElement('p', container, ['description'], `Color: ${data.color}`);
    createElement('p', container, ['description'], `Wheel: ${data.wheel}`);
    createElement('p', container, ['description'], `Brakes: ${data.brakes}`);
    createElement('p', container, ['description'], `Price: ${data.price}`);
    createElement('p', container, ['description'], `Popular: ${data.popular ? 'Yes' : 'No'}`);
    const addedContainer: HTMLElement = createElement('div', container, ['added-container', 'basket']);
    if (basketItemsStorage.includes(data.name)) {
        addedContainer.classList.remove('basket');
    }
    createElement('p', addedContainer, ['added-text'], 'Added to Cart');
    return container;
}

export function renderItems(data: DataObject[]): void {
    const parentElement = elementDomStorage.get('items-container');
    parentElement?.forEach((el) => {
        el.innerHTML = '';
        if (!data.length) {
            emptyData(el);
        }
        data.forEach((item) => el.appendChild(createCard(item)));
    });
}

function emptyData(parentElement: HTMLElement): void {
    createElement('h1', parentElement, ['attention'], 'Sorry, there is no products...');
}
