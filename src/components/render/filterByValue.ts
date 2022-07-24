import { createElement } from './generateElement';
import { DataObject } from '../../constants/types';
import {
    ALT,
    BRAKES,
    BRAKES_SMALL,
    CHECKBOX,
    CHECKED_IMG,
    COLOR,
    COLOR_SMALL,
    COMPANY,
    DIV,
    EMPTY,
    FILTER,
    FILTER_BY_VALUE,
    FILTER_CAPTION,
    FILTER_OPTION,
    FILTER_VALUE,
    FOR,
    FORM,
    GREEN_TICK,
    H2,
    H3,
    HIDE,
    ID,
    IMG,
    INPUT,
    INPUT_CONTAINER,
    INPUT_HEADER_CONTAINER,
    INPUT_LABEL,
    INVISIBLE,
    LABEL,
    MAKE,
    P,
    POPULAR_CHECKBOX,
    POPULAR_CONTAINER,
    POPULAR_LABEL,
    SHOW_POPULAR,
    SPOILER,
    SPOILER_FORM,
    SPOILER_TRIANGLE,
    SRC,
    STRING,
    TICK_PATH,
    TRIANGLE_RIGHT,
    TYPE,
    VALUE,
} from '../../constants/constants';

function createPopularFilter(parentElement: HTMLElement): void {
    const container = createElement(DIV, parentElement, [POPULAR_CONTAINER]);
    createElement(H3, container, [POPULAR_LABEL], SHOW_POPULAR);
    const popularCheckbox = createElement(DIV, container, [POPULAR_CHECKBOX]);
    createElement(IMG, popularCheckbox, [CHECKED_IMG, HIDE], EMPTY, [
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
    const headerContainer = createElement(DIV, spoilerContainer, [INPUT_HEADER_CONTAINER]);
    createElement(P, headerContainer, [SPOILER_TRIANGLE], TRIANGLE_RIGHT);
    createElement(H3, headerContainer, [FILTER_OPTION], name);
    const form = createElement(FORM, spoilerContainer, [SPOILER_FORM, INVISIBLE]);
    const inputs = getUnique(fieldName, data);
    inputs.forEach((inputText) => {
        const inputContainer = createElement(DIV, form, [INPUT_CONTAINER]);
        createElement(INPUT, inputContainer, [INPUT, `${INPUT}-${fieldName}`], EMPTY, [
            [VALUE, inputText],
            [TYPE, CHECKBOX],
            [ID, `${fieldName}-${inputText}`],
        ]);
        createElement(LABEL, inputContainer, [INPUT_LABEL], inputText, [[FOR, `${fieldName}-${inputText}`]]);
    });
}

export function getUnique(fieldName: string, data: DataObject[]): string[] {
    if (fieldName && data && typeof fieldName === STRING && Array.isArray(data)) {
        return [...new Set(data.map((el: DataObject) => el[fieldName as keyof typeof el] as string))];
    }
    return [];
}
