import { IStorageSlot } from "@game/systems/storage/IStorageSlot";
import React from "react";
import styles from './StorageGrid.module.css'
import '../../styles/global.css'

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

const getAmountClass = (amount: number) => {
    if (amount >= 10000000) return 'item-amount-million';
    if (amount >= 100000) return 'item-amount-thousand';
    return '';
};

const formatAmount = (amount: number) => {
    if (amount >= 10000000) return `${Math.floor(amount / 1000000).toLocaleString()}M`;
    if (amount >= 100000) return `${Math.floor(amount / 1000).toLocaleString()}K`;
    return amount.toLocaleString();
};

const StorageGridItem: React.FC<StorageGridItemProps> = React.memo(({
    item: slot,
    isLocked,
    itemID,
    amount,
    onSelect
}) => {

    const itemClasses = React.useMemo(() => getStorageItemClasses(isLocked, amount), [isLocked, amount]);
    const amountClass = React.useMemo(() => getAmountClass(amount), [amount]);
    const formattedAmount = React.useMemo(() => formatAmount(amount), [amount]);

    return (
        // Removed the inner 'key' prop as it's already set in the parent component
        <div className={itemClasses} onClick={() => onSelect(slot)}>
            <img src={slot.item.media} alt={slot.item.displayName} className={styles.storageItemIcon} />
            {amount !== 1 && (
                <div className={`${styles.storageItemAmount} ${amountClass}`}>
                    {formattedAmount}
                </div>
            )}
        </div>
    );
});

