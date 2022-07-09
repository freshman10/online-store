import bin from '../assets/img/bin.png';
import { renderHeader } from '../components/render/header/header';
import { renderMain } from '../components/render/main/main';
import getData from './getData';
import { DataObject } from './types';

export function buildPage(): void {
    renderHeader();
    const data: DataObject[] = getData();
    renderMain(data);
}
