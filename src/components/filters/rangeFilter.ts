import { elementDomStorage } from '../render/generateElement';
import { DataObject } from '../../constants/types';
import { FROM, INPUT, MINUS_ONE, TO } from '../../constants/constants';

export function rangeFilter(data: DataObject[], target: string): DataObject[] {
    let filteredData = data;
    let minValue = MINUS_ONE;
    let maxValue = MINUS_ONE;
    elementDomStorage.get(INPUT)?.forEach((el) => {
        if (el.classList.contains(`${target}-${INPUT}`)) {
            if (el.classList.contains(FROM)) {
                minValue = Number((el as HTMLInputElement).value);
            }
            if (el.classList.contains(TO)) {
                maxValue = Number((el as HTMLInputElement).value);
            }
        }
    });
    if (minValue !== MINUS_ONE && maxValue !== MINUS_ONE) {
        filteredData = data.filter((el) => {
            const currentValue: number = el[target as keyof typeof el] as number;
            return currentValue >= minValue && currentValue <= maxValue;
        });
    }
    return filteredData;
}
