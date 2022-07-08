import logo from '../assets/img/logo.jpg';
import bin from '../assets/img/bin.png';

const elementDomStorage = new Map<string, HTMLElement[]>();

function addToDOMStorage(element: HTMLElement): void {
    element.classList.forEach((cls) => {
        if (elementDomStorage.has(cls)) {
            elementDomStorage.get(cls)?.push(element);
        } else {
            elementDomStorage.set(cls, [element]);
        }
    });
}

function createElement(
    type: string,
    parentElement: HTMLElement,
    classes?: string[],
    text?: string,
    attributes?: [string, string][]
): HTMLElement {
    const element: HTMLElement = document.createElement(type);
    if (classes) {
        element.classList.add(...classes);
    }
    element.textContent = text || '';
    if (attributes) {
        for (let i = 0; i < attributes.length; i++) {
            element.setAttribute(...attributes[i]);
        }
    }
    parentElement.appendChild(element);
    addToDOMStorage(element);
    return element;
}

export function buildPage(): void {
    const header: HTMLElement = createElement('header', document.body, ['header']);
    const logoContainer: HTMLElement = createElement('div', header, ['logo-container']);
    const logoElement: HTMLElement = createElement('img', logoContainer, ['logo-img'], '', [
        ['alt', 'logo'],
        ['src', logo],
    ]);
    const onlineStoreLabel: HTMLElement = createElement('h1', logoContainer, ['shop-label'], 'Online Bicycle Store');
    const shopBinContainer: HTMLElement = createElement('div', header, ['bin-container']);
    const binCounter: HTMLElement = createElement('p', shopBinContainer, ['bin-counter'], '0');
    const main: HTMLElement = createElement('main', document.body, ['main']);
    const filtersContainer: HTMLElement = createElement('div', main, ['filter-container']);
    const filterByValue: HTMLElement = createElement('div', filtersContainer, ['filter-value']);
    const filterByRange: HTMLElement = createElement('div', filtersContainer, ['filter-range']);
    const filterBySearch: HTMLElement = createElement('div', filtersContainer, ['filter-search']);
}
