import { createElement } from '../generateElement';
import { renderFilterByValue } from '../filterByValue/filterByValue';
import { renderFilterByRange } from '../filterByRange/filterByRange';
import { renderFilterBySearch } from '../filterBySearch/filterBySearch';
import { renderItems } from '../items/items';
import { DataObject } from '../../types';

export function renderMain(data: DataObject[]): void {
    const main: HTMLElement = createElement('main', document.body, ['main']);
    const filtersContainer: HTMLElement = createElement('div', main, ['filter-container']);
    renderFilterByValue(filtersContainer, data);
    renderFilterByRange(filtersContainer, data);
    renderFilterBySearch(filtersContainer, data);
    const itemsContainer = createElement('div', main, ['items-container']);
    renderItems(itemsContainer, data);
}
