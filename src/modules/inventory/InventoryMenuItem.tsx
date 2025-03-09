import { IStorageSlot } from "@game/systems/storage/IStorageSlot";
import React, { useMemo } from "react";
import './InventoryMenuItem.css'

interface InventoryMenuItemProps {
    slot: IStorageSlot;
    onSelect: (selectedItem: IStorageSlot) => void;
}

export const InventoryMenuItem: React.FC<InventoryMenuItemProps> = React.memo(({
    slot: inventoryItem,
    onSelect: onSelect }) => {
    const item = inventoryItem.item;

    const inventoryEntryClass = useMemo(() => {
        return inventoryItem.isLocked ? "inventory-entry locked" : "inventory-entry";
    }, [inventoryItem.isLocked]);

    return (
        <div className={inventoryEntryClass} onClick={() => onSelect(inventoryItem)}>
            <img className="inventory-itemicon"></img>
            <span className="inventory-entry-text">{item.displayName}</span>
            <div className="inventory-entry-details"> 
                <div className="inventory-amount">{inventoryItem.amount.toLocaleString()}</div>
            </div>
        </div>
    );
});