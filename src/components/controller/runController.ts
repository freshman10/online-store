import { applyAll } from '../filters/applyAllFilters';
import { clearLocalStoreRemains } from '../filters/filterCheckbox';
import getData from '../getData';
import { elementDomStorage } from '../render/generateElement';
import { renderItems } from '../render/items';
import { DataObject } from '../../constants/types';
import { addEventListnerSpoiler, addEventListnerTemplate, addToBasket, resetButtonListners } from './AddEventListners';
import { saveToLocalStorage } from './localStorage';

function setEventListners(data: DataObject[]): void {
    addToBasket();
    const options: Map<string, string[]> = new Map();
    options.set('input-search', ['input']);
    options.set('sorting-droplist', ['change']);
    options.set('input-container', ['click']);
    generateListners(options, data);
    resetButtonListners('reset-filters', 'click', data);
    resetButtonListners('reset-setting', 'click', data);
    addEventListnerSpoiler('input-header-container', 'click', [
        ['spoiler-triangle', 'rotate'],
        ['spoiler-form', 'invisible'],
    ]);
    addEventListnerTemplate('popular-checkbox', 'click', [['checked-img', 'hide']], data);
}

function generateListners(options: Map<string, string[]>, data: DataObject[]): void {
    options.forEach((value, key) => {
        elementDomStorage.get(key)?.forEach((el) => {
            value.forEach((eventType) => {
                el.addEventListener(eventType, () => {
                    if (key === 'input-search') {
                        saveToLocalStorage('search', (el as HTMLInputElement).value);
                    }
                    if (key === 'sorting-droplist') {
                        elementDomStorage.get(key)?.forEach((item) => {
                            const input = item as HTMLSelectElement;
                            const index = input.selectedIndex.toString();
                            saveToLocalStorage('sort', index);
                        });
                    }
                    clearLocalStoreRemains();
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
}
