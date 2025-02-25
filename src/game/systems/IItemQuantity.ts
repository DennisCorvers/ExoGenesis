import { Item } from "../entities/Item";

export interface IItemQuantity {
    get item() : Item;
    get amount() : number;
}