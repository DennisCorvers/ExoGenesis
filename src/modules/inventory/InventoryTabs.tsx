import React, { useEffect, useState } from 'react';
import styles from './InventoryMenu.module.css';

interface IInventoryTab {
    tabID: string;
    media: string;
}

interface InventoryTabProps {
    tabs: IInventoryTab[];
    initialActiveTab: IInventoryTab;
    onTabSelect: (tab: IInventoryTab) => void;
}

export const InventoryTabs: React.FC<InventoryTabProps> = React.memo(({ tabs, initialActiveTab, onTabSelect }) => {
    const [activeTab, setActiveTab] = useState<IInventoryTab>(initialActiveTab)

    useEffect(() => {
        setActiveTab(initialActiveTab);
    }, [initialActiveTab]);

    const handleTabClick = (tab: IInventoryTab) => {
        if (tab.tabID !== activeTab.tabID) {
            setActiveTab(tab);
            onTabSelect(tab);
        }
    };

    return (
        <div className={styles.inventoryTabs}>
            {tabs?.map((tab) => (
                <div
                    key={tab.tabID}
                    className={`${styles.inventoryTab} ${tab.tabID === activeTab?.tabID ? styles.selectedTab : ''}`}
                    onClick={() => handleTabClick(tab)}>
                    <img src={tab.media} className={styles.tabIcon} />
                </div>
            ))}
        </div>
    );
});