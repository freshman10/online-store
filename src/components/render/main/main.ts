import { createElement } from '../generateElement';
import { renderFilterByValue } from '../filterByValue/filterByValue';
import { DataObject } from '../../types';

export function renderMain(data: DataObject[]): void {
    const main: HTMLElement = createElement('main', document.body, ['main']);
    const filtersContainer: HTMLElement = createElement('div', main, ['filter-container']);
    renderFilterByValue(filtersContainer, data);
}
