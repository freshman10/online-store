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

function addEventListenerWarning() {
    elementDomStorage.get(BACKGROUND_LAYER)?.forEach((el) => {
        hideWarning(el);
    });
    elementDomStorage.get(WARNING_BUTTON)?.forEach((el) => {
        hideWarning(el);
    });
}

function hideWarning(element: HTMLElement): void {
    element.addEventListener(CLICK, () => {
        elementDomStorage.get(WARNING_CONTAINER)?.forEach((el) => {
            el.classList.add(HIDE);
        });
        elementDomStorage.get(BACKGROUND_LAYER)?.forEach((el) => {
            el.classList.add(HIDE);
        });
    });
}
