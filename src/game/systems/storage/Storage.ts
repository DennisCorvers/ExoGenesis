import { Item } from "@game/entities/Item";
import { IStorageSlot } from "./IStorageSlot";
import { IPlayerStorage } from "./IPlayerStorage";
import { IStorageTab } from "./IStorageTab";
import { EventBus } from "@game/events/EventBus";
import { ItemChangedEvent } from "@game/events/storage/ItemChangedEvent";
import { SizeChangedEvent } from "@game/events/storage/SizeChangedEvent";
import { TabsChangedEvent } from "@game/events/storage/TabsChangedEvent";

export class Storage implements IPlayerStorage {
    private m_itemLookup: Map<number, StorageSlot>;
    private m_storageTabs: StorageTab[];
    private m_storageSize: number;
    private m_tabLimit: number;

    public get items(): readonly IStorageSlot[] {
        return Array.from(this.m_itemLookup.values());
    }

    public get storageTabs(): readonly IStorageTab[] {
        return this.m_storageTabs;
    }

    public get storageSize(): number {
        return this.m_storageSize;
    }

    public set storageSize(maxSize: number) {
        this.m_storageSize = maxSize;
        const event = new SizeChangedEvent(this.m_itemLookup.size, this.m_storageSize);
        EventBus.instance.publish('storage.sizeChanged', event);
    }

    public get itemCount(): number {
        return this.m_itemLookup.size;
    }

    public get tabCount(): number {
        return this.m_storageTabs.length;
    }

    public get tabLimit(): number {
        return this.m_tabLimit;
    }

    constructor() {
        this.m_itemLookup = new Map<number, StorageSlot>();
        this.m_storageTabs = [];
        this.m_storageSize = 100;
        this.m_tabLimit = 10;

        // Default tab that is always present.
        this.m_storageTabs.push(new StorageTab(0));
    }

    private innerAddItem(item: Item, amount: number): number {
        if (amount < 0) {
            throw new Error("Amount cannot be negative");
        }

        let slot = this.m_itemLookup.get(item.uid);
        let oldAmount = 0;
        if (slot) {
            oldAmount = slot.amount;
            slot.amount += amount;
        }
        else {
            if (this.m_itemLookup.size >= this.m_storageSize) {
                return 0;
            }

            // Add new slot to index / tab.
            const targetTab = this.getItemDefaultTab(item);
            slot = targetTab.addNewItem(item, amount);
            this.m_itemLookup.set(item.uid, slot);
            EventBus.instance.publish('storage.sizeChanged', new SizeChangedEvent(this.m_itemLookup.size, this.m_storageSize));
        }

        const event = new ItemChangedEvent(slot, oldAmount, slot.amount);
        EventBus.instance.publish('storage.itemChanged', event);
        return amount;
    }

    private innerRemoveItem(itemID: number, amount: number): number {
        if (amount <= 0) {
            throw new Error('Unable to remove zero or negative amount.');
        }

        const slot = this.m_itemLookup.get(itemID);
        if (!slot) {
            throw new Error('Item does not exist in the storage.');
        }

        let satisfiedamount = 0;
        let oldamount = slot.amount;

        if (slot.amount > amount) {
            slot.amount -= amount;
            satisfiedamount = amount;
        }
        else {
            // Not enough to satisfy request, check to delete the slot
            satisfiedamount = slot.amount;

            // Keep locked slots, even at 0.
            if (slot.isLocked) {
                slot.amount = 0;
            }
            // Remove slot entirely if it's not locked.
            else {
                const slotIndex = slot.itemIndex;
                const tab = this.m_storageTabs[slot.tabId];
                tab.removeStorageSlot(slot);

                if (tab.itemCount == 0) {
                    this.ratifyTabs();
                }

                this.m_itemLookup.delete(itemID);

                // If the deleted item was in index 0, tab item needs to change.
                if (slotIndex === 0) {
                    EventBus.instance.publish('storage.tabsChanged', new TabsChangedEvent());
                }
                EventBus.instance.publish('storage.sizeChanged', new SizeChangedEvent(this.m_itemLookup.size, this.m_storageSize));
            }
        }

        const event = new ItemChangedEvent(slot, oldamount, slot.amount);
        EventBus.instance.publish('storage.itemChanged', event);
        return satisfiedamount;
    }

