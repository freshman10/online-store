import { elementDomStorage } from '../render/generateElement';
import { DataObject } from '../../constants/types';
import { colorFilter } from './colorFilter';
import { filterCheckbox } from './filterCheckbox';
import { popularFilter } from './popularFilter';
import { rangeFilter } from './rangeFilter';
import { search } from './search';
import { sortBy } from './sortBy';

export function applyAll(data: DataObject[]): DataObject[] {
    const element = elementDomStorage.get('input-search')?.slice(0, 1)[0] as HTMLInputElement;
    if (element) {
        const pattern = element.value;
        let filteredData = search(data, pattern);
        filteredData = colorFilter(filteredData);
        filteredData = popularFilter(filteredData);
        filteredData = filterCheckbox(filteredData);
        ['age', 'wheel', 'price', 'items'].forEach((el) => {
            filteredData = rangeFilter(filteredData, el);
        });
        filteredData = sortBy(filteredData);
        return filteredData;
    }
    return data;
}
