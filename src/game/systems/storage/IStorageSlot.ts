import { Item } from "@game/entities/Item";

export interface IStorageSlot {
    get item(): Item;

    get amount(): number;

    get isLocked(): boolean;

    set isLocked(isLocked: boolean);

    get slotid() : number;
}