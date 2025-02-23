import { Item } from "../entities/Item";

export class StorageManager {
    private m_items: Map<number, StorageSlot>;
    private m_storageSize: number;

    public get ItemsList(): StorageSlot[] {
        return Array.from(this.m_items.values());
    }

    constructor() {
        this.m_items = new Map<number, StorageSlot>();
        this.m_storageSize = 100;
    }

    public AddItem(item: Item, amount: number): boolean {
        if (amount < 0) {
            throw new Error("Amount cannot be negative");
        }

        let slot = this.GetItem(item);
        if (slot) {
            slot.Amount += amount;
            return true;
        }

        if (this.m_items.size >= this.m_storageSize)
            return false;

        slot = new StorageSlot(item, amount);
        this.m_items.set(item.uid, slot);

        return true;
    }

    public GetItem(item: Item): StorageSlot | null {
        return this.m_items.get(item.uid) || null;
    }

    public RemoveAllItem(item: Item): number {
        const slot = this.m_items.get(item.uid);
        if (!slot) {
            throw new Error(`Item ${item.id} does not exist in inventory.`);
        }

        const amount = slot.Amount;
        
        // Don't remove the entire entry, just zero it.
        if (slot.IsLocked) {
            slot.Amount = 0;
        }
        else {
            this.m_items.delete(item.uid);
        }

        return amount;
    }

    public RemoveItem(item: Item, requestedAmount: number): number {
        const slot = this.GetItem(item);
        if (!slot) {
            throw new Error(`Item ${item.id} does not exist in inventory.`);
        }

        if (slot.Amount <= requestedAmount) {
            this.m_items.delete(item.uid);
            return slot.Amount;
        }
        else {
            slot.Amount -= requestedAmount;
            return requestedAmount;
        }
    }

    public DeleteItem(item: Item): boolean {
        return this.m_items.delete(item.uid);
    }

    public TogggleItemLock(item: Item): void {
        const slot = this.GetItem(item);
        if (!slot) {
            throw new Error("Item ${item.id} does not exist in inventory.");
        }

        slot.IsLocked = !slot.IsLocked
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

    public get Item(): Item {
        return this.m_item;
    }

    public get Amount(): number {
        return this.m_amount;
    }

    public set Amount(amount: number) {
        this.m_amount = amount;
    }

    public get IsLocked(): boolean {
        return this.m_isLocked;
    }

    public set IsLocked(isLocked: boolean) {
        this.m_isLocked = isLocked;
    }
}