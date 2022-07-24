const { saveToLocalStorage } = require('../components/controller/localStorage');

describe('saveToLocalStorage function testing', () => {

    beforeEach(()=> {
        window.localStorage.clear();
    })

    test('should be defined', () => {
        expect(saveToLocalStorage).toBeDefined();
    })

    test('should do nothing without arguments', () => {
        saveToLocalStorage();
        expect(window.localStorage.length).toBe(0);
    })

    test('should do nothing wrong arguments', () => {
        saveToLocalStorage(1, 1);
        expect(window.localStorage.length).toBe(0);
        saveToLocalStorage(1, "1");
        expect(window.localStorage.length).toBe(0);
    })


    test('should add one element', () => {
        saveToLocalStorage("1", "1");
        expect(window.localStorage.length).toBe(1);
        expect(window.localStorage["1"]).toBe("1");
    })

    test('should add two elements', () => {
        saveToLocalStorage("1", "1");
        saveToLocalStorage("2", "2");
        expect(window.localStorage.length).toBe(2);
        expect(window.localStorage["1"]).toBe("1");
        expect(window.localStorage["2"]).toBe("2");
    })

    test('should add two elements and update one of them', () => {
        saveToLocalStorage("1", "1");
        saveToLocalStorage("2", "2");
        saveToLocalStorage("2", "3");
        expect(window.localStorage.length).toBe(2);
        expect(window.localStorage["1"]).toBe("1");
        expect(window.localStorage["2"]).toBe("3");
    })
})