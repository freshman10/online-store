import {
    ADDED_CONTAINER,
    ADDED_TEXT,
    ADDED_TO_CART,
    ATTENTION,
    BASKET,
    basketItemsStorage,
    DESCRIPTION,
    DIV,
    H1,
    H3,
    IMG,
    ITEMS_CONTAINER,
    ITEM_CONTAINER,
    ITEM_IMG,
    ITEM_NAME,
    NO,
    P,
    SORRY_NO_PRODUCTS,
    SRC,
    YES,
} from '../../constants/constants';
import { DataObject } from '../../constants/types';
import { addToDOMStorage, createElement, elementDomStorage } from './generateElement';

function createCard(data: DataObject): HTMLElement {
    const container = document.createElement(DIV);
    container.classList.add(ITEM_CONTAINER);
    addToDOMStorage(container);
    createElement(H3, container, [ITEM_NAME], data.name);
    require(`../../assets/img/${data.img}`);
    createElement(IMG, container, [ITEM_IMG], '', [[SRC, `./assets/img/${data.img}`]]);
    createElement(P, container, [DESCRIPTION], `Production year: ${data.age}`);
    createElement(P, container, [DESCRIPTION], `Company: ${data.make}`);
    createElement(P, container, [DESCRIPTION], `Quantity: ${data.items}`);
    createElement(P, container, [DESCRIPTION], `Color: ${data.color}`);
    createElement(P, container, [DESCRIPTION], `Wheel: ${data.wheel}`);
    createElement(P, container, [DESCRIPTION], `Brakes: ${data.brakes}`);
    createElement(P, container, [DESCRIPTION], `Price: ${data.price}`);
    createElement(P, container, [DESCRIPTION], `Popular: ${data.popular ? YES : NO}`);
    const addedContainer: HTMLElement = createElement(DIV, container, [ADDED_CONTAINER, BASKET]);
    if (basketItemsStorage.includes(data.name)) {
        addedContainer.classList.remove(BASKET);
    }
    createElement(P, addedContainer, [ADDED_TEXT], ADDED_TO_CART);
    return container;
}

export function renderItems(data: DataObject[]): void {
    const parentElement = elementDomStorage.get(ITEMS_CONTAINER);
    parentElement?.forEach((el) => {
        el.innerHTML = '';
        if (!data.length) {
            emptyData(el);
        }
        data.forEach((item) => el.appendChild(createCard(item)));
    });
}

function emptyData(parentElement: HTMLElement): void {
    createElement(H1, parentElement, [ATTENTION], SORRY_NO_PRODUCTS);
}
