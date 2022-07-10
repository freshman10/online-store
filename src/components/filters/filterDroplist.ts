import { elementDomStorage } from '../render/generateElement';
import { DataObject } from '../types';

export function filterDroplist(data: DataObject[], type: string): DataObject[] {
    const select = elementDomStorage.get(type)?.slice(0, 1)[0] as HTMLSelectElement;
    const value: string = select.options[select.selectedIndex].text;
    if (value === 'ALL') {
        return data;
    } else {
        return data.filter((el) => el[type as keyof typeof el] === value);
    }
}
