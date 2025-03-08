import { useCallback, useEffect, useState } from "react";
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

    const [activeTab, setActiveTab] = useState<IInventoryTab>();
    const [inventory, setInventory] = useState<IStorageSlot[]>(inventoryManager.items);
    const [selectedItem, setSelectedItem] = useState<IStorageSlot | null>(null);

    const [maxCount, setMaxCount] = useState(inventoryManager.storageSize)
    const [itemCount, setItemCount] = useState(inventoryManager.itemCount)


    const handleTabSelection = (tab: IInventoryTab) => {
        console.log(`Selected tab: ${tab.tabName}`);
        setActiveTab(tab);
        // Switch inventory to selected tab (by filtering items)
    };

    const onItemSelected = useCallback((storageSlot: IStorageSlot) => {
        gameContext
    }, []);

    useEffect(() => {
        if (!InventoryState.selectedTab) {
            InventoryState.selectedTab = inventoryLayout.inventoryTabs[0].tabID;
        }

        const updateInventory = (changedItem: IStorageSlot) => {

        };

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
            <InventoryTabs initialActiveTab={InventoryState.selectedTab!} tabs={inventoryLayout.inventoryTabs} onTabSelect={handleTabSelection} />

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
                {inventory.map((slot: IStorageSlot) => (
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