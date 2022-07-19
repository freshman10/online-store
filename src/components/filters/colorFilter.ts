import { elementDomStorage } from '../render/generateElement';
import { DataObject } from '../../constants/types';

export function colorFilter(data: DataObject[]): DataObject[] {
    let filteredData = data;
    elementDomStorage.get('color-item')?.forEach((el) => {
        if (el.classList.contains('checked')) {
            const currentColor = el.getAttribute('value');
            if (currentColor !== 'ALL') {
                filteredData = data.filter((bike) => bike.color === currentColor);
            }
        }
    });
    return filteredData;
}
