import { createElement } from '../generateElement';

export function renderFilterByRange(parentElement: HTMLElement): void {
    const filterByRange: HTMLElement = createElement('div', parentElement, ['filter-range']);
    const filterByRangeCaption: HTMLElement = createElement(
        'h2',
        filterByRange,
        ['filter-caption'],
        'Filters by range'
    );
}
