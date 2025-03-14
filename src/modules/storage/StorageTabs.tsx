import React, { useEffect, useState } from 'react';
import { IStorageTab } from '@game/systems/storage/IStorageTab';
import styles from './StorageView.module.css'

interface StorageTabsProps {
    tabs: readonly IStorageTab[];
    initialActiveTab: IStorageTab;
    onTabSelect: (tabIndex: number) => void;
}

export const StorageTabs: React.FC<StorageTabsProps> = React.memo(({ tabs, initialActiveTab, onTabSelect }) => {
    const [activeTab, setActiveTab] = useState<IStorageTab>(initialActiveTab)

    useEffect(() => {
        setActiveTab(initialActiveTab);
    }, [tabs, initialActiveTab]);

    const handleTabClick = (tab: IStorageTab) => {
        if (tab.tabIndex !== activeTab.tabIndex) {
            setActiveTab(tab);
            onTabSelect(tab.tabIndex);
        }
    };

    return (
        <div className={styles.storageTabs}>
            {tabs?.map((tab) => (
                <div
                    key={tab.tabIndex}
                    className={`${styles.storageTab} ${tab.tabIndex === activeTab?.tabIndex ? styles.selectedTab : ''}`}
                    onClick={() => handleTabClick(tab)}>
                    <img src={tab.tabImage} className={styles.tabIcon} />
                </div>
            ))}
        </div>
    );
});