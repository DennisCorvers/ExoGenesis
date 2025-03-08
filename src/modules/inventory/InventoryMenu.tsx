import { act, useCallback, useEffect, useState } from "react";
import { InventoryMenuItem } from "./InventoryMenuItem";
import { IStorageSlot } from "@game/systems/storage/IStorageSlot";
import { IDynamicViewProps } from "@modules/IDynamicViewProps";
import { InventoryTabs } from "./InventoryTabs";
import { IInventoryTab } from "@game/ui/IInventoryTab";
import styles from './InventoryMenu.module.css';

// Dirty way to keep the inventory state through the duration of the app.
// We do not care about persisting this.
class InventoryState {
    static selectedTab: string | null;
}

export const InventoryMenu: React.FC<IDynamicViewProps> = ({ gameContext }) => {
    const inventoryLayout = gameContext.layout.inventoryLayout;
    const inventoryManager = gameContext.player.inventory;

    const [selectedTab, setSelectedTab] = useState<string>(InventoryState.selectedTab!);
    const [inventory, setInventory] = useState<IStorageSlot[]>();
    const [selectedItem, setSelectedItem] = useState<IStorageSlot | null>(null);

    const [maxCount, setMaxCount] = useState(inventoryManager.storageSize)
    const [itemCount, setItemCount] = useState(inventoryManager.itemCount)

    const filterInventory = useCallback((tab: IInventoryTab) => (itemSlot: IStorageSlot) =>
        tab.itemTypes.length === 0 || tab.itemTypes.includes(itemSlot.item.type), []
    );

    const handleTabSelection = useCallback((tab: IInventoryTab) => {
        console.log(`Selected tab: ${tab.tabName}`);
        InventoryState.selectedTab = tab.tabID;

        // Switch inventory to selected tab (by filtering items)
        const sortedItems = inventoryManager.items
            .filter(filterInventory(tab))
            .sort((a, b) => a.item.displayName.localeCompare(b.item.displayName));

        setInventory(sortedItems);
    }, []);

    const onItemSelected = useCallback((storageSlot: IStorageSlot) => {

    }, []);

    const updateInventory = useCallback((changedItem: IStorageSlot) => {

    }, []);

    useEffect(() => {
        const tabs = inventoryLayout.inventoryTabs;
        if (InventoryState.selectedTab == null) {
            InventoryState.selectedTab = tabs[0]?.tabID;
        }

        const tabToLoad = tabs.find(x => x.tabID === InventoryState.selectedTab) || tabs[0];
        setSelectedTab(tabToLoad.tabID);
        handleTabSelection(tabToLoad);

        return () => {
            // Remove event listener (if using real events)
        };
    }, [gameContext]);

    return (
        <div className={styles.inventory}>
            {/* Header */}
            <header className={styles.inventoryHeader}>
                <h2>Inventory</h2>
                <span className={styles.inventoryCount}>
                    {itemCount.toLocaleString()} / {maxCount.toLocaleString()}
                </span>
            </header>

            {/* Tabs */}
            <InventoryTabs initialActiveTab={selectedTab!} tabs={inventoryLayout.inventoryTabs} onTabSelect={handleTabSelection} />

            {/* Sort Options */}
            <div className={styles.inventorySort}>
                <select className={styles.sortDropdown}>
                    <option value="name">Name</option>
                    <option value="amount">Amount</option>
                    <option value="attack">Attack</option>
                </select>
                <button className={styles.sortButton}>Sort</button>
            </div>

            {/* Inventory Items */}
            <div className={styles.inventoryContainer}>
                {inventory?.map((slot: IStorageSlot) => (
                    <InventoryMenuItem key={slot.slotid} slot={slot} onSelect={onItemSelected} />
                ))}
            </div>

            {/* Search Box */}
            <div className={styles.inventorySearch}>
                <input type="text" placeholder="Search inventory..." />
            </div>
        </div>
    );
};

export default InventoryMenu;