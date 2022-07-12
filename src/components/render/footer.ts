import { createElement } from './generateElement';
import github from '../../assets/img/GitHub-Logo.png';
import rs from '../../assets/img/rs_school_js.svg';

export function renderFooter() {
    const footerContainer = createElement('div', document.body, ['footer-container']);
    const linkGithub = createElement('a', footerContainer, ['link-git'], '', [
        ['href', 'https://github.com/freshman10'],
    ]);
    createElement('img', linkGithub, ['img-git'], '', [
        ['src', github],
        ['alt', 'github'],
    ]);
    createElement('p', footerContainer, ['year-creation'], '2022');
    const linkRS = createElement('a', footerContainer, ['link-rs'], '', [['href', 'https://rs.school/js/']]);
    createElement('img', linkRS, ['img-rs'], '', [
        ['src', rs],
        ['alt', 'rs school'],
    ]);
}
