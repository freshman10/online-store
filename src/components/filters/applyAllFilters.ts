import { elementDomStorage } from '../render/generateElement';
import { DataObject } from '../types';
import { colorFilter } from './colorFilter';
import { filterDroplist } from './filterDroplist';
import { popularFilter } from './popularFilter';
import { search } from './search';

export function applyAll(data: DataObject[]): DataObject[] {
    const pattern = (elementDomStorage.get('input-search')?.slice(0, 1)[0] as HTMLInputElement).value;
    let filteredData = search(data, pattern);
    filteredData = filterDroplist(filteredData, 'make');
    filteredData = filterDroplist(filteredData, 'brakes');
    filteredData = colorFilter(filteredData);
    filteredData = popularFilter(filteredData);
    return filteredData;
}
