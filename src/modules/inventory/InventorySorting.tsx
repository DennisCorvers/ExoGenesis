import React, { useEffect, useState } from 'react';
import styles from './InventoryMenu.module.css';

interface InventorySortingProps {
    sortOptions: string[],
    initialSort: string,
    sortDescending: boolean,
    onSortClick: (sortOption: string) => void;
}

export const InventorySorting: React.FC<InventorySortingProps> = React.memo(({ sortOptions, initialSort, sortDescending, onSortClick }) => {
    const [sortOption, setSortOption] = useState<string>(initialSort)

    useEffect(() => {
        setSortOption(initialSort);
    }, [initialSort]);


    const handleSortClick = () => {
        onSortClick(sortOption);
    };

    return (
        <div className={styles.inventorySort}>
            <select
                className={styles.sortDropdown}
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}>
                <option value="name">Name</option>
                <option value="amount">Amount</option>
                <option value="attack">Attack</option>
            </select>
            <button className={styles.sortButton} onClick={handleSortClick}>Sort</button>
        </div>
    );
});