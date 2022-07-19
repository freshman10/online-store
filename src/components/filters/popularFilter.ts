import { elementDomStorage } from '../render/generateElement';
import { renderItems } from '../render/items';
import { DataObject } from '../../constants/types';
import { applyAll } from './applyAllFilters';
import { CHECKED_IMG, HIDE, ONE, ZERO } from '../../constants/constants';

export function popularFilter(data: DataObject[]): DataObject[] {
    if (!elementDomStorage.get(CHECKED_IMG)?.slice(ZERO, ONE)[ZERO].classList.contains(HIDE)) {
        return data.filter((el) => el.popular);
    }
    return data;
}

export function setPopularFlag(flag: boolean, data: DataObject[]): void {
    elementDomStorage.get(CHECKED_IMG)?.forEach((el) => {
        if (flag) {
            el.classList.remove(HIDE);
        } else {
            el.classList.add(HIDE);
        }
        const filteredData = applyAll(data);
        renderItems(filteredData);
    });
}
