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
                {sortOptions.map((option) => (
                    <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                ))}
            </select>
            <button className={styles.sortButton} onClick={handleSortClick}>Sort</button>
        </div>
    );
});