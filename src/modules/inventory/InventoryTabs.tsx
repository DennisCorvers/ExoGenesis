import React, { useEffect, useMemo, useState } from 'react';
import styles from './InventoryMenu.module.css';
import { IInventoryTab } from '@game/ui/IInventoryTab';

interface InventoryTabProps {
    tabs: IInventoryTab[];
    initialActiveTab: string;
    onTabSelect: (tab: IInventoryTab) => void;
}

export const InventoryTabs: React.FC<InventoryTabProps> = React.memo(({ tabs, initialActiveTab, onTabSelect }) => {
    const [activeTab, setActiveTab] = useState<string>(initialActiveTab)

    useEffect(() => {
        setActiveTab(initialActiveTab);
    }, [initialActiveTab]);

    const handleTabClick = (tab: IInventoryTab) => {
        if (tab.tabID !== activeTab) {
            setActiveTab(tab.tabID);
            onTabSelect(tab);
        }
    };

    return (
        <div className={styles.inventoryTabs}>
            {tabs?.map((tab) => (
                <div
                    key={tab.tabID}
                    className={`${styles.inventoryTab} ${tab.tabID === activeTab ? styles.selectedTab : ''}`}
                    onClick={() => handleTabClick(tab)}>
                    <img src={tab.media} className={styles.tabIcon} />
                </div>
            ))}
        </div>
    );
});