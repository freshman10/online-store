const { getData } = require('../components/getData');
const { getUnique } = require('../components/render/filterByValue');

describe('popularFilter function testing:', () => {
    const data = getData();

    test('should be defined', () => {
        expect(getUnique).toBeDefined();
    });

    test('should do nothing with wrong arguments', ()=> {
        expect(getUnique(1, 1)).toEqual([]);
        expect(getUnique('1', 1)).toEqual([]);
    })

    test('should return unique', ()=> {
        const expected = data.reduce((acc,el) => {
            if (!acc.includes(el.name)) {
                acc.push(el.name)
            }
            return acc
        }, [])
        expect(getUnique('name', data)).toEqual(expected);
    })

    test('should return unique for a few elements', ()=> {
        const arr = data.slice(0,1).concat(data.slice(0,1));
        const expected = arr.reduce((acc,el) => {
            if (!acc.includes(el.name)) {
                acc.push(el.name)
            }
            return acc
        }, [])
        expect(getUnique('name', arr)).toEqual(expected);
        expect(getUnique('name', arr).length).toBe(1);
    })


})