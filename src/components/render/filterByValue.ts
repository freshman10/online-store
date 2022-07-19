import { createElement } from './generateElement';
import { DataObject } from '../../constants/types';
import { ALT, BRAKES, BRAKES_SMALL, CHECKED_IMG, COLOR, COLOR_SMALL, COMPANY, DIV, EMPTY, FILTER, FILTER_BY_VALUE, FILTER_CAPTION, FILTER_VALUE, GREEN_TICK, H2, H3, HIDE, IMG, MAKE, P, POPULAR_CHECKBOX, POPULAR_CONTAINER, POPULAR_LABEL, SHOW_POPULAR, SPOILER, SRC, STRING, TICK_PATH } from '../../constants/constants';

function createPopularFilter(parentElement: HTMLElement): void {
    const container = createElement(DIV, parentElement, [POPULAR_CONTAINER]);
    createElement(H3, container, [POPULAR_LABEL], SHOW_POPULAR);
    const populatCheckbox = createElement(DIV, container, [POPULAR_CHECKBOX]);
    createElement(IMG, populatCheckbox, [CHECKED_IMG, HIDE], EMPTY, [
        [SRC, TICK_PATH],
        [ALT, GREEN_TICK],
    ]);
}

export function renderFilterByValue(parentElement: HTMLElement, data: DataObject[]): void {
    const filterByValue: HTMLElement = createElement(DIV, parentElement, [FILTER_VALUE, FILTER]);
    createElement(H2, filterByValue, [FILTER_CAPTION], FILTER_BY_VALUE);
    createSpoiler(filterByValue, COMPANY, data, MAKE);
    createSpoiler(filterByValue, BRAKES, data, BRAKES_SMALL);
    createSpoiler(filterByValue, COLOR, data, COLOR_SMALL);
    createPopularFilter(filterByValue);
}

function createSpoiler(parentElement: HTMLElement, name: string, data: DataObject[], fieldName: string): void {
    const spoilerContainer = createElement(DIV, parentElement, [SPOILER]);
    const headerContainer = createElement(DIV, spoilerContainer, ['input-header-container']);
    createElement(P, headerContainer, ['spoiler-triangle'], '►');
    createElement(H3, headerContainer, ['filter-option'], name);
    const form = createElement('form', spoilerContainer, ['spoiler-form', 'invisible']);
    const inputs = getUnique(fieldName, data);
    inputs.forEach((inputText) => {
        const inputContainer = createElement('div', form, ['input-container']);
        createElement('input', inputContainer, ['input', `input-${fieldName}`], '', [
            ['value', inputText],
            ['type', 'checkbox'],
            ['id', `${fieldName}-${inputText}`],
        ]);
        createElement('label', inputContainer, ['input-label'], inputText, [['for', `${fieldName}-${inputText}`]]);
    });
}

export function getUnique(fieldName: string, data: DataObject[]): string[] {
    if (fieldName && data && typeof fieldName === STRING && Array.isArray(data)) {
        return [...new Set(data.map((el: DataObject) => el[fieldName as keyof typeof el] as string))];
    }
    return [];
}
