const { saveFromMap } = require('../components/controller/localStorage');

describe('saveFromMap function testing', () => {

    beforeEach(()=> {
        window.localStorage.clear();
    })

    test('should be defined', () => {
        expect(saveFromMap).toBeDefined();
    })

    test('should do nothing with zero arguments', () => {
        saveFromMap()
        expect(window.localStorage.length).toBe(0);
    })

    test('should do nothing with wrong arguments part 1', () => {
        saveFromMap(1)
        expect(window.localStorage.length).toBe(0);
    })

    test('should do nothing with wrong arguments part 2', () => {
        const input = new Map();
        input.set(1, 1);
        saveFromMap(input);
        expect(window.localStorage.length).toBe(0);
    })

    test('should do nothing with wrong arguments part 3', () => {
        const input = new Map();
        input.set(1, [1,2,3]);
        saveFromMap(input);
        expect(window.localStorage.length).toBe(0);
    })

    test('should do nothing with wrong arguments part 4', () => {
        const input = new Map();
        input.set('1', []);
        saveFromMap(input);
        expect(window.localStorage.length).toBe(0);
    })

    test('should do nothing with wrong arguments part 5', () => {
        const input = new Map();
        input.set("1", [1,2,3]);
        saveFromMap(input);
        expect(window.localStorage.length).toBe(0);
    })

    test('should add one array', () => {
        const input = new Map();
        input.set("1", ["1","2","3"]);
        saveFromMap(input);
        expect(window.localStorage.length).toBe(1);
        expect(window.localStorage.getItem('1')).toEqual('1+++2+++3');
    })

    test('should add two arrays', () => {
        const input = new Map();
        input.set("1", ["1","2","3"]);
        input.set("2", ["4","2","3"]);
        saveFromMap(input);
        expect(window.localStorage.length).toBe(2);
        expect(window.localStorage.getItem('1')).toEqual('1+++2+++3');
        expect(window.localStorage.getItem('2')).toEqual('4+++2+++3');
    })
})