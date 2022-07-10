import { createElement } from './generateElement';
import logo from '../../assets/img/logo.jpg';

export function renderHeader(): void {
    const header: HTMLElement = createElement('header', document.body, ['header']);
    const logoContainer: HTMLElement = createElement('div', header, ['logo-container']);
    createElement('img', logoContainer, ['logo-img'], '', [
        ['alt', 'logo'],
        ['src', logo],
    ]);
    createElement('h1', logoContainer, ['shop-label'], 'Online Bicycle Store');
    const shopBinContainer: HTMLElement = createElement('div', header, ['bin-container']);
    createElement('p', shopBinContainer, ['bin-counter'], '0');
}
