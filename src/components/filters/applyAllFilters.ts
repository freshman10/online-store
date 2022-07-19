import { elementDomStorage } from '../render/generateElement';
import { DataObject } from '../../constants/types';
import { colorFilter } from './colorFilter';
import { filterCheckbox } from './filterCheckbox';
import { popularFilter } from './popularFilter';
import { rangeFilter } from './rangeFilter';
import { search } from './search';
import { sortBy } from './sortBy';
import { AGE, INPUT_SEARCH, ITEMS, ONE, PRICE, WHEEL, ZERO } from '../../constants/constants';

export function applyAll(data: DataObject[]): DataObject[] {
    const element = elementDomStorage.get(INPUT_SEARCH)?.slice(ZERO, ONE)[ZERO] as HTMLInputElement;
    if (element) {
        const pattern = element.value;
        let filteredData = search(data, pattern);
        filteredData = colorFilter(filteredData);
        filteredData = popularFilter(filteredData);
        filteredData = filterCheckbox(filteredData);
        [AGE, WHEEL, PRICE, ITEMS].forEach((el) => {
            filteredData = rangeFilter(filteredData, el);
        });
        filteredData = sortBy(filteredData);
        return filteredData;
    }
    return data;
}
