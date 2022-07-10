import { createElement } from './generateElement';
import { sortingTypes, reserButtons } from '../../constants/constants';

function createSearchInput(parentElement: HTMLElement): void {
    createElement('input', parentElement, ['input-search'], '', [['type', 'search']]);
}

function createSortingList(parentElement: HTMLElement, items: string[]): void {
    const container: HTMLElement = createElement('div', parentElement, ['sorting-container']);
    createElement('h2', container, ['sorting-label'], 'Sort by');
    const dropDownList: HTMLElement = createElement('select', container, ['sorting-droplist']);
    items.forEach((item) => {
        createElement('option', dropDownList, ['sorting-option'], item, [['value', item]]);
    });
}

export function renderFilterBySearch(parentElement: HTMLElement): void {
    const filterBySearch: HTMLElement = createElement('div', parentElement, ['filter-search', 'filter']);
    createElement('h2', filterBySearch, ['filter-caption'], 'Search');
    createSearchInput(filterBySearch);
    createSortingList(filterBySearch, sortingTypes);
    const buttonsContainer = createElement('div', filterBySearch, ['reset-container']);
    reserButtons.forEach((btn) => {
        createElement('button', buttonsContainer, [`reset-${btn}`, 'reset-button'], `Reset ${btn}`);
    });
}