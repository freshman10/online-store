import { DataObject } from '../../constants/types';

export function search(data: DataObject[], pattern: string): DataObject[] {
    return data.filter((el) => el.name.toLocaleLowerCase().includes(pattern.toLocaleLowerCase()));
}
