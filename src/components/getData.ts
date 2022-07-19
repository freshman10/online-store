import data from '../data.json';
import { DataObject } from '../constants/types';

export function getData(): DataObject[] {
    return data.data;
}

export default getData;
