import data from '../data.json';
import { DataObject } from './types';

function getData(): DataObject[] {
    return data.data;
}

export default getData;
