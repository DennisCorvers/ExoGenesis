import { IStorageSlot } from "@game/systems/storage/IStorageSlot";
import React from "react";
import styles from './StorageGrid.module.css'

interface StorageGridProps {
    readonly version: number;
    readonly items: readonly IStorageSlot[],
    readonly onSelect: (selectedItem: IStorageSlot) => void;
}

export const StorageGrid: React.FC<StorageGridProps> = React.memo(({
    version,
    items,
    onSelect }) => {

    return (
        <div className={styles.storageGridWrapper}>
            <div className={styles.storageGrid}>
                {items.map((slot: IStorageSlot) => (
                    <StorageGridItem
                        key={slot.slotid}
                        item={slot}
                        isLocked={slot.isLocked}
                        itemID={slot.slotid}
                        amount={slot.amount}
                        onSelect={onSelect} />
                ))}
            </div>
        </div>
    );
});

interface StorageGridItemProps {
    readonly item: IStorageSlot;
    readonly isLocked: boolean;
    readonly itemID: number;
    readonly amount: number;
    readonly onSelect: (selectedItem: IStorageSlot) => void;
}

const getStorageItemClasses = (isLocked: boolean, amount: number) => {
    let classes = [styles.storageItem];

    if (isLocked)
        classes.push(styles.storageItemLocked);

    if (amount === 0)
        classes.push(styles.storageItemEmpty);

    return classes.join(' ');
};

const StorageGridItem: React.FC<StorageGridItemProps> = React.memo(({
    item: slot,
    isLocked,
    itemID,
    amount,
    onSelect
}) => {

    return (
        <div key={slot.slotid} className={getStorageItemClasses(isLocked, amount)} onClick={() => onSelect(slot)}>
            <img src={slot.item.media} alt={slot.item.displayName} className={styles.storageItemIcon} />
            <div className={styles.storageItemAmount}>{amount}</div>
        </div>
    );
});

