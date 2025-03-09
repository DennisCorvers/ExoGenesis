import { act, useCallback, useEffect, useState } from "react";
import { InventoryMenuItem } from "./InventoryMenuItem";
import { IStorageSlot } from "@game/systems/storage/IStorageSlot";
import { IDynamicViewProps } from "@modules/IDynamicViewProps";
import { InventoryTabs } from "./InventoryTabs";
import { InventorySorting } from "./InventorySorting";
import styles from './InventoryMenu.module.css';

{/*
const sortOptions: string[] = [
    'Name',
    'Value',
    'Locked'
];

const filterInventory = (tab: IInventoryTab) => (itemSlot: IStorageSlot) => {
    return tab.itemTypes.length === 0 || tab.itemTypes.includes(itemSlot.item.type)
}

interface InventoryOptions {
    selectedSort: string | null,
    selectedTab: IInventoryTab | null,
    sortDescending: boolean,
}

export const InventoryMenu: React.FC<IDynamicViewProps> = ({ gameContext }) => {
    const inventoryLayout = gameContext.layout.inventoryLayout;
    const inventoryManager = gameContext.player.inventory;
    const layoutConfig = gameContext.player.layoutConfig;

    const [inventoryOptions, setInventoryOptions] = useState<InventoryOptions>({
        selectedTab: null,
        selectedSort: 'Name',
        sortDescending: false,
    });

    const [inventory, setInventory] = useState<IStorageSlot[]>();
    const [selectedItem, setSelectedItem] = useState<IStorageSlot | null>(null);

    const [maxCount, setMaxCount] = useState(inventoryManager.storageSize)
    const [itemCount, setItemCount] = useState(inventoryManager.itemCount)

    const handleTabSelection = useCallback((tab: IInventoryTab) => {
        console.log("tab select");
        layoutConfig.selectedInventoryTab = tab.tabID;
        setInventoryOptions((prev) => ({
            ...prev,
            selectedTab: tab,
        }));
    }, []);

    const onSortClick = useCallback((sortOption: string) => {
        console.log('sort click')
        layoutConfig.selectedInventorySort = sortOption;
        setInventoryOptions((prev) => ({
            ...prev,
            selectedSort: sortOption,
        }));
    }, [])

    const onItemSelected = useCallback((storageSlot: IStorageSlot) => {
        console.log("Selected item" + storageSlot.item.displayName);
        setSelectedItem(storageSlot);
    }, []);

    const updateInventory = useCallback((changedItem: IStorageSlot) => {

    }, []);

    const sortInventory = () => {
        // TODO: Add sort option filtering.
        // Switch inventory to selected tab (by filtering items)
        const selectedTab = inventoryOptions.selectedTab;
        const filteredItems = inventoryManager.items
            .filter(filterInventory(selectedTab!))
            .sort((a, b) => a.item.displayName.localeCompare(b.item.displayName));

        setInventory(filteredItems);
    };

    useEffect(() => {
        const tabs = inventoryLayout.inventoryTabs;
        if (layoutConfig.selectedInventoryTab == null) {
            layoutConfig.selectedInventoryTab = tabs[0]?.tabID;
        }

        if (layoutConfig.selectedInventorySort == null) {
            layoutConfig.selectedInventorySort = sortOptions[0];
        }

        const tabToLoad = tabs.find(x => x.tabID === layoutConfig.selectedInventoryTab) || tabs[0];

        setInventoryOptions({
            selectedTab: tabToLoad,
            selectedSort: layoutConfig.selectedInventorySort,
            sortDescending: false
        });

        return () => {
            // Remove event listener (if using real events)
        };
    }, [gameContext]);

    useEffect(() => {
        if (!inventoryOptions.selectedTab || !inventoryOptions.selectedSort) {
            return;
        }

        sortInventory();
    }, [inventoryOptions])

    return (
        <div className={styles.inventory}>
            <header className={styles.inventoryHeader}>
                <h2>Inventory</h2>
                <span className={styles.inventoryCount}>
                    {itemCount.toLocaleString()} / {maxCount.toLocaleString()}
                </span>
            </header>

            <InventoryTabs
                initialActiveTab={inventoryOptions.selectedTab!}
                tabs={inventoryLayout.inventoryTabs}
                onTabSelect={handleTabSelection} />

            <InventorySorting
                initialSort={inventoryOptions.selectedSort!}
                sortOptions={sortOptions}
                sortDescending={inventoryOptions.sortDescending}
                onSortClick={onSortClick} />

            <div className={styles.inventoryContainer}>
                {inventory?.map((slot: IStorageSlot) => (
                    <InventoryMenuItem key={slot.slotid} slot={slot} onSelect={onItemSelected} />
                ))}
            </div>

            <div className={styles.inventorySearch}>
                <input type="text" placeholder="Search inventory..." />
            </div>
        </div>
    );
};

export default InventoryMenu;
*/}