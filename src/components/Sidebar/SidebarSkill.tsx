import { useCallback, useEffect, useState } from 'react';
import { SkillLevelChangedEvent } from '@game/events/skill/SkillLevelChangedEvent';
import React from 'react';
import { ISidebarEntry } from '@game/ui/ISidebarEntry';
import { IPlayerContext } from '@game/systems/IPlayerContext';
import '../Sidebar.css'
import { EventBus } from '@game/events/EventBus';

interface SidebarItemProps {
    item: ISidebarEntry;
    player: IPlayerContext;
    onClick: (route: string) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = (props) => {
    const { item, onClick } = props;
    const [info, setInfo] = useState("");

    const onLevelup = useCallback((event: SkillLevelChangedEvent) => {
        setInfo(`${event.newLevel} / ${event.newLevel}`)
    }, []);

    useEffect(() => {
        const skill = props.item.skill;
        if (!skill) {
            throw Error("No skill available in this skill bar entry.");
        }

        const skillState = props.player.skills.getSkillState(skill);
        EventBus.instance.subscribe(`${skill.id}.levelChanged`, onLevelup)
        setInfo(`${skillState.level} / ${skillState.level}`)

        return () => {
            if (skill != null) {
                EventBus.instance.unsubscribe(`${skill.id}.levelChanged`, onLevelup)
            }
        }
    }, [props]);

    return (
        <div className="sidebar-nav-item" onClick={() => onClick(item.route)}>
            <div className="sidebar-nav-item-content">
                <img src={item.icon} alt={item.text} className='sidebar-nav-item-image' />
                <span className="sidebar-nav-item-text">{item.text}</span>
                <span className="sidebar-nav-item-info">{info}</span>
            </div>
        </div>
    );
};

export default SidebarItem;
