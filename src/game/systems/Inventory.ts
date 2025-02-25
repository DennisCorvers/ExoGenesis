import { Item } from "../entities/Item";

export class InventoryManager {
    private m_items: Map<number, StorageSlot>;
    private m_inventorySize: number;

    public get itemsList(): StorageSlot[] {
        return Array.from(this.m_items.values());
    }

    constructor() {
        this.m_items = new Map<number, StorageSlot>();
        this.m_inventorySize = 100;
    }

    public addItem(item: Item, amount: number): boolean {
        if (amount < 0) {
            throw new Error("Amount cannot be negative");
        }

        let slot = this.getItem(item);
        if (slot) {
            slot.amount += amount;
            return true;
        }

        if (this.m_items.size >= this.m_inventorySize)
            return false;

        slot = new StorageSlot(item, amount);
        this.m_items.set(item.uid, slot);

        return true;
    }

    public getItem(item: Item): StorageSlot | null {
        return this.m_items.get(item.uid) || null;
    }

    public removeAllItem(item: Item): number {
        const slot = this.m_items.get(item.uid);
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
        const slot = this.getItem(item);
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
        const slot = this.getItem(item);
        if (!slot) {
            throw new Error("Item ${item.id} does not exist in inventory.");
        }

        slot.isLocked = !slot.isLocked
    }
}

export class StorageSlot {
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