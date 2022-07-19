import { applyAll } from '../filters/applyAllFilters';
import { clearLocalStoreRemains } from '../filters/filterCheckbox';
import getData from '../getData';
import { elementDomStorage } from '../render/generateElement';
import { renderItems } from '../render/items';
import { DataObject } from '../../constants/types';
import { addEventListnerSpoiler, addEventListnerTemplate, addToBasket, resetButtonListners } from './AddEventListners';
import { saveToLocalStorage } from './localStorage';
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

function setEventListners(data: DataObject[]): void {
    addToBasket();
    const options: Map<string, string[]> = new Map();
    options.set(INPUT_SEARCH, [INPUT]);
    options.set(SORTING_DROPLIST, [CHANGE]);
    options.set(INPUT_CONTAINER, [CLICK]);
    generateListners(options, data);
    resetButtonListners(RESET_FILTERS, CLICK, data);
    resetButtonListners(RESET_SETTINGS, CLICK, data);
    addEventListnerSpoiler(INPUT_HEADER_CONTAINER, CLICK, [
        [SPOILER_TRIANGLE, ROTATE],
        [SPOILER_FORM, INVISIBLE],
    ]);
    addEventListnerTemplate(POPULAR_CHECKBOX, CLICK, [[CHECKED_IMG, HIDE]], data);
}

function generateListners(options: Map<string, string[]>, data: DataObject[]): void {
    options.forEach((value, key) => {
        elementDomStorage.get(key)?.forEach((el) => {
            value.forEach((eventType) => {
                el.addEventListener(eventType, () => {
                    if (key === INPUT_SEARCH) {
                        saveToLocalStorage(SEARCH, (el as HTMLInputElement).value);
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
    setEventListners(data);
}
