import { elementDomStorage } from '../render/generateElement';
import { DataObject } from '../../constants/types';
import { DECREASING, INCREASING, NAME, QUANTITY_SMALL, SORTING_DROPLIST, YEAR } from '../../constants/constants';

export function sortBy(data: DataObject[]): DataObject[] {
    let filteredData = data;
    elementDomStorage.get(SORTING_DROPLIST)?.forEach((el) => {
        const selectElement = el as HTMLSelectElement;
        const sortingType: string = selectElement.options[selectElement.selectedIndex].value;
        if (sortingType.includes(NAME) && sortingType.includes(INCREASING)) {
            filteredData = data.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortingType.includes(NAME) && sortingType.includes(DECREASING)) {
            filteredData = data.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sortingType.includes(YEAR) && sortingType.includes(INCREASING)) {
            filteredData = data.sort((a, b) => a.age - b.age);
        } else if (sortingType.includes(YEAR) && sortingType.includes(DECREASING)) {
            filteredData = data.sort((a, b) => b.age - a.age);
        } else if (sortingType.includes(QUANTITY_SMALL) && sortingType.includes(INCREASING)) {
            filteredData = data.sort((a, b) => a.items - b.items);
        } else if (sortingType.includes(QUANTITY_SMALL) && sortingType.includes(DECREASING)) {
            filteredData = data.sort((a, b) => b.items - a.items);
        }
    });
    return filteredData;
}