    // TODO: Add remembering what tab an item was last stored.
    private getItemDefaultTab(item: Item): StorageTab {
        return this.m_storageTabs[0];
    }

    public addItem(item: Item, amount: number): number {
        return this.innerAddItem(item, amount);
    }

    public getItem(item: Item): IStorageSlot {
        const slot = this.m_itemLookup.get(item.uid);
        if (!slot) {
            throw new Error('Item does not exist in storage.');
        }

        return slot;
    }

    public removeItemQuantity(item: Item, amount: number): number {
        return this.innerRemoveItem(item.uid, amount);
    }

    public removeAllOfItem(item: Item): number {
        const targetAmount = this.getItemCount(item);
        return this.innerRemoveItem(item.uid, targetAmount);
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

    public filterItems(predicate: (item: IStorageSlot) => boolean): readonly IStorageSlot[] {
        const filtered: IStorageSlot[] = [];
        this.m_itemLookup.forEach((slot) => {
            if (predicate(slot)) {
                filtered.push(slot);
            }
        });

        return filtered;
    }

    public moveItemToTab(item: IStorageSlot, tabID: number | null): boolean {
        const slot = this.m_itemLookup.get(item.slotid);
        if (!slot || slot.tabId === tabID) return false;

        let needsUpdate = slot.itemIndex === 0;
        const tabCount = this.tabCount;

        const tabFrom = this.getTab(slot.tabId);
        if (!tabFrom) return false;

        const tabTo = this.getOrAddTab(tabID);
        if (!tabTo) return false;

        needsUpdate ||= this.tabCount > tabCount;

        tabFrom.removeStorageSlot(slot);
        tabTo.addStorageSlot(slot);

        if (tabFrom.itemCount === 0) {
            this.ratifyTabs();
            needsUpdate = true;
        }

        if (needsUpdate) {
            EventBus.instance.publish('storage.tabsChanged', new TabsChangedEvent());
        }

        return true;
    }

    public moveItemsToTab(items: IStorageSlot[], tabID: number | null = null): boolean {
        if (items.length === 1) {
            return this.moveItemToTab(items[0], tabID);
        }

        // Order moved items by tabIndex so they can be removed / added
        // to a different tab in bulk.
        const itemsByTab = new Map<number, StorageSlot[]>();
        for (const item of items) {
            const slot = this.m_itemLookup.get(item.slotid);
            if (!slot || slot.tabId === tabID) continue;

            let tabItems = itemsByTab.get(slot.tabId);
            if (!tabItems) {
                tabItems = [];
                itemsByTab.set(slot.tabId, tabItems);
            }

            tabItems.push(slot);
        }

        if (itemsByTab.size === 0)
            return false;

        // Move the items from one tab to the new one.
        itemsByTab.forEach((tabItems, tabIndex) => {
            const tabFrom = this.getTab(tabIndex);
            if (!tabFrom) return;

            const tabTo = this.getOrAddTab(tabIndex);
            if (!tabTo) return;

            tabFrom.removeStorageSlots(tabItems);
            tabItems.forEach((slot) => {
                tabTo.addStorageSlot(slot);
            });
        });

        this.ratifyTabs();

        // Just pre-emtively fire an event. It's not like this function is going to see
        // high trafic.
        EventBus.instance.publish('storage.tabsChanged', new TabsChangedEvent());

        return true;
    }

    private getOrAddTab(tabID: number | null): StorageTab | null {
        if (tabID) {
            return this.getTab(tabID);
        }

        if (this.m_storageTabs.length < this.m_tabLimit) {
            const newTab = new StorageTab(this.m_storageTabs.length);
            this.m_storageTabs.push(newTab);
            return newTab;
        }

        return null;
    }

    private getTab(tabID: number): StorageTab | null {
        return (tabID >= 0 && tabID < this.m_storageTabs.length) ? this.m_storageTabs[tabID] : null;
    }

    private ratifyTabs(): boolean {
        const tabCount = this.tabCount;
        for (let i = 1; i < this.m_storageTabs.length; i++) {
            const tab = this.m_storageTabs[i];

            // Remove all tabs that do not have any items.
            if (tab.itemCount > 0) {
                tab.tabIndex = i;
            }
            else {
                this.m_storageTabs.splice(i--, 1);
            }
        }

        return this.tabCount !== tabCount;
    }
}

class StorageTab implements IStorageTab {
    private m_tabItems: StorageSlot[];

