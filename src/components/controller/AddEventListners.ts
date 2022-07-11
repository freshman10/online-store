import { applyAll } from '../filters/applyAllFilters';
import { elementDomStorage } from '../render/generateElement';
import { renderItems } from '../render/items';
import { DataObject } from '../types';

function countItemsInBasket(): number {
    return (
        elementDomStorage
            .get('added-container')
            ?.reduce((acc, el) => (el.classList.contains('basket') ? acc : (acc += 1)), 0) || 0
    );
}

function renderBasket(items: number): void {
    elementDomStorage.get('bin-counter')?.forEach((el) => (el.textContent = items.toString()));
}

export function addToBasket(): void {
    elementDomStorage.get('items-container')?.forEach((container) => {
        container.addEventListener('click', (e) => {
            const clickedElement = (e.target as Element).closest('.item-container') as Element;
            if (clickedElement) {
                clickedElement.querySelector('.added-container')?.classList.toggle('basket');
                const items = countItemsInBasket();
                renderBasket(items);
            }
        });
    });
}

function removeChecked(elements: HTMLElement[], element: HTMLElement, classToRemove: string): void {
    elements.forEach((el) => {
        if (el !== element) {
            el.classList.remove(classToRemove);
        }
    });
}

export function checkBoxListners(
    elementClass: string,
    eventType: string,
    addedClass: string,
    data: DataObject[]
): void {
    elementDomStorage.get(elementClass)?.forEach((el) => {
        el.addEventListener(eventType, () => {
            if (addedClass === 'hide') {
                elementDomStorage.get('checked-img')?.slice(0, 1)[0].classList.toggle('hide');
            } else {
                el.classList.add(addedClass);
                removeChecked(elementDomStorage.get(elementClass)!, el, addedClass);
            }
            const filtered = applyAll(data);
            renderItems(filtered);
        });
    });
}
