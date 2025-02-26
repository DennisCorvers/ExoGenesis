import { useEffect } from "react";
import { EventBus } from "../game/events/EventBus";

export const useEventSubscription = (eventType: string, handler: (event: any) => void) => {
    useEffect(() => {
        EventBus.instance.subscribe(eventType, handler);
        return () => {
            EventBus.instance.unsubscribe(eventType, handler);
        };
    }, [eventType, handler]);
};
