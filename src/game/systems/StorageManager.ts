import { IGameContext } from "../core/IGameContext";
import { Item } from "../entities/Item";
import { IItemQuantity } from "./IItemQuantity";

export interface IStorageManager {
    addItem(item: Item, amount: number): boolean;

    hasItem(item: Item): boolean;

    hasItemAmount(item: Item, amount: number): boolean;

    removeItem(item: Item, requestedAmount: number): number;
}

export class StorageManager implements IStorageManager {
    private m_items: Map<number, StorageSlot>;
    private m_storageSize: number;

    public get itemsList(): StorageSlot[] {
        return Array.from(this.m_items.values());
    }

    constructor(gameContext: IGameContext) {
        this.m_items = new Map<number, StorageSlot>();
        this.m_storageSize = 100;
    }

    public addItem(item: Item, amount: number): boolean {
        if (amount < 0) {
            throw new Error("Amount cannot be negative");
        }

        let slot = this.getStorageSlot(item);
        if (slot) {
            slot.amount += amount;
            return true;
        }

        if (this.m_items.size >= this.m_storageSize)
            return false;

        slot = new StorageSlot(item, amount);
        this.m_items.set(item.uid, slot);

        return true;
    }

    public getItem(item: Item): IItemQuantity | null {
        return this.m_items.get(item.uid) || null;
    }

    public hasItem(item: Item): boolean {
        return this.m_items.get(item.uid) != null;
    }

    public hasItemAmount(item: Item, amount: number): boolean {
        const slot = this.m_items.get(item.uid);
        return (slot != null && slot.amount >= amount);
    }

    public removeAllItem(item: Item): number {
        const slot = this.getStorageSlot(item);
        if (!slot) {
            throw new Error(`Item ${item.id} does not exist in inventory.`);
        }

        const amount = slot.amount;

        // Don't remove the entire entry, just zero it.
        if (slot.isLocked) {
            slot.amount = 0;
        }
        else {
            this.m_items.delete(item.uid);
        }

        return amount;
    }

    public removeItem(item: Item, requestedAmount: number): number {
        const slot = this.getStorageSlot(item);
        if (!slot) {
            throw new Error(`Item ${item.id} does not exist in inventory.`);
        }

        if (slot.amount <= requestedAmount) {
            this.m_items.delete(item.uid);
            return slot.amount;
        }
        else {
            slot.amount -= requestedAmount;
            return requestedAmount;
        }
    }

    public deleteItem(item: Item): boolean {
        return this.m_items.delete(item.uid);
    }

    public togggleItemLock(item: Item): void {
        const slot = this.getStorageSlot(item);
        if (!slot) {
            throw new Error("Item ${item.id} does not exist in inventory.");
        }

        slot.isLocked = !slot.isLocked
    }

    private getStorageSlot(item: Item): StorageSlot | null {
        return this.m_items.get(item.uid) || null;
    }
}

export class StorageSlot implements IItemQuantity {
    private m_item: Item;
    private m_amount: number;
    private m_isLocked: boolean;

    constructor(item: Item, amount: number) {
        this.m_item = item;
        this.m_amount = amount;
        this.m_isLocked = false;
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