    public tabIndex: number;

    public get tabItems(): readonly IStorageSlot[] {
        return this.m_tabItems;
    }

    public get itemCount(): number {
        return this.m_tabItems.length;
    }

    public get tabImage(): string {
        if (this.tabIndex == 0) {
            return 'assets/images/storage/defaultstoragetab.png';
        }

        return this.tabItems.length === 0
            ? ''
            : this.tabItems[0].item.media;
    }

    constructor(initialIndex: number) {
        this.tabIndex = initialIndex;
        this.m_tabItems = [];
    }

    /**
     * Adds a new item to this tab.
     * @param item The item to add to the tab.
     * @param amount The amount of item to add.
     */
    public addNewItem(item: Item, amount: number): StorageSlot {
        const slot = new StorageSlot(item, amount, false, this.tabIndex, this.tabItems.length);
        this.m_tabItems.push(slot);
        return slot;
    }

    /**
     * Moves an existing item slot to this tab.
     * @param slot The item slot to move.
     */
    public addStorageSlot(slot: StorageSlot) {
        slot.tabId = this.tabIndex;
        slot.itemIndex = this.tabItems.length;
        this.m_tabItems.push(slot);
    }

    /**
     * Removes an existing storage slot from this tab.
     * @param slot The slot to remove.
     * @returns 
     */
    public removeStorageSlot(slot: StorageSlot) {
        const index = slot.itemIndex;
        if (index === -1 || slot.tabId != this.tabIndex) {
            return;
        }
        this.m_tabItems.splice(index, 1);

        // Reassign slot indexes
        for (let i = index; i < this.m_tabItems.length; i++) {
            this.m_tabItems[i].itemIndex = i;
        }
    }

    /**
     * Removes multiple storage slots from this tab.
     * Optimised to splice consecutive items (if possible).
     * @param slots The slots to remove from the tab.
     */
    public removeStorageSlots(slots: StorageSlot[]) {
        slots.sort((a, b) => a.itemIndex - b.itemIndex);

        let startIndex = -1;
        let endIndex = -1;
        for (let i = 0; i < slots.length; i++) {
            const slot = slots[i];
            const index = slot.itemIndex;

            if (index === -1 || slot.tabId !== this.tabIndex) {
                continue;
            }

            if (startIndex === -1) {
                startIndex = index;
                endIndex = index;
            } else if (index === endIndex + 1) {
                endIndex = index;
            } else {
                this.m_tabItems.splice(startIndex, endIndex - startIndex + 1);
                startIndex = index;
                endIndex = index;
            }
        }

        if (startIndex !== -1) {
            this.m_tabItems.splice(startIndex, endIndex - startIndex + 1);
        }

        for (let i = 0; i < this.m_tabItems.length; i++) {
            this.m_tabItems[i].itemIndex = i;
        }
    }
}

class StorageSlot implements IStorageSlot {
    private m_item: Item;
    private m_amount: number;
    private m_isLocked: boolean;
    private m_tabId: number;
    private m_itemIndex: number;

    constructor(item: Item, amount: number, isLocked: boolean, tabIndex: number, itemIndex: number) {
        this.m_item = item
        this.m_amount = amount
        this.m_isLocked = isLocked
        this.m_tabId = tabIndex;
        this.m_itemIndex = itemIndex;
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

    public get tabId(): number {
        return this.m_tabId;
    }

    public set tabId(index: number) {
        this.m_tabId = index;
    }

    public get itemIndex(): number {
        return this.m_itemIndex;
    }

    public set itemIndex(index: number) {
        this.m_itemIndex = index;
    }
}

