import {
    ADDED_CONTAINER,
    AGE,
    BACKGROUND_LAYER,
    BASKET,
    basketItemsStorage,
    BASKET_COUNT,
    BASKET_ITEMS,
    BIN_COUNTER,
    CHECKED_IMG,
    CLICK,
    EMPTY,
    FALSE,
    FILTER,
    FILTER_RANGE,
    HIDE,
    INPUT,
    INPUT_BRAKES,
    INPUT_COLOR,
    INPUT_MAKE,
    INPUT_SEARCH,
    ITEMS,
    ITEMS_CONTAINER,
    ITEM_CONTAINER,
    ITEM_NAME,
    ONE,
    POPULAR,
    POPULAR_CHECKBOX,
    PRICE,
    PRODUCTION_YEAR,
    QUANTITY,
    RESET_FILTERS,
    RESET_SETTINGS,
    SEARCH,
    SEPARATOR,
    SORT,
    SORTING_DROPLIST,
    SPOILER,
    TRUE,
    TWENTY,
    WARNING_CONTAINER,
    WHEEL,
    WHEEL_SIZE,
    ZERO,
} from '../../constants/constants';
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
    elementDomStorage.get(BIN_COUNTER)?.forEach((el) => (el.textContent = items.toString()));
    saveToLocalStorage(BASKET_COUNT, items.toString());
}

export function renderBasketItems(): void {
    elementDomStorage.get(ITEM_CONTAINER)?.forEach((el) => {
        if (basketItemsStorage.includes(el.querySelector(`.${ITEM_NAME}`)?.textContent as string)) {
            el.querySelector(`.${ADDED_CONTAINER}`)?.classList.remove(BASKET);
        }
    });
}

function showAttention(): void {
    elementDomStorage.get(WARNING_CONTAINER)?.forEach((el) => {
        el.classList.remove(HIDE);
    });
    elementDomStorage.get(BACKGROUND_LAYER)?.forEach((el) => {
        el.classList.remove(HIDE);
    });
}

function saveToBasketItemsStorage(element: Element): void {
    const nameOfProduct: string = element.querySelector(`.${ITEM_NAME}`)?.textContent || EMPTY;
    if (nameOfProduct !== EMPTY && basketItemsStorage.includes(nameOfProduct)) {
        const index = basketItemsStorage.indexOf(nameOfProduct);
        basketItemsStorage.splice(index, ONE);
    } else {
        if (basketItemsStorage.length === TWENTY) {
            showAttention();
            element.querySelector(`.${ADDED_CONTAINER}`)?.classList.toggle(BASKET);
        } else {
            basketItemsStorage.push(nameOfProduct);
        }
    }
    saveToLocalStorage(BASKET_ITEMS, basketItemsStorage.join(SEPARATOR));
}

export function addToBasket(): void {
    elementDomStorage.get(ITEMS_CONTAINER)?.forEach((container) => {
        container.addEventListener(CLICK, (e) => {
            const clickedElement = (e.target as Element).closest(`.${ITEM_CONTAINER}`) as Element;
            if (clickedElement) {
                clickedElement.querySelector(`.${ADDED_CONTAINER}`)?.classList.toggle(BASKET);
                saveToBasketItemsStorage(clickedElement);
                const items = countItemsInBasket();
                renderBasket(items);
            }
        });
    });
}

export function resetButtonListeners(target: string, eventType: string, data: DataObject[]): void {
    elementDomStorage.get(target)?.forEach((el) =>
        el.addEventListener(eventType, () => {
            if (target === RESET_FILTERS) {
                resetFilters(data);
            } else if (target === RESET_SETTINGS) {
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
    basketItemsStorage.splice(ZERO, basketItemsStorage.length);
    removeFromLocalStorage(BASKET_ITEMS);
}

export function resetCheckboxes(): void {
    elementDomStorage.get(INPUT)?.forEach((el) => {
        (el as HTMLInputElement).checked = false;
    });
    [INPUT_MAKE, INPUT_BRAKES, INPUT_COLOR].forEach((el) => {
        removeFromLocalStorage(el);
    });
}

function resetPopular(): void {
    elementDomStorage.get(CHECKED_IMG)?.forEach((el) => el.classList.add(HIDE));
    removeFromLocalStorage(POPULAR);
}

function resetRangeFilters(data: DataObject[]): void {
    const parentDiv = elementDomStorage.get(FILTER_RANGE)?.slice(ZERO, ONE)[ZERO] as HTMLElement;
    if (parentDiv) {
        [AGE, WHEEL, PRICE, ITEMS].forEach((filter) => {
            elementDomStorage.get(`${filter}-${FILTER}`)?.forEach((el) => {
                el.remove();
                elementDomStorage.delete(`${filter}-${FILTER}`);
            });
            removeFromLocalStorage(`${filter}-${INPUT}`);
        });
        createRangeFilter(parentDiv, data, AGE, PRODUCTION_YEAR);
        createRangeFilter(parentDiv, data, WHEEL, WHEEL_SIZE);
        createRangeFilter(parentDiv, data, PRICE, PRICE);
        createRangeFilter(parentDiv, data, ITEMS, QUANTITY);
    }
}

function resetSearch(): void {
    elementDomStorage.get(INPUT_SEARCH)?.forEach((el) => ((el as HTMLInputElement).value = EMPTY));
    removeFromLocalStorage(SEARCH);
}

function resetSorting(): void {
    elementDomStorage.get(SORTING_DROPLIST)?.forEach((el) => ((el as HTMLSelectElement).selectedIndex = ZERO));
    basketItemsStorage.splice(ZERO, basketItemsStorage.length);
    removeFromLocalStorage(SORT);
    const items = countItemsInBasket();
    renderBasket(items);
}

export function addEventListenerSpoiler(elementClass: string, eventType: string, targets: [string, string][]): void {
    elementDomStorage.get(elementClass)?.forEach((element) => {
        element.addEventListener(eventType, () => {
            targets.forEach((target) => {
                element
                    .closest(`.${SPOILER}`)
                    ?.querySelectorAll(`.${target[ZERO]}`)
                    .forEach((el) => {
                        el.classList.toggle(target[ONE]);
                    });
            });
        });
    });
}

export function addEventListenerTemplate(
    elementClass: string,
    eventType: string,
    targets: [string, string][],
    data: DataObject[]
): void {
    elementDomStorage.get(elementClass)?.forEach((element) => {
        element.addEventListener(eventType, () => {
            targets.forEach((target) => {
                element?.querySelectorAll(`.${target[ZERO]}`).forEach((el) => {
                    el.classList.toggle(target[ONE]);
                    if (elementClass === POPULAR_CHECKBOX) {
                        if (el.classList.contains(HIDE)) {
                            saveToLocalStorage(POPULAR, FALSE);
                        } else {
                            saveToLocalStorage(POPULAR, TRUE);
                        }
                    }
                });
            });
            const filteredData = applyAll(data);
            renderItems(filteredData);
        });
    });
}
