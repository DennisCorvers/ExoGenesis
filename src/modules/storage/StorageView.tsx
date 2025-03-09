import React, { useCallback, useState } from 'react';
import { IDynamicViewProps } from '@modules/IDynamicViewProps';
import { IStorageSlot } from '@game/systems/storage/IStorageSlot';
import styles from './StoraveView.module.css'

export const StorageView: React.FC<IDynamicViewProps> = ({ gameContext }) => {
    const storageManager = gameContext.player.storage;
    const layoutConfig = gameContext.player.layoutConfig;

    const [items, setItems] = useState<IStorageSlot[]>([]);
    const [selectedItem, setSelectedItem] = useState<IStorageSlot | null>(null);

    const [selectedTab, setSelectedTab] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const [maxCount, setMaxCount] = useState(storageManager.storageSize)
    const [itemCount, setItemCount] = useState(storageManager.itemCount)

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

        setItems(storageManager.items);
    };

    return (
        <div className={styles.storageContainer}>
            <header className={styles.storageHeader}>
                <h2>Storage</h2>
                <span className={styles.storageCount}>
                    {itemCount.toLocaleString()} / {maxCount.toLocaleString()}
                </span>
            </header>
            <div className={styles.storeControls}>
                <input
                    type="text"
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className={styles.storageSearch}
                />
            </div>

            <div className={styles.storageGrid}>
                {items.map(slot => (
                    <div key={slot.slotid} className={styles.storageItem}>
                        <img src={slot.item.media} alt={slot.item.displayName} className={styles.storageItemIcon} />
                        <div className={styles.storageItemAmount}>{slot.amount}</div>
                    </div>
                ))}
                {/* Render empty slots */}
                {Array.from({ length: 100 - items.length }).map((_, idx) => (
                    <div key={`empty-${idx}`} className={styles.storageItemEmpty}></div>
                ))}
            </div>
        </div>
    );
}

export default StorageView;
