import { ISidebarItem } from './ISidebarItem';
import { useCallback, useEffect, useState } from 'react';
import { SkillLevelChangedEvent } from '@game/events/skill/SkillLevelChangedEvent';
import { useEventSubscription } from '../../hooks/EventSubscription'
import '../Sidebar.css'
import React from 'react';

interface SidebarItemProps {
    item: ISidebarItem;
    onClick: (route: string) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = (props) => {
    const { item, onClick } = props;
    const [info, setInfo] = useState(item.info);

    const onInfoChanged = useCallback((event: SkillLevelChangedEvent) => {
        const levelText = `Lv ${event.newLevel}/${event.skillState.skill.LevelCap}`;
        setInfo(levelText);
    }, []);

    useEventSubscription("mineralharvesting.skilllevelchanged", onInfoChanged);

    return (
        <div className="sidebar-nav-item" onClick={() => onClick(item.route)}>
            <div className="sidebar-nav-item-content">
                {item.icon && (
                    <span className="sidebar-nav-item-image">
                        <img src={item.icon} alt={`${item.name} icon`} />
                    </span>
                )}
                <span className="sidebar-nav-item-text">{item.name}</span>
                {item.info !== undefined && (
                    <span className="sidebar-nav-item-info">{info}</span>
                )}
            </div>
        </div>
    );
};

export default SidebarItem;
