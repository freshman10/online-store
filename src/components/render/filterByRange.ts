import { DataObject } from '../../constants/types';
import { createElement } from './generateElement';
import * as noUiSlider from 'nouislider';
import { applyAll } from '../filters/applyAllFilters';
import { renderItems } from './items';
import { getFromLocalStorage, saveToLocalStorage } from '../controller/localStorage';
import {
    AGE,
    CHANGE,
    COMMA_SLASH,
    DIV,
    DRAG,
    EMPTY,
    FILTER,
    FILTER_BY_RANGE,
    FILTER_CAPTION,
    FILTER_RANGE,
    FROM,
    H2,
    H3,
    INPUT,
    ITEMS,
    LABEL,
    NUMBER,
    ONE,
    PRICE,
    PRICE_BIG,
    PRODUCTION_YEAR,
    QUANTITY,
    SEPARATOR,
    SLIDER,
    SLIDER_INPUT,
    TO,
    TYPE,
    UPDATE,
    WHEEL,
    WHEEL_SIZE,
    ZERO,
} from '../../constants/constants';

function getMinMax(data: DataObject[], field: string): number[] {
    const storage = new Set<number>();
    data.forEach((el) => storage.add(el[field as keyof typeof el] as number));
    return [Math.min(...storage), Math.max(...storage)];
}

export function createRangeFilter(
    parentElement: HTMLElement,
    data: DataObject[],
    field: string,
    label: string,
    step = ONE
): void {
    let counter = ZERO;
    const container: HTMLElement = createElement(DIV, parentElement, [`${field}-${FILTER}`]);
    createElement(H3, container, [`${field}-${LABEL}`], label);
    const sliderAndInputs: HTMLElement = createElement(DIV, container, [SLIDER_INPUT]);
    const inputFrom = createElement(INPUT, sliderAndInputs, [`${field}-${INPUT}`, FROM, INPUT], EMPTY, [
        [TYPE, NUMBER],
    ]) as HTMLInputElement;
    const sliderContainer: noUiSlider.target = createElement(DIV, sliderAndInputs, [SLIDER]);
    const inputTo = createElement(INPUT, sliderAndInputs, [`${field}-${INPUT}`, TO, INPUT], EMPTY, [
        [TYPE, NUMBER],
    ]) as HTMLInputElement;
    const [min, max] = getMinMax(data, field);
    const Slider = noUiSlider.create(sliderContainer, {
        start: [min, max],
        connect: true,
        range: {
            min: min,
            max: max,
        },
        behaviour: DRAG,
        step: step,
        format: {
            to: function (value) {
                return value;
            },
            from: function (value) {
                return Number(value.replace(COMMA_SLASH, EMPTY));
            },
        },
    });
    [inputFrom, inputTo].forEach((el) => {
        el.addEventListener(CHANGE, function () {
            sliderContainer.noUiSlider?.set([inputFrom.valueAsNumber, inputTo.valueAsNumber]);
            saveToLocalStorage(`${field}-${INPUT}`, `${inputFrom.value}${SEPARATOR}${inputTo.value}`);
            const filtered = applyAll(data);
            renderItems(filtered);
        });
    });
    sliderContainer.noUiSlider?.on(UPDATE, function (values) {
        if (values[ZERO] != inputFrom.value || values[ONE] != inputTo.value) {
            inputFrom.value = values[ZERO] as string;
            inputTo.value = values[ONE] as string;
            if (counter !== ZERO) {
                saveToLocalStorage(`${field}-${INPUT}`, `${inputFrom.value}${SEPARATOR}${inputTo.value}`);
            }
            const filtered = applyAll(data);
            renderItems(filtered);
            counter++;
        }
    });
    const localMinMax = getFromLocalStorage(`${field}-${INPUT}`);
    if (localMinMax) {
        const minMaxArray: number[] = localMinMax.split(SEPARATOR).map((el) => Number(el));
        Slider.set(minMaxArray);
    }
}

export function renderFilterByRange(parentElement: HTMLElement, data: DataObject[]): void {
    const filterByRange: HTMLElement = createElement(DIV, parentElement, [FILTER_RANGE, FILTER]);
    createElement(H2, filterByRange, [FILTER_CAPTION], FILTER_BY_RANGE);
    createRangeFilter(filterByRange, data, AGE, PRODUCTION_YEAR);
    createRangeFilter(filterByRange, data, WHEEL, WHEEL_SIZE);
    createRangeFilter(filterByRange, data, PRICE, PRICE_BIG);
    createRangeFilter(filterByRange, data, ITEMS, QUANTITY);
}
