import React, { useEffect } from 'react';
import '../Notifications.css';

interface NotificationProps {
    id: number;
    type: 'exp' | 'item';
    message: string;
    displayTime: number;
    onDone: () => void;
}

const Notification: React.FC<NotificationProps> = ({
    id,
    type,
    message,
    displayTime,
    onDone }) => {

    useEffect(() => {
        const timer = setTimeout(onDone, displayTime);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div key={id} className={`notification-popup`}>
            {message}
        </div>
    );
};

export default React.memo(Notification);
