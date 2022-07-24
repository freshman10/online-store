const { countItemsInBasket } = require('../components/controller/AddEventListeners');
const { basketItemsStorage } = require('../constants/constants');

describe('countItemsInBasket function testing', () => {
    beforeEach(()=>{
        basketItemsStorage.splice(0, basketItemsStorage.length);
    })

    test('should be defined', () => {
        expect(countItemsInBasket).toBeDefined();
    });

    test('should return 0', () => {
        expect(countItemsInBasket()).toBe(0);
    });

    test('should return 1', () => {
        basketItemsStorage.push('');
        expect(countItemsInBasket()).toBe(1);
    });

    test('should return 2', () => {
        basketItemsStorage.push('', 1);
        expect(countItemsInBasket()).toBe(2);
    });

    test('should return 3', () => {
        basketItemsStorage.push('', 2, {});
        expect(countItemsInBasket()).toBe(3);
    });

    test('should return many', () => {
        basketItemsStorage.push(...new Array(16));
        expect(countItemsInBasket()).toBe(16);
    });
})