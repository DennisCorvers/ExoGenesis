import { useCallback, useEffect, useState } from 'react';
import { SkillLevelChangedEvent } from '@game/events/skill/SkillLevelChangedEvent';
import React from 'react';
import { ISidebarEntry } from '@game/ui/ISidebarEntry';
import '../Sidebar.css'
import { IGameContext } from '@game/core/IGameContext';
import { EventBus } from '@game/events/EventBus';


interface SidebarItemProps {
    item: ISidebarEntry;
    gameContext: IGameContext;
    onClick: (route: string) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = (props) => {
    const { item, onClick } = props;
    const [info, setInfo] = useState("");

    const onLevelup = useCallback((event: SkillLevelChangedEvent) => {
        setInfo(`Lv ${event.newLevel}`);
    }, []);

    useEffect(() => {
        if (props.item.skill != null) {
            const skillState = props.gameContext.player.skillManager.getSkillState(props.item.skill);
            EventBus.instance.subscribe(`${props.item.skill.id}.levelup`, onLevelup)
            setInfo(`Lv ${skillState.level}`);
        }

        return () => {
            if (props.item.skill != null) {
                EventBus.instance.unsubscribe(`${props.item.skill.id}.levelup`, onLevelup)
            }
        }
    }, []);

    return (
        <div className="sidebar-nav-item" onClick={() => onClick(item.route)}>
            <div className="sidebar-nav-item-content">
                {item.icon && (
                    <span className="sidebar-nav-item-image">
                        <img src={item.icon} alt={`${item.text} icon`} />
                    </span>
                )}
                <span className="sidebar-nav-item-text">{item.text}</span>
                {info !== undefined && (
                    <span className="sidebar-nav-item-info">{info}</span>
                )}
            </div>
        </div>
    );
};

export default SidebarItem;
