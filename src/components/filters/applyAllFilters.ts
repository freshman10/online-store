import { elementDomStorage } from '../render/generateElement';
import { DataObject } from '../types';
import { filterDroplist } from './filterDroplist';
import { search } from './search';

export function applyAll(data: DataObject[]): DataObject[] {
    const pattern = (elementDomStorage.get('input-search')?.slice(0, 1)[0] as HTMLInputElement).value;
    let filteredData = search(data, pattern);
    filteredData = filterDroplist(filteredData, 'make');
    filteredData = filterDroplist(filteredData, 'brakes');
    return filteredData;
}
