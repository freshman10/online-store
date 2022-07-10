import { elementDomStorage } from '../render/generateElement';

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
