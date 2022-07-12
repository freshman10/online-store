import { basketItemsStorage } from '../../constants/constants';
import { applyAll } from '../filters/applyAllFilters';
import { elementDomStorage } from '../render/generateElement';
import { renderItems } from '../render/items';
import { DataObject } from '../types';
import { createRangeFilter } from '../render/filterByRange';

function countItemsInBasket(): number {
    return basketItemsStorage.length;
}

function renderBasket(items: number): void {
    elementDomStorage.get('bin-counter')?.forEach((el) => (el.textContent = items.toString()));
}

function saveToBasketItemsStorage(element: Element): void {
    const nameOfProduct: string = element.querySelector('.item-name')?.textContent || '';
    if (basketItemsStorage.includes(nameOfProduct) && nameOfProduct) {
        const index = basketItemsStorage.indexOf(nameOfProduct);
        basketItemsStorage.splice(index, 1);
    } else {
        basketItemsStorage.push(nameOfProduct);
    }
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

function removeChecked(elements: HTMLElement[], element: HTMLElement, classToRemove: string): void {
    elements.forEach((el) => {
        if (el !== element) {
            el.classList.remove(classToRemove);
        }
    });
}

export function checkBoxListners(
    elementClass: string,
    eventType: string,
    addedClass: string,
    data: DataObject[]
): void {
    elementDomStorage.get(elementClass)?.forEach((el) => {
        el.addEventListener(eventType, () => {
            if (addedClass === 'hide') {
                elementDomStorage.get('checked-img')?.slice(0, 1)[0].classList.toggle('hide');
            } else {
                el.classList.add(addedClass);
                removeChecked(elementDomStorage.get(elementClass)!, el, addedClass);
            }
            const filtered = applyAll(data);
            renderItems(filtered);
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
    resetDropdownList('dropdown');
    resetColors();
    resetPopular();
    resetRangeFilters(data);
    resetSearch();
}

function resetSettings(data: DataObject[]): void {
    resetFilters(data);
    resetSorting();
}

function resetDropdownList(target: string): void {
    elementDomStorage.get(target)?.forEach((el) => {
        (el as HTMLSelectElement).selectedIndex = 0;
    });
}

function resetColors(): void {
    elementDomStorage.get('color-item')?.forEach((el) => {
        if (el.classList.contains('checked')) {
            el.classList.remove('checked');
        }
        if (el.getAttribute('value') === 'ALL') {
            el.classList.add('checked');
        }
    });
}

function resetPopular(): void {
    elementDomStorage.get('checked-img')?.forEach((el) => el.classList.add('hide'));
}

function resetRangeFilters(data: DataObject[]): void {
    const parentDiv = elementDomStorage.get('filter-range')?.slice(0, 1)[0] as HTMLElement;
    if (parentDiv) {
        ['age', 'wheel', 'price', 'items'].forEach((filter) => {
            elementDomStorage.get(`${filter}-filter`)?.forEach((el) => {
                el.remove();
                elementDomStorage.delete(`${filter}-filter`);
            });
        });
        createRangeFilter(parentDiv, data, 'age', 'Production year');
        createRangeFilter(parentDiv, data, 'wheel', 'Wheel size');
        createRangeFilter(parentDiv, data, 'price', 'Price');
        createRangeFilter(parentDiv, data, 'items', 'Quantity');
    }
}

function resetSearch(): void {
    elementDomStorage.get('input-search')?.forEach((el) => ((el as HTMLInputElement).value = ''));
}

function resetSorting(): void {
    elementDomStorage.get('sorting-droplist')?.forEach((el) => ((el as HTMLSelectElement).selectedIndex = 0));
    basketItemsStorage.splice(0, basketItemsStorage.length);
    const items = countItemsInBasket();
    renderBasket(items);
}
