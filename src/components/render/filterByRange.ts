import { DataObject } from '../types';
import { createElement } from './generateElement';
import * as noUiSlider from 'nouislider';
import { applyAll } from '../filters/applyAllFilters';
import { renderItems } from './items';

function getMinMax(data: DataObject[], field: string): number[] {
    const storage = new Set<number>();
    data.forEach((el) => storage.add(el[field as keyof typeof el] as number));
    return [Math.min(...storage), Math.max(...storage)];
}

function createRangeFilter(
    parentElement: HTMLElement,
    data: DataObject[],
    field: string,
    label: string,
    step = 1
): void {
    const container: HTMLElement = createElement('div', parentElement, [`${field}-filter`]);
    createElement('h3', container, [`${field}-label`], label);
    const sliderAndInputs: HTMLElement = createElement('div', container, ['slider-input']);
    const inputFrom = createElement('input', sliderAndInputs, [`${field}-input`, 'from', 'input'], '', [
        ['type', 'number'],
    ]) as HTMLInputElement;
    const sliderContainer: noUiSlider.target = createElement('div', sliderAndInputs, ['slider']);
    const inputTo = createElement('input', sliderAndInputs, [`${field}-input`, 'to', 'input'], '', [
        ['type', 'number'],
    ]) as HTMLInputElement;
    const [min, max] = getMinMax(data, field);
    noUiSlider.create(sliderContainer, {
        start: [min, max],
        connect: true,
        range: {
            min: min,
            max: max,
        },
        behaviour: 'drag',
        step: step,
        format: {
            to: function (value) {
                return value;
            },
            from: function (value) {
                return Number(value.replace(',-', ''));
            },
        },
    });
    [inputFrom, inputTo].forEach((el) => {
        el.addEventListener('change', function () {
            sliderContainer.noUiSlider?.set([inputFrom.valueAsNumber, inputTo.valueAsNumber]);
            const filtered = applyAll(data);
            renderItems(filtered);
        });
    });
    sliderContainer.noUiSlider?.on('update', function (values, handle) {
        inputFrom.value = values[0] as string;
        inputTo.value = values[1] as string;
        const filtered = applyAll(data);
        renderItems(filtered);
    });
}

export function renderFilterByRange(parentElement: HTMLElement, data: DataObject[]): void {
    const filterByRange: HTMLElement = createElement('div', parentElement, ['filter-range', 'filter']);
    createElement('h2', filterByRange, ['filter-caption'], 'Filters by range');
    createRangeFilter(filterByRange, data, 'age', 'Production year');
    createRangeFilter(filterByRange, data, 'wheel', 'Wheel size');
    createRangeFilter(filterByRange, data, 'price', 'Price');
    createRangeFilter(filterByRange, data, 'items', 'Quantity');
}
