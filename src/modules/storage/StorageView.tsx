import React, { useCallback, useEffect, useState } from 'react';
import { IDynamicViewProps } from '@modules/IDynamicViewProps';
import { IStorageSlot } from '@game/systems/storage/IStorageSlot';
import { StorageTabs } from './StorageTabs';
import { StorageGrid } from './StorageGrid';
import { IStorageTab } from '@game/systems/storage/IStorageTab';
import { ItemChangedEvent } from '@game/events/storage/ItemChangedEvent';
import { TabsChangedEvent } from '@game/events/storage/TabsChangedEvent';
import { useEventSubscription } from '@hooks/EventSubscription';
import styles from './StorageView.module.css'
import { SizeChangedEvent } from '@game/events/storage/SizeChangedEvent';


export const StorageView: React.FC<IDynamicViewProps> = ({ gameContext }) => {
    const storage = gameContext.player.storage;
    const layoutConfig = gameContext.player.layoutConfig;

    const [items, setItems] = useState<readonly IStorageSlot[]>([]);
    const [selectedItem, setSelectedItem] = useState<IStorageSlot | null>(null);
    const [storageTabs, setStorageTabs] = useState<readonly IStorageTab[]>(storage.storageTabs);

    const [maxItems, setMaxItems] = useState<number>(storage.storageSize);
    const [itemCount, setItemCount] = useState<number>(storage.itemCount);
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const [version, forceUpdate] = useState<number>(0);

    const handleTabSelection = useCallback((tabIndex: number) => {
        console.log("tab selected " + tabIndex);
        layoutConfig.selectedStorageTab = tabIndex;

        setSelectedTab(tabIndex);
    }, []);

    const onItemSelected = useCallback((storageSlot: IStorageSlot) => {
        console.log("Selected item " + storageSlot.item.displayName);
        setSelectedItem(storageSlot);
    }, []);

    const sortStorage = () => {
        // TODO: Add sort option filtering.
        console.log("Setting new items for view...");
        if (selectedTab === 0) {
            setItems(storage.items);
        } else {
            const tab = storageTabs[selectedTab];
            setItems(tab.tabItems);
        }
    };

    const getSelectedTab = useCallback((tabIndex: number) => {
        if (tabIndex >= 0 && tabIndex < storageTabs.length) {
            return storageTabs[tabIndex];
        }
        return storageTabs[0];
    }, [storageTabs]);

    const onItemChanged = useCallback((event: ItemChangedEvent) => {
        const slot = event.item;
        // Check if this is the same storage tab as what is being viewed.
        if (slot.tabId === selectedTab || slot.tabId === 0) {
            forceUpdate(x => x + 1);
        }
    }, [selectedTab]);

    const onTabsChanged = useCallback((event: TabsChangedEvent) => {
        console.log('something changed in tabs');
        if (selectedTab >= storage.tabCount) {
            setSelectedTab(0);
        }

        setStorageTabs([...storage.storageTabs]);
    }, [])

    const onSizeChanged = useCallback((event: SizeChangedEvent) => {
        setMaxItems(event.storageSize);
        setItemCount(event.storageCount);
    }, [])

    useEffect(() => {
        setStorageTabs(storage.storageTabs);
        setSelectedTab(layoutConfig.selectedStorageTab);
    }, [gameContext])

    useEffect(() => {
        //sortStorage();
    }, [selectedTab])

    useEventSubscription(`storage.itemChanged`, onItemChanged);
    useEventSubscription(`storage.tabsChanged`, onTabsChanged);
    useEventSubscription(`storage.sizeChanged`, onSizeChanged);

    return (
        <div className={styles.storageContainer}>
            <header className={styles.storageHeader}>
                <h2>Storage</h2>
                <span className={styles.storageCount}>
                    {itemCount.toLocaleString()} / {maxItems.toLocaleString()}
                </span>
            </header>

            <StorageTabs
                initialActiveTab={getSelectedTab(layoutConfig.selectedStorageTab)}
                tabs={storage.storageTabs}
                onTabSelect={handleTabSelection} />

            <div className={styles.storageGrid}>
                {selectedTab === 0 ? (
                    storage.storageTabs.map((tab, index) => (
                        <div key={index}>
                            <span className={styles.storageGridTitle}>{`Tab ${tab.tabIndex + 1}`}</span>
                            <StorageGrid
                                version={version}
                                items={tab.tabItems}
                                onSelect={onItemSelected} />
                        </div>
                    ))
                ) : (
                    <StorageGrid
                        version={version}
                        items={storage.storageTabs[selectedTab].tabItems}
                        onSelect={onItemSelected} />
                )}
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
