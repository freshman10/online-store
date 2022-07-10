export const elementDomStorage = new Map<string, HTMLElement[]>();

export function addToDOMStorage(element: HTMLElement): void {
    element.classList.forEach((cls) => {
        if (elementDomStorage.has(cls)) {
            elementDomStorage.get(cls)?.push(element);
        } else {
            elementDomStorage.set(cls, [element]);
        }
    });
}

export function createElement(
    type: string,
    parentElement: HTMLElement,
    classes?: string[],
    text?: string,
    attributes?: [string, string][]
): HTMLElement {
    const element: HTMLElement = document.createElement(type);
    if (classes) {
        element.classList.add(...classes);
    }
    element.textContent = text || '';
    if (attributes) {
        for (let i = 0; i < attributes.length; i++) {
            element.setAttribute(...attributes[i]);
        }
    }
    parentElement.appendChild(element);
    addToDOMStorage(element);
    return element;
}
