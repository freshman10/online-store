import { createElement } from './generateElement';
import { DataObject } from '../types';

function createPopularFilter(parentElement: HTMLElement): void {
    const container = createElement('div', parentElement, ['popular-container']);
    createElement('h3', container, ['popular-label'], 'Show popular:');
    const populatCheckbox = createElement('div', container, ['popular-checkbox']);
    createElement('img', populatCheckbox, ['checked-img', 'hide'], '', [
        ['src', './assets/img/tick.png'],
        ['alt', 'green tick'],
    ]);
}

export function renderFilterByValue(parentElement: HTMLElement, data: DataObject[]): void {
    const filterByValue: HTMLElement = createElement('div', parentElement, ['filter-value', 'filter']);
    createElement('h2', filterByValue, ['filter-caption'], 'Filters by value');
    createSpoiler(filterByValue, 'Company', data, 'make');
    createSpoiler(filterByValue, 'Brakes', data, 'brakes');
    createSpoiler(filterByValue, 'Color', data, 'color');
    createPopularFilter(filterByValue);
}

function createSpoiler(parentElement: HTMLElement, name: string, data: DataObject[], fieldName: string): void {
    const spoilerContainer = createElement('div', parentElement, ['spoiler']);
    const headerContainer = createElement('div', spoilerContainer, ['input-header-container']);
    createElement('p', headerContainer, ['spoiler-triangle'], '►');
    createElement('h3', headerContainer, ['filter-option'], name);
    const form = createElement('form', spoilerContainer, ['spoiler-form', 'invisible']);
    const inputs = getSetFromData(fieldName, data);
    inputs.forEach((inputText) => {
        const inputContainer = createElement('div', form, ['input-container']);
        const input = createElement('input', inputContainer, ['input', `input-${fieldName}`], '', [
            ['value', inputText],
            ['type', 'checkbox'],
            ['id', `${fieldName}-${inputText}`],
        ]);
        createElement('label', inputContainer, ['input-label'], inputText, [['for', `${fieldName}-${inputText}`]]);
    });
}

function getSetFromData(fieldName: string, data: DataObject[]): string[] {
    return [...new Set(data.map((el: DataObject) => el[fieldName as keyof typeof el] as string))];
}
