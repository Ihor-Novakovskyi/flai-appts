import { Listeners } from "../interfaces/interfaces";
export default function setListener(action: string, listeners: Listeners) { 
    if (Array.isArray(listeners) && listeners.length) {
        listeners
            .forEach(({ eventObject, eventName, listener }) => eventObject[action === "remove" ? "removeEventListener"
                : "addEventListener"
            ](eventName, listener));
        action === "remove" ? listeners.length = 0 : void 0
        return 
    }
    if ('eventName' in listeners && 'eventObject' in listeners && 'listener' in listeners) {
        const { eventObject, eventName, listener } = listeners;
        eventObject[action === "remove" ? "removeEventListener" : "addEventListener"](eventName, listener)
    }
}