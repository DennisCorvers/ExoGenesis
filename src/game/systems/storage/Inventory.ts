import { Item } from "@game/entities/Item";
import { IStorageSlot } from "./IStorageSlot";


export class Inventory {
    // Holds all unique (visual) inventory slots where Key is an inventory-bound unique identifier.
    private m_items: Map<number, InventorySlot>
    private m_stackables: Map<number, InventorySlot>;
    private m_nonStackables: Map<number, InventorySlot[]>;
    private m_uniqueIdentifier: number;

    private m_inventorySize: number;

    public get items(): IStorageSlot[] {
        return [...this.m_items.values()]
    }

    public get itemCount(): number {
        return this.m_items.size;
    }

    public get storageSize(): number {
        return this.m_inventorySize;
    }

    constructor() {
        this.m_items = new Map();
        this.m_stackables = new Map();
        this.m_nonStackables = new Map();
        this.m_uniqueIdentifier = 0;
        this.m_inventorySize = 100;
    }

    public addItem(item: Item, amount: number): number {
        if (this.itemCount >= this.m_inventorySize) {
            return 0;
        }

        if (item.isStackable) {
            return this.addStackableItem(item, amount);
        }

        else {
            return this.addNonStackableItem(item, amount);
        }
    }

    private addStackableItem(item: Item, amount: number): number {
        const slot = this.m_stackables.get(item.uid);

        // TODO: Limit amount of items per stack in inventory.
        if (slot != null) {
            slot.amount += amount;
            return amount;
        }
        else {
            const uid = this.m_uniqueIdentifier++;
            const newSlot = new InventorySlot(item, amount, false, uid);

            this.m_items.set(uid, newSlot);
            this.m_stackables.set(item.uid, newSlot);
            return amount;
        }
    }

    private addNonStackableItem(item: Item, amount: number): number {
        const availableSlots = this.m_inventorySize - this.itemCount
        const itemsToAdd = Math.min(amount, availableSlots);

        for (let i = 0; i < itemsToAdd; i++) {
            const uid = this.m_uniqueIdentifier++;
            const newSlot = new InventorySlot(item, 1, false, uid);

            const slots = this.m_nonStackables.get(item.uid) || [];
            slots.push(newSlot);

            this.m_items.set(uid, newSlot)
            this.m_nonStackables.set(item.uid, slots);
        }

        return itemsToAdd;
    }

    public hasItemAmount(item: Item, amount: number): boolean {
        return this.getItemCount(item) >= amount;
    }

    public getItemCount(item: Item) {
        return item.isStackable
            ? this.m_stackables.get(item.uid)?.amount || 0
            : this.m_nonStackables.get(item.uid)?.length || 0;
    }

    /**
     * Subtracts a specified amount of item from a storage slot. Storage slot is removed if it reaches zero (unless locked)
     * @param targetSlot The storage slot to remove a certain amount from
     * @param requestedAmount The amount of item to remove
     * @returns the amount of item subtracted from the slot.
     */
    public removeStorageSlotQuantity(targetSlot: IStorageSlot, requestedAmount: number): number {
        const slot = this.m_items.get(targetSlot.slotid);
        if (slot == null || requestedAmount < 1) {
            return 0;
        }

        const toRemove = Math.min(slot.amount, requestedAmount);
        const item = slot.item;
        if (item.isStackable) {
            this.removeStackableItem(item, requestedAmount);
        }
        else {
            this.removeNonStackableSlot(targetSlot);
        }

        return toRemove;
    }

    /**
     * Removes (subtracts) a certain amount for a specified item. Entry is removed entirely if it reaches zero (unless locked).
     * @param item The item to subtract the amount from
     * @param requestedAmount The amount of item to subtract
     * @returns the amount of item subtracted.
     */
    public removeItemQuantity(item: Item, requestedAmount: number): number {
        if (requestedAmount < 1)
            return 0;

        if (item.isStackable) {
            return this.removeStackableItem(item, requestedAmount);
        }
        else {
            return this.removeNonStackableItem(item, requestedAmount);
        }
    }

