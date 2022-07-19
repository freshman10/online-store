const { popularFilter } = require('../components/filters/popularFilter');
const { getData } = require('../components/getData');
const { elementDomStorage } = require('../components/render/generateElement');

describe('popularFilter function testing:', () => {
    let expectedValue;
    let data;
    let element;

    beforeEach(() => {
        data = getData();
        expectedValue = [];
        const element = document.createElement('img');
        element.classList.add('hide');
        elementDomStorage.clear();
        elementDomStorage.set('checked-img', [element]);
    })
    
    test('should be defined', () => {
      expect(popularFilter).toBeDefined();
    });
  
    test('should do nothing', () => {
        result = popularFilter(data);
        expect(result).toEqual(data);
    });

    test('should filter data', () => {
      result = popularFilter(data);
      elementDomStorage.get('checked-img').slice(0, 1)[0].classList.remove('hide');
      expect(result.length).toEqual(5);
    });

})