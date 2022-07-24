const { removeFromLocalStorage } = require('../components/controller/localStorage');

describe('removeFromLocalStorage function testing', () => {

    beforeEach(()=> {
        window.localStorage.clear();
    })

    test('should be defined', () => {
        expect(removeFromLocalStorage).toBeDefined();
    })

    test('should do nothing', () => {
        window.localStorage.setItem('1', '1');
        removeFromLocalStorage(1)
        expect(window.localStorage.length).toBe(1);
    })

    test('should erase one element', () => {
        window.localStorage.setItem('1', '1');
        removeFromLocalStorage('1')
        expect(window.localStorage.length).toBe(0);
    })

    test('should erase one element for a few keys inside', () => {
        window.localStorage.setItem('1', '1');
        window.localStorage.setItem('2', '2');
        removeFromLocalStorage('1')
        expect(window.localStorage.length).toBe(1);
    })

    test('should erase two elements', () => {
        window.localStorage.setItem('1', '1');
        window.localStorage.setItem('2', '2');
        removeFromLocalStorage('1');
        removeFromLocalStorage('2')
        expect(window.localStorage.length).toBe(0);
    })
})