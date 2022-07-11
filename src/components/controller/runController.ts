import { applyAll } from '../filters/applyAllFilters';
import { addSearch } from '../filters/search';
import getData from '../getData';
import { elementDomStorage } from '../render/generateElement';
import { renderItems } from '../render/items';
import { DataObject } from '../types';
import { addToBasket, checkBoxListners } from './AddEventListners';

function setEventListners(data: DataObject[]): void {
    addToBasket();
    const options: Map<string, string[]> = new Map();
    options.set('input-search', ['input']);
    options.set('dropdown', ['change']);
    generateListners(options, data);
    checkBoxListners('color-item', 'click', 'checked', data);
    checkBoxListners('popular-checkbox', 'click', 'hide', data);
}

function generateListners(options: Map<string, string[]>, data: DataObject[]): void {
    options.forEach((value, key) => {
        elementDomStorage.get(key)?.forEach((el) => {
            value.forEach((eventType) => {
                el.addEventListener(eventType, () => {
                    const filtered = applyAll(data);
                    renderItems(filtered);
                });
            });
        });
    });
}

export function runController(): void {
    const data: DataObject[] = getData();
    setEventListners(data);
    //addSearch(data);
}
