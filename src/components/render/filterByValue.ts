import { addToDOMStorage, createElement } from './generateElement';
import { DataObject } from '../types';

function createDropDownList(parentElement: HTMLElement, field: string, data: DataObject[], label: string): void {
    const companyContainer: HTMLElement = createElement('div', parentElement, [`${label}-container`]);
    createElement('h3', companyContainer, ['filter-option'], `${label}:`);
    const storage = new Set();
    storage.add('ALL');
    const dropDownList: HTMLSelectElement = document.createElement('select');
    dropDownList.classList.add(field, 'dropdown');
    addToDOMStorage(dropDownList);
    data.forEach((el) => storage.add(el[field as keyof typeof el]));
    storage.forEach((el) => {
        const option: HTMLOptionElement = document.createElement('option');
        addToDOMStorage(option);
        option.setAttribute('value', el as string);
        option.textContent = el as string;
        dropDownList.appendChild(option);
    });
    companyContainer.appendChild(dropDownList);
}

function createColorFilter(parentElement: HTMLElement, data: DataObject[]): void {
    const container: HTMLElement = createElement('div', parentElement, ['colors-container']);
    createElement('h3', container, ['colors-label'], 'Colors:');
    const colorsContainer = createElement('div', container, ['colors-storage']);
    const storage = new Set();
    storage.add('ALL');
    data.forEach((el) => storage.add(el.color));
    storage.forEach((color) => {
        const colorItem = createElement('div', colorsContainer, ['color-item']);
        if (color === 'ALL') {
            createElement('p', colorItem, ['color-all'], 'All');
        }
        colorItem.style.backgroundColor = color as string;
        colorsContainer.appendChild(colorItem);
    });
}

function createPopularFilter(parentElement: HTMLElement): void {
    const container = createElement('div', parentElement, ['popular-container']);
    createElement('h3', container, ['popular-label'], 'Show popular:');
    createElement('div', container, ['popular-checkbox']);
}

export function renderFilterByValue(parentElement: HTMLElement, data: DataObject[]): void {
    const filterByValue: HTMLElement = createElement('div', parentElement, ['filter-value', 'filter']);
    createElement('h2', filterByValue, ['filter-caption'], 'Filters by value');
    createDropDownList(filterByValue, 'make', data, 'Company');
    createDropDownList(filterByValue, 'brakes', data, 'Brakes');
    createColorFilter(filterByValue, data);
    createPopularFilter(filterByValue);
}