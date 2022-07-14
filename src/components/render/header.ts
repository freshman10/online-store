import { createElement } from './generateElement';
import logo from '../../assets/img/logo.jpg';
import { getFromLocalStorage } from '../controller/localStorage';

export function renderHeader(): void {
    const header: HTMLElement = createElement('header', document.body, ['header']);
    const logoContainer: HTMLElement = createElement('div', header, ['logo-container']);
    createElement('img', logoContainer, ['logo-img'], '', [
        ['alt', 'logo'],
        ['src', logo],
    ]);
    createElement('h1', logoContainer, ['shop-label'], 'Online Bicycle Store');
    const shopBinContainer: HTMLElement = createElement('div', header, ['bin-container']);
    const basketItems = getFromLocalStorage('basketItems');
    let itemsNumber = 0;
    if (basketItems) {
        itemsNumber = basketItems.split('+++').length;
    }
    createElement('p', shopBinContainer, ['bin-counter'], itemsNumber.toString());
}
