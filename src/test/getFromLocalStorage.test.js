const { getFromLocalStorage } = require('../components/controller/localStorage');

describe('getFromLocalStorage function testing', () => {

    beforeEach(()=> {
        window.localStorage.clear();
    })

    test('should be defined', () => {
        expect(getFromLocalStorage).toBeDefined();
    })

    test('should do nothing with zero arguments', () => {
        expect(getFromLocalStorage()).toBe('');
    })

    test('should do nothing with wrong arguments', () => {
        expect(getFromLocalStorage(1)).toBe('');
    })

    test('should get a string', () => {
        window.localStorage.setItem('1', '1');
        expect(getFromLocalStorage('1')).toBe('1');
    })

    test('should get a string for multyple items inside', () => {
        window.localStorage.setItem('2', '2');
        window.localStorage.setItem('3', '3333');
        expect(getFromLocalStorage('2')).toBe('2');
        expect(getFromLocalStorage('3')).toBe('3333');
    })
})