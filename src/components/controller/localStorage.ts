import {
    basketItemsStorage,
    BASKET_COUNT,
    BASKET_ITEMS,
    EMPTY,
    INPUT_BRAKES,
    INPUT_COLOR,
    INPUT_MAKE,
    INPUT_SEARCH,
    POPULAR,
    SEARCH,
    SEPARATOR,
    STRING,
    TRUE,
} from '../../constants/constants';
import { setCheckboxes } from '../filters/filterCheckbox';
import { setPopularFlag } from '../filters/popularFilter';
import { elementDomStorage } from '../render/generateElement';
import { DataObject } from '../../constants/types';
import { renderBasket, renderBasketItems } from './AddEventListeners';

export function saveToLocalStorage(key: string, value: string): void {
    if (key && value && typeof key === STRING && typeof value === STRING) {
        const storage = window.localStorage;
        storage.setItem(key, value);
    }
}

export function getFromLocalStorage(key: string): string {
    if (key && typeof key === STRING) {
        const storage = window.localStorage;
        return storage.getItem(key) || EMPTY;
    }
    return EMPTY;
}

export function resetLocalStorage(): void {
    const storage = window.localStorage;
    storage.clear();
}

export function removeFromLocalStorage(key: string): void {
    if (key && typeof key === STRING) {
        const storage = window.localStorage;
        storage.removeItem(key);
    }
}

export function applyLocalStorage(data: DataObject[]): void {
    const storage = window.localStorage;
    const basketCount = storage.getItem(BASKET_COUNT);
    const basketItems = storage.getItem(BASKET_ITEMS);
    const popular = storage.getItem(POPULAR);
    const search = storage.getItem(SEARCH);
    if (basketCount) {
        renderBasket(Number(basketCount));
    }
    if (basketItems) {
        const storedStorage = basketItems.split(SEPARATOR);
        basketItemsStorage.push(...storedStorage);
        renderBasketItems();
    }
    [INPUT_MAKE, INPUT_BRAKES, INPUT_COLOR].forEach((el) => {
        const items = storage.getItem(el);
        if (items) {
            setCheckboxes(el, items?.split(SEPARATOR));
        }
    });
    if (popular) {
        const flag: boolean = popular === TRUE;
        setPopularFlag(flag, data);
    }
    if (search) {
        elementDomStorage.get(INPUT_SEARCH)?.forEach((el) => {
            (el as HTMLInputElement).value = search;
        });
    }
}

export function saveFromMap(map: Map<string, string[]>): void {
    if (map instanceof Map) {
        map.forEach((value, key) => {
            if (Array.isArray(value) && value.every((el) => typeof el === STRING)) {
                saveToLocalStorage(key, value.join(SEPARATOR));
            }
        });
    }
}
