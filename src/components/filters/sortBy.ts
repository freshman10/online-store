import { elementDomStorage } from '../render/generateElement';
import { DataObject } from '../types';

export function sortBy(data: DataObject[]): DataObject[] {
    let filteredData = data;
    elementDomStorage.get('sorting-droplist')?.forEach((el) => {
        const selectElement = el as HTMLSelectElement;
        const sortingType: string = selectElement.options[selectElement.selectedIndex].value;
        if (sortingType.includes('name') && sortingType.includes('increasing')) {
            filteredData = data.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortingType.includes('name') && sortingType.includes('decreasing')) {
            filteredData = data.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sortingType.includes('year') && sortingType.includes('increasing')) {
            filteredData = data.sort((a, b) => a.age - b.age);
        } else if (sortingType.includes('year') && sortingType.includes('decreasing')) {
            filteredData = data.sort((a, b) => b.age - a.age);
        } else if (sortingType.includes('quantity') && sortingType.includes('increasing')) {
            filteredData = data.sort((a, b) => a.items - b.items);
        } else if (sortingType.includes('quantity') && sortingType.includes('decreasing')) {
            filteredData = data.sort((a, b) => b.items - a.items);
        }
    });
    return filteredData;
}
