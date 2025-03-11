import { IStorageSlot } from "@game/systems/storage/IStorageSlot";
import React from "react";
import styles from './StorageGrid.module.css'

interface StorageGridProps {
    readonly items: readonly IStorageSlot[],
    readonly onSelect: (selectedItem: IStorageSlot) => void;
}

export const StorageGrid: React.FC<StorageGridProps> = React.memo(({
    items,
    onSelect }) => {

    return (
        <div className={styles.storageGridWrapper}>
            <div className={styles.storageGrid}>
                {items.map((slot: IStorageSlot) => (
                    <StorageGridItem key={slot.slotid} item={slot} onSelect={onSelect} />
                ))}
            </div>
        </div>
    );
});

interface StorageGridItemProps {
    readonly item: IStorageSlot;
    readonly onSelect: (selectedItem: IStorageSlot) => void;
}

const getStorageItemClasses = (slot : IStorageSlot) => {
    let classes = [styles.storageItem];

    if (slot.isLocked)
        classes.push(styles.storageItemLocked);

    if (slot.amount === 0)
        classes.push(styles.storageItemEmpty);

    return classes.join(' ');
};

const StorageGridItem: React.FC<StorageGridItemProps> = React.memo(({
    item: slot,
    onSelect }) => {

    return (
        <div key={slot.slotid} className={getStorageItemClasses(slot)} onClick={() => onSelect(slot)}>
            <img src={slot.item.media} alt={slot.item.displayName} className={styles.storageItemIcon} />
            <div className={styles.storageItemAmount}>{slot.amount}</div>
        </div>
    );
});