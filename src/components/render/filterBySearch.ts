import { createElement } from './generateElement';
import {
    reserButtons,
    INPUT,
    EMPTY,
    INPUT_SEARCH,
    TYPE,
    SEARCH,
    PLACEHOLDER,
    DOTS,
    DIV,
    SORTING_CONTAINER,
    H2,
    SORTING_LABEL,
    SORT_BY,
    SELECT,
    SORTING_DROPLIST,
    DROPDOWN,
    OPTION,
    SORTING_OPTION,
    VALUE,
    SORT,
    FILTER,
    FILTER_SEARCH,
    FILTER_CAPTION,
    RESET_CONTAINER,
    BUTTON,
    RESET,
    RESET_BUTTON,
    RESET_BIG,
} from '../../constants/constants';
import { getFromLocalStorage } from '../controller/localStorage';
import { sortingTypes } from '../../constants/types';

function createSearchInput(parentElement: HTMLElement): void {
    const searchField = createElement(INPUT, parentElement, [INPUT_SEARCH], EMPTY, [
        [TYPE, SEARCH],
        [PLACEHOLDER, DOTS],
    ]);
    searchField.focus();
}

function createSortingList(parentElement: HTMLElement, items: string[]): void {
    const container: HTMLElement = createElement(DIV, parentElement, [SORTING_CONTAINER]);
    createElement(H2, container, [SORTING_LABEL], SORT_BY);
    const dropDownList: HTMLElement = createElement(SELECT, container, [SORTING_DROPLIST, DROPDOWN]);
    items
        .filter((key) => key.length > 1)
        .forEach((item) => {
            createElement(OPTION, dropDownList, [SORTING_OPTION], item, [[VALUE, item]]);
        });
    const activeItem = getFromLocalStorage(SORT);
    if (activeItem) {
        (dropDownList as HTMLSelectElement).selectedIndex = Number(activeItem);
    }
}

export function renderFilterBySearch(parentElement: HTMLElement): void {
    const filterBySearch: HTMLElement = createElement(DIV, parentElement, [FILTER_SEARCH, FILTER]);
    createElement(H2, filterBySearch, [FILTER_CAPTION], SEARCH);
    createSearchInput(filterBySearch);
    createSortingList(filterBySearch, Object.keys(sortingTypes) as string[]);
    const buttonsContainer = createElement(DIV, filterBySearch, [RESET_CONTAINER]);
    reserButtons.forEach((btn) => {
        createElement(BUTTON, buttonsContainer, [`${RESET}-${btn}`, RESET_BUTTON], `${RESET_BIG} ${btn}`);
    });
}
