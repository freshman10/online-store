import { resetCheckboxes } from '../controller/AddEventListeners';
import { removeFromLocalStorage, saveFromMap } from '../controller/localStorage';
import { elementDomStorage } from '../render/generateElement';
import { DataObject } from '../../constants/types';
import { DASH, INPUT, INPUT_BRAKES, INPUT_COLOR, INPUT_MAKE, MINUS_ONE, ONE, ZERO } from '../../constants/constants';

export function filterCheckbox(data: DataObject[]): DataObject[] {
    const mapFilters = new Map<string, string[]>();
    elementDomStorage.get(INPUT)?.forEach((el) => {
        const input = el as HTMLInputElement;
        const inputClass = [...input.classList].slice(MINUS_ONE)[ZERO];
        if (input.checked) {
            addToMap(mapFilters, inputClass, input.value);
        }
    });
    saveFromMap(mapFilters);
    return filterDataByMap(mapFilters, data);
}

function filterDataByMap(map: Map<string, string[]>, data: DataObject[]): DataObject[] {
    let filteredData: DataObject[] = data;
    map.forEach((value, key) => {
        const field = key.split(DASH)[ONE];
        const tmpData: DataObject[] = [];
        value.forEach((v) => {
            tmpData.push(...data.filter((el) => el[field as keyof typeof el] === v));
        });
        filteredData = filteredData.filter((el) => tmpData.includes(el));
    });
    if (map.size === ZERO) {
        resetCheckboxes();
        return data;
    }
    return filteredData;
}

export function addToMap<T, P>(map: Map<T, P[]>, key: T, value: P): Map<T, P[]> {
    if (map instanceof Map && key && value) {
        if (map.has(key)) {
            map.get(key)?.push(value);
        } else {
            map.set(key, [value]);
        }
    }
    return map;
}

export function setCheckboxes(className: string, items: string[]): void {
    elementDomStorage.get(className)?.forEach((el) => {
        const input = el as HTMLInputElement;
        input.checked = items.includes(input.value);
    });
}

export function clearLocalStoreRemains(): void {
    [INPUT_MAKE, INPUT_BRAKES, INPUT_COLOR].forEach((input) => {
        let flag = false;
        elementDomStorage.get(input)?.forEach((el) => {
            const element = el as HTMLInputElement;
            if (element.checked) {
                flag = true;
            }
        });
        if (!flag) {
            removeFromLocalStorage(input);
        }
    });
}
