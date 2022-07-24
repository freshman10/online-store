import { renderHeader } from './render/header';
import { renderMain } from './render/main';
import getData from './getData';
import { renderFooter } from './render/footer';
import { DataObject } from '../constants/types';

export function buildPage(): void {
    renderHeader();
    const data: DataObject[] = getData();
    renderMain(data);
    renderFooter();
}
