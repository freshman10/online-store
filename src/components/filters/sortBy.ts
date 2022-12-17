import { elementDomStorage } from '../render/generateElement';
import { DataObject } from '../../constants/types';
import { SORTING_CONDITIONS, SORTING_DROPLIST } from '../../constants/constants';

export function sortBy(data: DataObject[]): DataObject[] {
    let filteredData = [...data];
    elementDomStorage.get(SORTING_DROPLIST)?.forEach((el) => {
        const selectElement = el as HTMLSelectElement;
        const sortingType: string = selectElement.options[selectElement.selectedIndex].value;
        filteredData = SORTING_CONDITIONS[(sortingType as unknown) as keyof typeof SORTING_CONDITIONS](data);
    });
    return filteredData;
}
