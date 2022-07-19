import { elementDomStorage } from '../render/generateElement';
import { renderItems } from '../render/items';
import { DataObject } from '../../constants/types';
import { applyAll } from './applyAllFilters';

export function popularFilter(data: DataObject[]): DataObject[] {
    if (!elementDomStorage.get('checked-img')?.slice(0, 1)[0].classList.contains('hide')) {
        return data.filter((el) => el.popular);
    }
    return data;
}

export function setPopularFlag(flag: boolean, data: DataObject[]): void {
    elementDomStorage.get('checked-img')?.forEach((el) => {
        if (flag) {
            el.classList.remove('hide');
        } else {
            el.classList.add('hide');
        }
        const filteredData = applyAll(data);
        renderItems(filteredData);
    });
}
