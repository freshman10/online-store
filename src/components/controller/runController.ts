import { applyAll } from '../filters/applyAllFilters';
import { clearLocalStoreRemains } from '../filters/filterCheckbox';
import getData from '../getData';
import { elementDomStorage } from '../render/generateElement';
import { renderItems } from '../render/items';
import { DataObject } from '../../constants/types';
import {
    addEventListenerSpoiler,
    addEventListenerTemplate,
    addToBasket,
    resetButtonListeners,
} from './AddEventListeners';
import { removeFromLocalStorage, saveToLocalStorage } from './localStorage';
import {
    CHANGE,
    CHECKED_IMG,
    CLICK,
    HIDE,
    INPUT,
    INPUT_CONTAINER,
    INPUT_HEADER_CONTAINER,
    INPUT_SEARCH,
    INVISIBLE,
    POPULAR_CHECKBOX,
    RESET_FILTERS,
    RESET_SETTINGS,
    ROTATE,
    SEARCH,
    SORT,
    SORTING_DROPLIST,
    SPOILER_FORM,
    SPOILER_TRIANGLE,
} from '../../constants/constants';

function setEventListeners(data: DataObject[]): void {
    addToBasket();
    const options: Map<string, string[]> = new Map();
    options.set(INPUT_SEARCH, [INPUT]);
    options.set(SORTING_DROPLIST, [CHANGE]);
    options.set(INPUT_CONTAINER, [CLICK]);
    generateListeners(options, data);
    resetButtonListeners(RESET_FILTERS, CLICK, data);
    resetButtonListeners(RESET_SETTINGS, CLICK, data);
    addEventListenerSpoiler(INPUT_HEADER_CONTAINER, CLICK, [
        [SPOILER_TRIANGLE, ROTATE],
        [SPOILER_FORM, INVISIBLE],
    ]);
    addEventListenerTemplate(POPULAR_CHECKBOX, CLICK, [[CHECKED_IMG, HIDE]], data);
}

function generateListeners(options: Map<string, string[]>, data: DataObject[]): void {
    options.forEach((value, key) => {
        elementDomStorage.get(key)?.forEach((el) => {
            value.forEach((eventType) => {
                el.addEventListener(eventType, () => {
                    if (key === INPUT_SEARCH) {
                        const inputPattern: string = (el as HTMLInputElement).value;
                        if (!inputPattern) {
                            removeFromLocalStorage(SEARCH);
                        } else {
                            saveToLocalStorage(SEARCH, inputPattern);
                        }
                    }
                    if (key === SORTING_DROPLIST) {
                        elementDomStorage.get(key)?.forEach((item) => {
                            const input = item as HTMLSelectElement;
                            const index = input.selectedIndex.toString();
                            saveToLocalStorage(SORT, index);
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
    setEventListeners(data);
}
