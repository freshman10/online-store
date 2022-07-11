import { elementDomStorage } from '../render/generateElement';
import { DataObject } from '../types';

export function rangeFilter(data: DataObject[], target: string): DataObject[] {
    let filteredData = data;
    let minValue = -1;
    let maxValue = -1;
    elementDomStorage.get('input')?.forEach((el) => {
        if (el.classList.contains(`${target}-input`)) {
            if (el.classList.contains('from')) {
                minValue = Number((el as HTMLInputElement).value);
            }
            if (el.classList.contains('to')) {
                maxValue = Number((el as HTMLInputElement).value);
            }
        }
    });
    if (minValue !== -1 && maxValue !== -1) {
        filteredData = data.filter((el) => {
            const currentValue: number = el[target as keyof typeof el] as number;
            return currentValue >= minValue && currentValue <= maxValue;
        });
    }
    return filteredData;
}
