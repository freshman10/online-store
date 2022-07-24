const { addToMap } = require('../components/filters/filterCheckbox');

describe('addToMap function testing:', () => {
    let map;

    beforeEach(() => {
        map = new Map();
    })

    test('should be defined', () => {
        expect(addToMap).toBeDefined();
    });

    test('should do nothing', () => {
        addToMap(map);
        expect(map).toEqual(new Map());
    })

    test('should add one element', () => {
        addToMap(map, 'test', 'value');
        const expectedValue = new Map();
        expectedValue.set('test', ['value']);
        expect(map).toEqual(expectedValue);
    })

    test('should add one element with updating value', () => {
        addToMap(map, 'test', 'value1');
        addToMap(map, 'test', 'value2');
        const expectedValue = new Map();
        expectedValue.set('test', ['value1', 'value2']);
        expect(map).toEqual(expectedValue);
    })

    test('should add two elements', () => {
        addToMap(map, 'test1', 'value1');
        addToMap(map, 'test2', 'value2');
        const expectedValue = new Map();
        expectedValue.set('test1', ['value1']);
        expectedValue.set('test2', ['value2']);
        expect(map).toEqual(expectedValue);
    })

    test('should add multiple elements', () => {
        addToMap(map, 'test1', 'value1');
        addToMap(map, 'test2', 'value2');
        addToMap(map, 'test2', 'value3');
        addToMap(map, 'test2', 'value4');
        const expectedValue = new Map();
        expectedValue.set('test1', ['value1']);
        expectedValue.set('test2', ['value2', 'value3', 'value4']);
        expect(map).toEqual(expectedValue);
    })

})