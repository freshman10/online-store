const { addToDOMStorage, elementDomStorage } = require('../components/render/generateElement');

describe('addToDOMStorage function testing:', () => {
  const result = new Map();
  let element;
  let anotherElement;

  beforeEach(() => {
    element = document.createElement('div');
    element.classList.add('test1');
    anotherElement = document.createElement('p');
    elementDomStorage.clear();
    result.clear(); 
  })
  
  test('should be defined', () => {
    expect(addToDOMStorage).toBeDefined();
  });

  test('should be empty', () => {
    addToDOMStorage('some wrong data');
    expect(elementDomStorage).toEqual(result);
  });

  test('should be empty', () => {
    addToDOMStorage();
    expect(elementDomStorage).toEqual(result);
  });

  test('should be empty', () => {
    element.classList.remove('test1');
    addToDOMStorage(element);
    expect(elementDomStorage).toEqual(result);
  });

  test('should add one element to the storage', () => {
    result.set('test1', [element]);
    addToDOMStorage(element);
    addToDOMStorage(anotherElement);
    expect(elementDomStorage).toEqual(result);
  });

  test('should add one element to the storage', () => {
    result.set('test1', [element]);
    addToDOMStorage(element);
    expect(elementDomStorage).toEqual(result);
  });

  test('should add two elements to the storage', () => {
    element.classList.add('test2')
    result.set('test1', [element]);
    result.set('test2', [element]);
    addToDOMStorage(element);
    expect(elementDomStorage).toEqual(result);
  });

  test('should add two elements to the storage', () => {
    anotherElement.classList.add('test2');
    result.set('test1', [element]);
    result.set('test2', [anotherElement]);
    addToDOMStorage(element);
    addToDOMStorage(anotherElement);
    expect(elementDomStorage).toEqual(result);
  });

  test('should add multiple elements', () => {
    element.classList.add('test2');
    anotherElement.classList.add('test2');
    result.set('test1', [element]);
    result.set('test2', [element, anotherElement]);
    addToDOMStorage(element);
    addToDOMStorage(anotherElement);
    expect(elementDomStorage).toEqual(result);
  });

})
