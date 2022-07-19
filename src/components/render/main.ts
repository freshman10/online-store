import { createElement } from './generateElement';
import { renderFilterByValue } from './filterByValue';
import { renderFilterByRange } from './filterByRange';
import { renderFilterBySearch } from './filterBySearch';
import { renderItems } from './items';
import { DataObject } from '../../constants/types';
import { applyAll } from '../filters/applyAllFilters';
import { renderWarning } from './warning';
import { applyLocalStorage } from '../controller/localStorage';
import { DIV, FILTER_CONTAINER, ITEMS_CONTAINER, MAIN } from '../../constants/constants';

export function renderMain(data: DataObject[]): void {
    const main: HTMLElement = createElement(MAIN, document.body, [MAIN]);
    const filtersContainer: HTMLElement = createElement(DIV, main, [FILTER_CONTAINER]);
    renderFilterByValue(filtersContainer, data);
    renderFilterByRange(filtersContainer, data);
    renderFilterBySearch(filtersContainer);
    createElement(DIV, main, [ITEMS_CONTAINER]);
    applyLocalStorage(data);
    renderItems(applyAll(data));
    renderWarning();
}
