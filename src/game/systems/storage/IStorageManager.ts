import { Item } from "@game/entities/Item";
import { IStorageSlot } from "./IStorageSlot";

export interface IStorageManager {
    get storageSize(): number;

    get itemCount(): number;

    get items(): readonly IStorageSlot[];

    addItem(item: Item, amount: number): number;

    getItem(item: Item): IStorageSlot;

    hasItemAmount(item: Item, amount: number): boolean;

    getItemCount(item: Item): number;

    removeItemQuantity(item: Item, requestedAmount: number): number;

    removeAllOfItem(item: Item): number;

    filterItems(predicate: (item: IStorageSlot) => boolean): readonly IStorageSlot[]
}

