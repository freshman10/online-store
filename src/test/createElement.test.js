const { container } = require('webpack');
const { createElement } = require('../components/render/generateElement');

describe('createElement function testing:', () => {
    let result;
    let container;

    beforeEach(() => {
        container = document.createElement('div');
        result = document.createElement('div');
    })

    test('should be defined', () => {
        expect(createElement).toBeDefined();
    });

    test('should throw an error', () => {
        expect(() => { createElement(); }).toThrow(Error);
        expect(() => { createElement(); }).toThrow('Wrong data');
        expect(() => { createElement('div'); }).toThrow(Error);
    });

    test('should return a simple HTMLElement', () => {
        const value = createElement('div', container);
        expect(value).toEqual(result);
    });

    test('should return a simple HTMLElement without classes', () => {
        const value = createElement('div', container, []);
        expect(value).toEqual(result);
    });

    test('should return a HTMLElement with one class', () => {
        const value = createElement('div', container, ['test1']);
        result.classList.add('test1');
        expect(value).toEqual(result);
    });

    test('should return a HTMLElement with two classes', () => {
        const value = createElement('div', container, ['test1', 'test2']);
        result.classList.add(...['test1', 'test2']);
        expect(value).toEqual(result);
    });

    test('should return a HTMLElement with classes and text inside', () => {
        const value = createElement('p', container, ['test1', 'test2'], 'Some text');
        result = document.createElement('p');
        result.classList.add(...['test1', 'test2']);
        result.textContent = 'Some text';
        expect(value).toEqual(result);
    });

    test('should return a HTMLElement with classes, text inside and attributes', () => {
        const value = createElement('p', container, ['test1', 'test2'], 'Some text', [['value', 'test']]);
        result = document.createElement('p');
        result.classList.add(...['test1', 'test2']);
        result.textContent = 'Some text';
        result.setAttribute('value', 'test')
        expect(value).toEqual(result);
    });

    test('should return a HTMLElement with classes, text inside and a few attributes', () => {
        const value = createElement('p', container, ['test1', 'test2'], 'Some text', [['value', 'test'], ['value2', 'test2']]);
        result = document.createElement('p');
        result.classList.add(...['test1', 'test2']);
        result.textContent = 'Some text';
        result.setAttribute('value', 'test');
        result.setAttribute('value2', 'test2');
        expect(value).toEqual(result);
    });

    test('should put element in parentElement', () => {
        const value = createElement('p', container, ['test1', 'test2'], 'Some text', [['value', 'test'], ['value2', 'test2']]);
        result = document.createElement('p');
        result.classList.add(...['test1', 'test2']);
        result.textContent = 'Some text';
        result.setAttribute('value', 'test');
        result.setAttribute('value2', 'test2');
        const checkedContainer = document.createElement('div');
        checkedContainer.appendChild(result);
        expect(container).toEqual(checkedContainer);
    })

})