const { resetLocalStorage } = require('../components/controller/localStorage');

describe('resetLocalStorage function testing', () => {

    beforeEach(()=> {
        window.localStorage.clear();
    })

    test('should be defined', () => {
        expect(resetLocalStorage).toBeDefined();
    })

    test('should reset one element', () => {
        window.localStorage.setItem('1', '1');
        resetLocalStorage();
        expect(window.localStorage.length).toBe(0);
    })

    test('should reset two elements', () => {
        window.localStorage.setItem('1', '1');
        window.localStorage.setItem('2', '2');
        resetLocalStorage();
        expect(window.localStorage.length).toBe(0);
    })

    test('should reset everything', () => {
        window.localStorage.setItem('1', '1');
        window.localStorage.setItem('2', '2');
        window.localStorage.setItem('3', '2dcfvc');
        window.localStorage.setItem('4', '32312432');
        window.localStorage.setItem('5', '123123');
        resetLocalStorage();
        expect(window.localStorage.length).toBe(0);
    })
})