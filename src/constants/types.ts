export interface DataObject {
    name: string;
    wheel: number;
    speeds: number;
    color: string;
    make: string;
    weight: number;
    price: number;
    type: string;
    img: string;
    brakes: string;
    brakeType: string;
    madeFor: string;
    age: number;
    popular: boolean;
    items: number;
}

export enum sortingTypes {
    'By name, increasing',
    'By name, decreasing',
    'By year, increasing',
    'By year, decreasing',
    'By quantity, increasing',
    'By quantity, decreasing',
}
