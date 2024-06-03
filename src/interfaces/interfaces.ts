
interface Listener{
    eventObject: WebSocket | Window,
    eventName: string,
    listener: EventListener
}
export interface ServerResponse {
    "ConversationId": string,
    "ConversationName": string,
    "Date": null,
    "Text": string,
    "Data": null,
    "DataType": string,
    "Context": null,
    "Actions": null
}
export interface RequestObject {
    "conversation_id": string,
    "is_user_authorized_through_tiktok": boolean,
    "user_id": "2e0e2cdd-1953-4902-bbd3-6da785505961",
    "user_prompt": string,
    "user_region": "uk-UA",
    "authorization": ""
}
export type Listeners = Array<Listener> | Listener;
export interface SocketObject {
    socket: WebSocket | null,
    wasOpened: boolean,
    wasClosed: boolean,
    wasError: boolean,
    socketData: Promise<string> | null,
    socketText: string,
    socketState: Promise<string>,
    sendMessage?(requestData: string): Promise<string>
};
export interface ElementProp {
    responseData: string,
    requestData: string,
    startTimeRequest: Date
}
export type ChatProps = Array<ElementProp>
export interface SetPropsData { 
    isLoading: boolean,
    requestData: string,
    isSuccess: boolean,
    responseData: string | undefined,
    setRequestData: React.Dispatch<React.SetStateAction<string>> 
}
interface Time {
    hours: number,
    minutes: number
}
export interface ChatElementProps {
    responseData: string,
    time: Time
}
export interface UserElementProps {
    requestData: string,
    time: Time
}

export interface SocketStates {
    connect: boolean;
    setConnect:  React.Dispatch<React.SetStateAction<boolean>>
}