import { Item } from "@game/entities/Item";
import { IStorageSlot } from "./IStorageSlot";
import { IStorageManager } from "./IStorageManager";
import { IStorageTab } from "./IStorageTab";

export class Storage implements IStorageManager {
    private m_itemLookup: Map<number, StorageSlot>;
    private m_items: StorageSlot[];
    private m_storageTabs: IStorageTab[];
    private m_storageSize: number;

    public get items(): readonly IStorageSlot[] {
        return Array.from(this.m_itemLookup.values());
        //return this.m_items;
    }

    public get storageTabs(): readonly IStorageTab[] {
        return this.m_storageTabs;
    }

    get storageSize(): number {
        return this.m_storageSize;
    }

    get itemCount(): number {
        return this.m_itemLookup.size;
    }

    constructor() {
        this.m_itemLookup = new Map<number, StorageSlot>();
        this.m_storageTabs = [];
        this.m_items = [];
        this.m_storageSize = 100;

        // Default tab that is always present.
        this.m_storageTabs.push({ tabIndex: 0 });
    }

    public addItem(item: Item, amount: number): number {
        if (amount < 0) {
            throw new Error("Amount cannot be negative");
        }

        let slot = this.m_itemLookup.get(item.uid);
        if (slot) {
            slot.amount += amount;
            return amount;
        }

        if (this.m_itemLookup.size >= this.m_storageSize)
            return 0;

        slot = new StorageSlot(item, amount, false);
        this.m_itemLookup.set(item.uid, slot);

        return amount;
    }

    public hasItem(item: Item): boolean {
        return this.m_itemLookup.get(item.uid) != null;
    }

    public hasItemAmount(item: Item, amount: number): boolean {
        const slot = this.m_itemLookup.get(item.uid);
        return (slot != null && slot.amount >= amount);
    }

    public getItemCount(item: Item): number {
        return this.m_itemLookup.get(item.uid)?.amount || 0;
    }

    public removeStorageSlotQuantity(targetSlot: IStorageSlot, requestedAmount: number): number {
        return this.removeItemQuantity(targetSlot.item, requestedAmount);
    }

    public removeItemQuantity(item: Item, requestedAmount: number): number {
        const slot = this.m_itemLookup.get(item.uid);
        if (!slot) {
            throw new Error(`Item ${item.id} does not exist in inventory.`);
        }

        if (slot.amount <= requestedAmount) {
            this.m_itemLookup.delete(item.uid);
            return slot.amount;
        }
        else {
            slot.amount -= requestedAmount;
            return requestedAmount;
        }
    }

    public removeAllOfItem(item: Item): number {
        const slot = this.m_itemLookup.get(item.uid);
        if (!slot) {
            throw new Error(`Item ${item.id} does not exist in inventory.`);
        }

        const amount = slot.amount;

        // Don't remove the entire entry, just zero it.
        if (slot.isLocked) {
            slot.amount = 0;
        }
        else {
            this.m_itemLookup.delete(item.uid);
        }

        return amount;
    }

    public deleteStorageSlot(targetSlot: IStorageSlot): boolean {
        return this.m_itemLookup.delete(targetSlot.item.uid);
    }

    public getStorageSlot(item: Item): IStorageSlot | null {
        return this.m_itemLookup.get(item.uid) || null;
    }

    findItems(predicate: (item: IStorageSlot) => boolean): IStorageSlot[] {
        throw new Error("Method not implemented.");
    }
}

class StorageSlot implements IStorageSlot {
    private m_item: Item;
    private m_amount: number;
    private m_isLocked: boolean;

    constructor(item: Item, amount: number, isLocked: boolean) {
        this.m_item = item
        this.m_amount = amount
        this.m_isLocked = isLocked
    }

    public get slotid(): number {
        return this.item.uid;
    }

    public get item(): Item {
        return this.m_item;
    }

    public get amount(): number {
        return this.m_amount;
    }

    public set amount(amount: number) {
        this.m_amount = amount;
    }

    public get isLocked(): boolean {
        return this.m_isLocked;
    }

    public set isLocked(isLocked: boolean) {
        this.m_isLocked = isLocked;
    }
}