import { resetCheckboxes } from '../controller/AddEventListners';
import { removeFromLocalStorage, saveFromMap } from '../controller/localStorage';
import { elementDomStorage } from '../render/generateElement';
import { DataObject } from '../types';

export function filterCheckbox(data: DataObject[]): DataObject[] {
    const mapFilters = new Map<string, string[]>();
    elementDomStorage.get('input')?.forEach((el) => {
        const input = el as HTMLInputElement;
        const inputClass = [...input.classList].slice(-1)[0];
        if (input.checked === true) {
            addToMap(mapFilters, inputClass, input.value);
        }
    });
    saveFromMap(mapFilters);
    return filterDataByMap(mapFilters, data);
}

function filterDataByMap(map: Map<string, string[]>, data: DataObject[]): DataObject[] {
    let filteredData: DataObject[] = data;
    map.forEach((value, key) => {
        const field = key.split('-')[1];
        const tmpData: DataObject[] = [];
        value.forEach((v) => {
            tmpData.push(...data.filter((el) => el[field as keyof typeof el] === v));
        });
        filteredData = filteredData.filter((el) => tmpData.includes(el));
    });
    if (map.size === 0) {
        resetCheckboxes();
        return data;
    }
    return filteredData;
}

function addToMap<T, P>(map: Map<T, P[]>, key: T, value: P): Map<T, P[]> {
    if (map.has(key)) {
        map.get(key)?.push(value);
    } else {
        map.set(key, [value]);
    }
    return map;
}

export function setCheckboxes(className: string, items: string[]): void {
    elementDomStorage.get(className)?.forEach((el) => {
        const input = el as HTMLInputElement;
        input.checked = false;
        if (items.includes(input.value)) {
            input.checked = true;
        }
    });
}

export function clearLocalStoreRemains(): void {
    ['input-make', 'input-brakes', 'input-color'].forEach((input) => {
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
