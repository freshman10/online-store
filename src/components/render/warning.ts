import {
    BACKGROUND_LAYER,
    BUTTON,
    CLICK,
    DIV,
    HIDE,
    NO_PROBLEM,
    P,
    RESET_BUTTON,
    SORRY,
    WARNING_BUTTON,
    WARNING_CONTAINER,
    WARNING_MESSAGE,
} from '../../constants/constants';
import { createElement, elementDomStorage } from './generateElement';

export function renderWarning(): void {
    const warningContainer = createElement(DIV, document.body, [WARNING_CONTAINER, HIDE]);
    createElement(P, warningContainer, [WARNING_MESSAGE], SORRY);
    createElement(BUTTON, warningContainer, [WARNING_BUTTON, RESET_BUTTON], NO_PROBLEM);
    createElement(DIV, document.body, [BACKGROUND_LAYER, HIDE]);
    addEventListenerWarning();
}

function hideElement(target: string): void {
    elementDomStorage.get(target)?.forEach((el) => {
        hideWarning(el);
    });
}

function addEventListenerWarning() {
    [BACKGROUND_LAYER, WARNING_BUTTON].forEach((el) => hideElement(el));
}

function addClass(target: string, className: string): void {
    elementDomStorage.get(target)?.forEach((el) => {
        el.classList.add(className);
    });
}

function hideWarning(element: HTMLElement): void {
    element.addEventListener(CLICK, () => {
        [WARNING_CONTAINER, BACKGROUND_LAYER].forEach((el) => addClass(el, HIDE));
    });
}
