import { elementDomStorage } from '../render/generateElement';
import { renderItems } from '../render/items';
import { DataObject } from '../types';
import { applyAll } from './applyAllFilters';

export function search(data: DataObject[], pattern: string): DataObject[] {
    return data.filter((el) => el.name.toLocaleLowerCase().includes(pattern.toLocaleLowerCase()));
}

export function addSearch(data: DataObject[]): void {
    elementDomStorage.get('input-search')?.forEach((el) => {
        el.addEventListener('input', (e) => {
            const pattern: string = (el as HTMLInputElement).value;
            const filtered = applyAll(data);
            renderItems(filtered);
        });
    });
}
