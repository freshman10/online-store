import { data } from '../data.json';
import { DataObject } from './types';

function getData(): DataObject[] {
    return data;
}

export default getData;
