import { basketItemsStorage } from '../../constants/constants';
import { applyAll } from '../filters/applyAllFilters';
import { elementDomStorage } from '../render/generateElement';
import { renderItems } from '../render/items';
import { DataObject } from '../../constants/types';
import { createRangeFilter } from '../render/filterByRange';
import { removeFromLocalStorage, resetLocalStorage, saveToLocalStorage } from './localStorage';

export function countItemsInBasket(): number {
    return basketItemsStorage.length;
}

export function renderBasket(items: number): void {
    elementDomStorage.get('bin-counter')?.forEach((el) => (el.textContent = items.toString()));
    saveToLocalStorage('basketCount', items.toString());
}

export function renderBasketItems(): void {
    elementDomStorage.get('item-container')?.forEach((el) => {
        if (basketItemsStorage.includes(el.querySelector('.item-name')?.textContent as string)) {
            el.querySelector('.added-container')?.classList.remove('basket');
        }
    });
}

function showAttention(): void {
    elementDomStorage.get('warning-container')?.forEach((el) => {
        el.classList.remove('hide');
    });
    elementDomStorage.get('background-layer')?.forEach((el) => {
        el.classList.remove('hide');
    });
}

function saveToBasketItemsStorage(element: Element): void {
    const nameOfProduct: string = element.querySelector('.item-name')?.textContent || '';
    if (nameOfProduct !== '' && basketItemsStorage.includes(nameOfProduct)) {
        const index = basketItemsStorage.indexOf(nameOfProduct);
        basketItemsStorage.splice(index, 1);
    } else {
        if (basketItemsStorage.length === 20) {
            showAttention();
            element.querySelector('.added-container')?.classList.toggle('basket');
        } else {
            basketItemsStorage.push(nameOfProduct);
        }
    }
    saveToLocalStorage('basketItems', basketItemsStorage.join('+++'));
}

export function addToBasket(): void {
    elementDomStorage.get('items-container')?.forEach((container) => {
        container.addEventListener('click', (e) => {
            const clickedElement = (e.target as Element).closest('.item-container') as Element;
            if (clickedElement) {
                clickedElement.querySelector('.added-container')?.classList.toggle('basket');
                saveToBasketItemsStorage(clickedElement);
                const items = countItemsInBasket();
                renderBasket(items);
            }
        });
    });
}

export function resetButtonListners(target: string, eventType: string, data: DataObject[]): void {
    elementDomStorage.get(target)?.forEach((el) =>
        el.addEventListener(eventType, () => {
            if (target === 'reset-filters') {
                resetFilters(data);
            } else if (target === 'reset-setting') {
                resetSettings(data);
            }
            const filteredData = applyAll(data);
            renderItems(filteredData);
        })
    );
}

function resetFilters(data: DataObject[]): void {
    resetCheckboxes();
    resetPopular();
    resetRangeFilters(data);
    resetSearch();
}

function resetSettings(data: DataObject[]): void {
    resetFilters(data);
    resetSorting();
    resetBasketItemStorage();
    resetLocalStorage();
}

function resetBasketItemStorage(): void {
    basketItemsStorage.splice(0, basketItemsStorage.length);
    removeFromLocalStorage('basketItems');
}

export function resetCheckboxes(): void {
    elementDomStorage.get('input')?.forEach((el) => {
        (el as HTMLInputElement).checked = false;
    });
    ['input-make', 'input-brakes', 'input-color'].forEach((el) => {
        removeFromLocalStorage(el);
    });
}

function resetPopular(): void {
    elementDomStorage.get('checked-img')?.forEach((el) => el.classList.add('hide'));
    removeFromLocalStorage('popular');
}

function resetRangeFilters(data: DataObject[]): void {
    const parentDiv = elementDomStorage.get('filter-range')?.slice(0, 1)[0] as HTMLElement;
    if (parentDiv) {
        ['age', 'wheel', 'price', 'items'].forEach((filter) => {
            elementDomStorage.get(`${filter}-filter`)?.forEach((el) => {
                el.remove();
                elementDomStorage.delete(`${filter}-filter`);
            });
            removeFromLocalStorage(`${filter}-input`);
        });
        createRangeFilter(parentDiv, data, 'age', 'Production year');
        createRangeFilter(parentDiv, data, 'wheel', 'Wheel size');
        createRangeFilter(parentDiv, data, 'price', 'Price');
        createRangeFilter(parentDiv, data, 'items', 'Quantity');
    }
}

function resetSearch(): void {
    elementDomStorage.get('input-search')?.forEach((el) => ((el as HTMLInputElement).value = ''));
    removeFromLocalStorage('search');
}

function resetSorting(): void {
    elementDomStorage.get('sorting-droplist')?.forEach((el) => ((el as HTMLSelectElement).selectedIndex = 0));
    basketItemsStorage.splice(0, basketItemsStorage.length);
    removeFromLocalStorage('sort');
    const items = countItemsInBasket();
    renderBasket(items);
}

export function addEventListnerSpoiler(elementClass: string, eventType: string, targets: [string, string][]): void {
    elementDomStorage.get(elementClass)?.forEach((element) => {
        element.addEventListener(eventType, () => {
            targets.forEach((target) => {
                element
                    .closest('.spoiler')
                    ?.querySelectorAll(`.${target[0]}`)
                    .forEach((el) => {
                        el.classList.toggle(target[1]);
                    });
            });
        });
    });
}

export function addEventListnerTemplate(
    elementClass: string,
    eventType: string,
    targets: [string, string][],
    data: DataObject[]
): void {
    elementDomStorage.get(elementClass)?.forEach((element) => {
        element.addEventListener(eventType, () => {
            targets.forEach((target) => {
                element?.querySelectorAll(`.${target[0]}`).forEach((el) => {
                    el.classList.toggle(target[1]);
                    if (elementClass === 'popular-checkbox') {
                        if (el.classList.contains('hide')) {
                            saveToLocalStorage('popular', 'false');
                        } else {
                            saveToLocalStorage('popular', 'true');
                        }
                    }
                });
            });
            const filteredData = applyAll(data);
            renderItems(filteredData);
        });
    });
}