    /**
     * Removes as much of an item from the inventory as possible.
     * @param item The item to entirely remove.
     * @returns the total amount of item removed.
     */
    public removeAllOfItem(item: Item): number {
        return this.removeItemQuantity(item, Infinity);
    }

    /**
     * Entirely removes the item(s) from the given storage slot, provided it isn't locked.
     * @param targetSlot The slot to remove from the inventory.
     * @returns true if the entry was deleted.
     */
    public deleteStorageSlot(targetSlot: IStorageSlot): boolean {
        const slot = this.m_items.get(targetSlot.slotid);
        if (slot == null || slot.isLocked)
            return false;

        if (slot.item.isStackable) {
            // throw event
            this.m_items.delete(slot.slotid);
            this.m_stackables.delete(slot.item.uid);
            return true;
        }
        else {
            this.removeNonStackableSlot(slot);
        }

        return true;
    }

    public findItems(predicate: (item: IStorageSlot) => boolean): IStorageSlot[] {
        const foundItems: IStorageSlot[] = [];
        this.m_items.forEach((item: IStorageSlot) => {
            if (predicate(item)) {
                foundItems.push(item);
            }
        });
        return foundItems;
    }

    private removeStackableItem(item: Item, amount: number): number {
        const slot = this.m_stackables.get(item.uid);
        if (slot == null)
            return 0;

        if (slot.amount > amount) {
            slot.amount -= amount;
            return amount;
        }

        const removedAmount = slot.amount;
        slot.amount = 0;

        // If the item is not locked, we have to remove it from the inventory and mapping.
        if (!slot.isLocked) {
            this.m_stackables.delete(item.uid);
            this.m_items.delete(slot.slotid);
        }

        return removedAmount;
    }

    private removeNonStackableItem(item: Item, amount: number): number {
        const slots = this.m_nonStackables.get(item.uid);
        if (slots == null)
            return 0;

        let removedCount = 0;

        for (let i = slots.length - 1; i >= 0 && removedCount < amount; i--) {
            const slot = slots[i];

            if (slot.isLocked) {
                continue;
            }

            const [removedSlot] = slots.splice(i, 1);
            this.m_items.delete(removedSlot.slotid);
            removedCount++;
        }

        if (slots.length === 0) {
            this.m_nonStackables.delete(item.uid);
        } else {
            this.m_nonStackables.set(item.uid, slots);
        }

        return removedCount;
    }

    private removeNonStackableSlot(storageSlot: IStorageSlot): number {
        const slot = this.m_items.get(storageSlot.slotid);
        if (slot == null || slot.isLocked) {
            return 0;
        }

        const item = slot.item;
        const nonStackableSlots = this.m_nonStackables.get(item.uid);
        if (nonStackableSlots != null) {
            const index = nonStackableSlots.findIndex(s => s.slotid === slot.slotid);
            if (index !== -1) {
                nonStackableSlots.splice(index, 1);
                this.m_items.delete(slot.slotid);
            }

            if (nonStackableSlots.length === 0) {
                this.m_nonStackables.delete(item.uid);
            } else {
                this.m_nonStackables.set(item.uid, nonStackableSlots);
            }
        }

        return slot.amount;
    }
}


class InventorySlot implements IStorageSlot {
    private m_item: Item;
    private m_amount: number;
    private m_isLocked: boolean;
    private m_inventoryID: number;

    constructor(item: Item, amount: number, isLocked: boolean, inventoryID: number) {
        this.m_item = item
        this.m_amount = amount
        this.m_isLocked = isLocked
        this.m_inventoryID = inventoryID
    }
    get tabId(): number {
        throw new Error("Method not implemented.");
    }
    public get slotid(): number {
        return this.m_inventoryID;
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