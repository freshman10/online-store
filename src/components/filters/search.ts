import { elementDomStorage } from '../render/generateElement';
import { renderItems } from '../render/items';
import { DataObject } from '../../constants/types';
import { applyAll } from './applyAllFilters';
import { INPUT, INPUT_SEARCH } from '../../constants/constants';

export function search(data: DataObject[], pattern: string): DataObject[] {
    return data.filter((el) => el.name.toLocaleLowerCase().includes(pattern.toLocaleLowerCase()));
}

export function addSearch(data: DataObject[]): void {
    elementDomStorage.get(INPUT_SEARCH)?.forEach((el) => {
        el.addEventListener(INPUT, () => {
            const filtered = applyAll(data);
            renderItems(filtered);
        });
    });
}
