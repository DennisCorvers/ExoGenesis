import { IGameContext } from "@game/core/IGameContext";
import { useCallback, useEffect, useRef, useState } from "react";
import Notification from './notifications/Notification'
import { EventBus } from "@game/events/EventBus";
import { SkillExperienceChangedEvent } from "@game/events/skill/SkillExpChangedEvent";
import { ItemChangedEvent } from "@game/events/storage/ItemChangedEvent";
import { SkillLevelChangedEvent } from "@game/events/skill/SkillLevelChangedEvent";

interface NotificationManagerProps {
    gameContext: IGameContext;
    isActive: boolean;
}

interface NotificationData {
    id: number;
    type: 'exp' | 'item';
    message: string;
}

const DISPLAY_TIME = 3000;

const NotificationManager: React.FC<NotificationManagerProps> = ({ gameContext, isActive }) => {
    const notificationidRef = useRef(0);
    const [notifications, setNotifications] = useState<NotificationData[]>([]);

    const removeNotification = useCallback((id: number) => {
        setNotifications(prev => prev.filter(x => x.id !== id));
    }, []);

    const queueNotification = useCallback((notif: NotificationData) => {
        // Temp fix to stop notification spam after simulation.
        setNotifications(prev => {
            if (prev.length > 3)
                return prev;
            return [...prev, notif];
        });
    }, [notifications]);

    const onExpGained = useCallback((event: SkillExperienceChangedEvent) => {
        const notif: NotificationData = {
            id: notificationidRef.current++,
            message: `${event.skillState.skill.displayName} ${event.newExperience - event.oldExperience} EXP`,
            type: 'exp'
        }

        queueNotification(notif);
    }, [queueNotification])

    const onItemChanged = useCallback((event: ItemChangedEvent) => {

    }, [])

    const onLevelChanged = useCallback((event: SkillLevelChangedEvent) => {

    }, [])

    useEffect(() => {
        gameContext.skills.objects.forEach(x => {
            EventBus.instance.subscribe(`${x.id}.expChanged`, onExpGained)
            EventBus.instance.subscribe(`${x.id}.levelChanged`, onLevelChanged)
        });

        return () => {
            gameContext.skills.objects.forEach(x => {
                EventBus.instance.unsubscribe(`${x.id}.expChanged`, onExpGained)
                EventBus.instance.unsubscribe(`${x.id}.levelChanged`, onLevelChanged)
            })
        };
    }, [gameContext]);

    return (
        <div className="notification-container">
            {notifications.map((notif) => (
                <Notification
                    key={notif.id}
                    id={notif.id}
                    type={notif.type}
                    message={notif.message}
                    displayTime={DISPLAY_TIME}
                    onDone={() => removeNotification(notif.id)}
                />
            ))}
        </div>
    );


}

export default NotificationManager