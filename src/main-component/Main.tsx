import React, {useState, useMemo, Fragment, useEffect, FormEvent, ChangeEvent} from 'react';
import { useQuery, useMutation } from 'react-query';
import CreateSocket from '../socket/WebSocket';
import UserChatComponents from '../union-messages/UserChatComponent';
import Ad from '../ad/Ad';
import RequestButton from '../request-button/RequestButton';
import './Chat-window.css';
import createProps from '../chat-helpFunction/setPropsData';
import { SocketStates } from '../interfaces/interfaces';
import ErrorMessage from '../error-message/ErrorMessage';
import './Chat-window.css'
export default function ChatWindow() { 
    const [requestData, setRequestData] = useState('');
    //начальное  сотояние подключения socket
    const [connect, setConnect] = useState(true); 
    //socketObject - объект через который контролируетя подключение к серверу, отправка и получение сообщений
    const socketObject = useMemo(() => CreateSocket()({connect, setConnect} as SocketStates), [connect])
    // useQuery контролирует открытие соединения через промис состояния подключения через объект  socketObject
    const {isSuccess:openSuccess, isError: error}  = useQuery(['todo', connect],() => socketObject.socketState,{refetchOnWindowFocus: false, retry: false})
    //
    // отправка сообщения на сервер
    const request = useMutation(async(requestData: string) => socketObject?.sendMessage?.(requestData));

    const { isLoading, isSuccess, data: responseData } = request;

    // функция отвечающая за хранение значений  сообщений из чата - пользователь => сервер
    const setProps = useMemo(() => createProps(), [])
    const props = setProps({ isLoading, isSuccess, requestData, responseData, setRequestData })
    // 
    useEffect(() => window.addEventListener('online', () => setConnect(true)))

    // Контроль изменения вводимых значений Input
    function changeInputData(e:ChangeEvent<HTMLInputElement>) { 
        setRequestData(e.target.value)

    }
    //отправка сообщение на сервер
    function submit(e:FormEvent<HTMLFormElement>) { 
        e.preventDefault();
        if (requestData.length && openSuccess) {
            request.mutate(requestData)
        }
    }

    return (
        <div className="chat-window">
            <Ad/>
            <div className="chat-window__dialog">
                {props.length ? <UserChatComponents chatprops={props} /> : null}
            </div>
            {error ? <ErrorMessage/> : null}
            <form
                className="form-request"
                action="submit"
                onSubmit={ submit }>
                <input
                    disabled={!openSuccess || isLoading}
                    className="form-request__enter"
                    type="text"
                    placeholder="Enter you request...."
                    value={ requestData }
                    onChange={changeInputData}
                />
                <RequestButton disabled={!requestData || !openSuccess || isLoading} />
            </form> 
        </div>
     )
}




