import { createElement, elementDomStorage } from './generateElement';
import { renderFilterByValue } from './filterByValue';
import { renderFilterByRange } from './filterByRange';
import { renderFilterBySearch } from './filterBySearch';
import { renderItems } from './items';
import { DataObject } from '../types';
import { applyAll } from '../filters/applyAllFilters';
import { renderWarning } from './warning';

export function renderMain(data: DataObject[]): void {
    const main: HTMLElement = createElement('main', document.body, ['main']);
    const filtersContainer: HTMLElement = createElement('div', main, ['filter-container']);
    renderFilterByValue(filtersContainer, data);
    renderFilterByRange(filtersContainer, data);
    renderFilterBySearch(filtersContainer);
    createElement('div', main, ['items-container']);
    renderItems(applyAll(data));
    renderWarning();
}
