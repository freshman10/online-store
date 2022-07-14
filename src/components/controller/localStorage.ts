import { basketItemsStorage } from '../../constants/constants';
import { applyAll } from '../filters/applyAllFilters';
import { setCheckboxes } from '../filters/filterCheckbox';
import { setPopularFlag } from '../filters/popularFilter';
import { elementDomStorage } from '../render/generateElement';
import { DataObject } from '../types';
import { renderBasket, renderBasketItems, resetCheckboxes } from './AddEventListners';

export function saveToLocalStorage(key: string, value: string): void {
    const storage = window.localStorage;
    storage.setItem(key, value);
}

export function getFromLocalStorage(key: string): string {
    const storage = window.localStorage;
    return storage.getItem(key) || '';
}

export function resetLocalStorage(): void {
    const storage = window.localStorage;
    storage.clear();
}

export function removeFromLocalStorage(key: string): void {
    const storage = window.localStorage;
    storage.removeItem(key);
}

export function applyLocalStorage(data: DataObject[]): void {
    const storage = window.localStorage;
    const basketCount = storage.getItem('basketCount');
    const basketItems = storage.getItem('basketItems');
    const popular = storage.getItem('popular');
    const search = storage.getItem('search');
    if (basketCount) {
        renderBasket(Number(basketCount));
    }
    if (basketItems) {
        const storedStorage = basketItems.split('+++');
        basketItemsStorage.push(...storedStorage);
        renderBasketItems();
    }
    ['input-make', 'input-brakes', 'input-color'].forEach((el) => {
        const items = storage.getItem(el);
        if (items) {
            setCheckboxes(el, items?.split('+++'));
        }
    });
    if (popular) {
        const flag: boolean = popular === 'true' ? true : false;
        setPopularFlag(flag, data);
    }
    if (search) {
        elementDomStorage.get('input-search')?.forEach((el) => {
            (el as HTMLInputElement).value = search;
        });
    }
}

export function saveFromMap(map: Map<string, string[]>): void {
    map.forEach((value, key) => {
        saveToLocalStorage(key, value.join('+++'));
    });
}
