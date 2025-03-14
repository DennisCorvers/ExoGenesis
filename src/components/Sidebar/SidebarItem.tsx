import { useCallback, useEffect, useState } from 'react';
import React from 'react';
import { ISidebarEntry } from '@game/ui/ISidebarEntry';
import '../Sidebar.css'
import { IPlayerContext } from '@game/systems/IPlayerContext';
import { EventBus } from '@game/events/EventBus';
import { SizeChangedEvent } from '@game/events/storage/SizeChangedEvent';


interface SidebarItemProps {
    item: ISidebarEntry;
    player: IPlayerContext;
    onClick: (route: string) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = (props) => {
    const { item, onClick } = props;
    const [info, setInfo] = useState("");

    const onStorageChange = useCallback((event: SizeChangedEvent) => {
        setInfo(`${event.storageCount} / ${event.storageSize}`);
    }, []);

    useEffect(() => {
        const entry = props.item;
        if (entry.id === 'storage') {
            const storage = props.player.storage;
            setInfo(`${storage.itemCount} / ${storage.storageSize}`);

            EventBus.instance.subscribe('storage.sizeChanged', onStorageChange)
        }

        return () => {
            if (entry.id === 'storage') {
                EventBus.instance.unsubscribe('storage.sizeChanged', onStorageChange)
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
