import { elementDomStorage } from '../render/generateElement';
import { DataObject } from '../types';

export function popularFilter(data: DataObject[]): DataObject[] {
    if (!elementDomStorage.get('checked-img')?.slice(0, 1)[0].classList.contains('hide')) {
        return data.filter((el) => el.popular);
    }
    return data;
}
