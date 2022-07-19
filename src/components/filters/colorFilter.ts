import { elementDomStorage } from '../render/generateElement';
import { DataObject } from '../../constants/types';
import { ALL, CHECKED, COLOR_ITEM, VALUE } from '../../constants/constants';

export function colorFilter(data: DataObject[]): DataObject[] {
    let filteredData = data;
    elementDomStorage.get(COLOR_ITEM)?.forEach((el) => {
        if (el.classList.contains(CHECKED)) {
            const currentColor = el.getAttribute(VALUE);
            if (currentColor !== ALL) {
                filteredData = data.filter((bike) => bike.color === currentColor);
            }
        }
    });
    return filteredData;
}
