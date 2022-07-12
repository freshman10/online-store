import { createElement, elementDomStorage } from './generateElement';

export function renderWarning(): void {
    const warningContainer = createElement('div', document.body, ['warning-container', 'hide']);
    createElement('p', warningContainer, ['warning-message'], 'Sorry. All available slots are exhausted.');
    createElement('button', warningContainer, ['warning-button', 'reset-button'], 'No problem. Got it.');
    createElement('div', document.body, ['background-layer', 'hide']);
    addEventListenerWarning();
}

function addEventListenerWarning() {
    elementDomStorage.get('background-layer')?.forEach((el) => {
        hideWarning(el);
    });
    elementDomStorage.get('warning-button')?.forEach((el) => {
        hideWarning(el);
    });
}

function hideWarning(element: HTMLElement): void {
    element.addEventListener('click', () => {
        elementDomStorage.get('warning-container')?.forEach((el) => {
            el.classList.add('hide');
        });
        elementDomStorage.get('background-layer')?.forEach((el) => {
            el.classList.add('hide');
        });
    });
}
