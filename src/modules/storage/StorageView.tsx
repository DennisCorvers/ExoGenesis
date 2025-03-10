import React, { useCallback, useEffect, useState } from 'react';
import { IDynamicViewProps } from '@modules/IDynamicViewProps';
import { IStorageSlot } from '@game/systems/storage/IStorageSlot';
import { StorageTabs } from './StorageTabs';
import { IPlayerStorage } from '@game/systems/storage/IPlayerStorage';
import styles from './StorageView.module.css'

interface StorageTab {
    tabIndex: number,
    media: string,
}

const constructTabs = (storage: IPlayerStorage) => {
    // TODO: Add other storage tabs.
    const tabs: StorageTab[] = [];
    tabs.push({ tabIndex: 0, media: 'assets/images/storage/defaultstoragetab.png' });
    return tabs;
}

export const StorageView: React.FC<IDynamicViewProps> = ({ gameContext }) => {
    const storage = gameContext.player.storage;
    const layoutConfig = gameContext.player.layoutConfig;

    const [items, setItems] = useState<readonly IStorageSlot[]>([]);
    const [selectedItem, setSelectedItem] = useState<IStorageSlot | null>(null);

    const [selectedTab, setSelectedTab] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const [maxCount, setMaxCount] = useState(storage.storageSize)
    const [itemCount, setItemCount] = useState(storage.itemCount)
    const [storageTabs, setStorageTabs] = useState<StorageTab[]>([])

    const handleTabSelection = useCallback((tabIndex: number) => {
        console.log("tab select");
        layoutConfig.selectedStorageTab = tabIndex;

        setSelectedTab(tabIndex);
    }, []);

    const onItemSelected = useCallback((storageSlot: IStorageSlot) => {
        console.log("Selected item" + storageSlot.item.displayName);
        setSelectedItem(storageSlot);
    }, []);

    const updateStorage = useCallback((changedItem: IStorageSlot) => {

    }, []);

    const sortStorage = () => {
        // TODO: Add sort option filtering.
        // Switch inventory to selected tab (by filtering items)

        setItems(storage.items);
    };

    useEffect(() => {
        const tabs = constructTabs(storage);

        setStorageTabs(tabs);
        setSelectedTab(layoutConfig.selectedStorageTab);

        return () => {
            // Remove event listener (if using real events)
        };
    }, [gameContext])

    useEffect(() => {
        if (!selectedTab) {
            sortStorage();
        }
    }, [selectedTab])

    return (
        <div className={styles.storageContainer}>
            <header className={styles.storageHeader}>
                <h2>Storage</h2>
                <span className={styles.storageCount}>
                    {itemCount.toLocaleString()} / {maxCount.toLocaleString()}
                </span>
            </header>

            <StorageTabs
                initialActiveTab={storageTabs[0]}
                tabs={storageTabs}
                onTabSelect={handleTabSelection} />

            <div className={styles.storageGrid}>
                {items.map(slot => (
                    <div key={slot.slotid} className={styles.storageItem}>
                        <img src={slot.item.media} alt={slot.item.displayName} className={styles.storageItemIcon} />
                        <div className={styles.storageItemAmount}>{slot.amount}</div>
                    </div>
                ))}
            </div>

            <div className={styles.storeControls}>
                <input
                    type="text"
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className={styles.storageSearch}
                />
            </div>
        </div>
    );
}

export default StorageView;
