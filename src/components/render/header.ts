import { createElement } from './generateElement';
import logo from '../../assets/img/logo.jpg';
import { getFromLocalStorage } from '../controller/localStorage';
import {
    ALT,
    BASKET_ITEMS,
    BIN_CONTAINER,
    BIN_COUNTER,
    DIV,
    EMPTY,
    H1,
    HEADER,
    IMG,
    LOGO,
    LOGO_CONTAINER,
    LOGO_IMG,
    P,
    SEPARATOR,
    SHOP_LABEL,
    SRC,
    STORE_NAME,
} from '../../constants/constants';

export function renderHeader(): void {
    const header: HTMLElement = createElement(HEADER, document.body, [HEADER]);
    const logoContainer: HTMLElement = createElement(DIV, header, [LOGO_CONTAINER]);
    createElement(IMG, logoContainer, [LOGO_IMG], EMPTY, [
        [ALT, LOGO],
        [SRC, logo],
    ]);
    createElement(H1, logoContainer, [SHOP_LABEL], STORE_NAME);
    const shopBinContainer: HTMLElement = createElement(DIV, header, [BIN_CONTAINER]);
    const basketItems = getFromLocalStorage(BASKET_ITEMS);
    let itemsNumber = 0;
    if (basketItems) {
        itemsNumber = basketItems.split(SEPARATOR).length;
    }
    createElement(P, shopBinContainer, [BIN_COUNTER], itemsNumber.toString());
}
