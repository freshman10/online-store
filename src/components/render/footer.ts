import { createElement } from './generateElement';
import github from '../../assets/img/GitHub-Logo.png';
import rs from '../../assets/img/rs_school_js.svg';
import {
    A,
    ALT,
    CURRENT_YEAR,
    DIV,
    EMPTY,
    FOOTER_CONTAINER,
    GITGUB,
    HREF,
    IMG,
    IMG_GIT,
    IMG_RS,
    LINK_GIT,
    LINK_RS,
    MY_GITHUB,
    P,
    RS_SCHOOL,
    SCHOOL_LINK,
    SRC,
    YEAR_CREATION,
} from '../../constants/constants';

export function renderFooter() {
    const footerContainer = createElement(DIV, document.body, [FOOTER_CONTAINER]);
    const linkGithub = createElement(A, footerContainer, [LINK_GIT], EMPTY, [[HREF, MY_GITHUB]]);
    createElement(IMG, linkGithub, [IMG_GIT], EMPTY, [
        [SRC, github],
        [ALT, GITGUB],
    ]);
    createElement(P, footerContainer, [YEAR_CREATION], CURRENT_YEAR);
    const linkRS = createElement(A, footerContainer, [LINK_RS], EMPTY, [[HREF, SCHOOL_LINK]]);
    createElement(IMG, linkRS, [IMG_RS], EMPTY, [
        [SRC, rs],
        [ALT, RS_SCHOOL],
    ]);
}
