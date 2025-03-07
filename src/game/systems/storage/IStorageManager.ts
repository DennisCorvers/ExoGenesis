import { Item } from "@game/entities/Item";
import { IStorageSlot } from "./IStorageSlot";

export interface IStorageManager {
    get storageSize(): number;
    get itemCount(): number;

    addItem(item: Item, amount: number): number;

    hasItemAmount(item: Item, amount: number): boolean;

    getItemCount(item: Item) : number;
    
    removeStorageSlotQuantity(targetSlot: IStorageSlot, requestedAmount: number): number;
    
    removeItemQuantity(item: Item, requestedAmount: number): number;

    removeAllOfItem(item: Item): number;

    deleteStorageSlot(targetSlot: IStorageSlot): boolean;

    findItems(predicate: (item: IStorageSlot) => boolean): IStorageSlot[];
}

