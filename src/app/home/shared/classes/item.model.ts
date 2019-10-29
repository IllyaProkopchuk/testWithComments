import { IItem } from '../interfaces/item.interface';

export class Item implements IItem {
    constructor(
        public name: string,
        public comments?: Array<string>
    ) { }
}