import { createElement } from '../generateElement';

export function renderFilterBySearch(parentElement: HTMLElement): void {
    const filterBySearch: HTMLElement = createElement('div', parentElement, ['filter-search']);
    const filterSearchCaption: HTMLElement = createElement('h2', filterBySearch, ['filter-caption'], 'Search');
}
