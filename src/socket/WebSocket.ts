import setListener from "../chat-helpFunction/setListener";
import { Listeners, SocketObject, RequestObject, SocketStates, ServerResponse } from "../interfaces/interfaces";
export default function CreateSocket() {
    const url = 'wss://gi-llm.gromus.io/test_task/websockets';

    function createRequestMesage(
        requestData:string = "https://www.tiktok.com/@im_mmxvii",
        tiktok_authorized: boolean = true ,
    ) {
        const requestObject: RequestObject = {
            "conversation_id": "0e015560-43d0-43b5-a736-956912398f2d",
            "is_user_authorized_through_tiktok": tiktok_authorized,
            "user_id": "2e0e2cdd-1953-4902-bbd3-6da785505961",
            "user_prompt": requestData,
            "user_region": "uk-UA",
            "authorization": ""
        }
        return JSON.stringify(requestObject)
    }

    return function startSocket({ connect, setConnect}: SocketStates) {
        const socket = connect ? new WebSocket(url) : null;
// если содинение не было установлено то промис состояние отклоняется
// дефолтное сосоояние подключения true при первом запуске
        const socketState: Promise<string> = !connect  ? Promise.reject('error') :
            new Promise((res, rej) => {
                const listeners: Listeners = [
                    {
                        eventObject: socket as WebSocket,
                        eventName: "error",
                        listener: getError
                    },
                    {
                        eventObject: socket as WebSocket,
                        eventName: "open",
                        listener: getOpenSocket
                    },
                    {
                        eventObject: socket as WebSocket,
                        eventName: "close",
                        listener: closedSocket
                    },
                    {
                        eventObject: window,
                        eventName: "offline",
                        listener: interruptConnect
                    },
                ]
                function interruptConnect() {
                    console.error('Возникли проблемы с подключениме к сети....проверьте подключение')
                    setConnect(false)
                    setListener("remove", listeners)
                }
                function getOpenSocket() {
                    socketObject.wasOpened = true;
                    setListener("remove", { eventObject: socket as WebSocket, eventName: "open", listener: getOpenSocket })
                    res('open')
                }

                function closedSocket() {
                    setListener('remove', listeners)
                    if (!socketObject.wasError) {
                        console.error('Соединение сокет завершилось...перезагрузите страницу')
                        setConnect(false)
                    }

                }
                function getError(e: Event) {
                    console.error('Соединение закрыто \n','возникли пролемы с сетью или подключением к серверу');
                    setListener('remove', listeners)
                    setConnect(false)
                    socketObject.wasError = true;
                    if (!socketObject.wasOpened) {
                        rej('error')
                    }
                }
                //установка подписчиков на сокет подключение
                setListener("addListener", listeners)
                // 
            })
        function sendMessage(this:SocketObject, requestData:string): Promise<string> {
            this.socketData = new Promise((res, rej) => {

                function getSocketMessage(e: MessageEvent) {
                    const message: string = e.data;
                    const messageObject: ServerResponse = JSON.parse(message);
                    console.log(message)
                    if (messageObject["Text"] !== "<|endoftext|>") {
                        socketObject.socketText = socketObject.socketText + ' ' + (JSON.parse(message)["Text"])
                        return;
                    }
                    res(socketObject.socketText);
                    socketObject.socketText = '';
                    setListener("remove", { eventObject: socket as WebSocket, eventName: "message", listener: getSocketMessage as EventListener });
                }
                //Подписка на получение сообщения от сервера
                setListener("addListener", { eventObject: socket as WebSocket, eventName: "message", listener: getSocketMessage as EventListener });

            });
            (socket as WebSocket).send(createRequestMesage(requestData));
            return this.socketData
        }
        const socketObject: SocketObject = {
            socket,
            wasOpened: false,
            wasClosed: false,
            wasError: !connect,
            socketData: null,
            socketText: '',
            socketState,
        };
        connect ? socketObject.sendMessage = sendMessage : void 0;

        return socketObject
    }
}
