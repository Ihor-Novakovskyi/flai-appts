import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import "./Chat.css"
import Lighting from './Lighting';
import { ChatElementProps } from '../interfaces/interfaces';
export default function Chat({ responseData, time: { hours, minutes } }: ChatElementProps): JSX.Element { 
    const [idWord, setIdWords] = useState(1);

    const arrayWithWords = responseData.split(' ');
    const wordsElements =  arrayWithWords
        .slice(0, idWord)
        .map((el) => { 
            return (
                <span className="chat__message-text">
                    {`${el} `}
                </span>
            )
        });
    useEffect(() => {
        if (idWord < arrayWithWords.length)
        {
           setTimeout(() => setIdWords((cur) => cur + 1),200)
        }
    },[idWord])
    return (
        <div className="chat">
            <div className="chat__header">
                <div className="chat__wrapper-inside-header">
                    <div className="chat__image">
                        <Lighting/>
                    </div>
                    <span className='chat__name'>
                        GE
                    </span>
                </div>
                <span className="chat__timer">
                {hours ? `${hours}h ${minutes}m ago` :  `${minutes}m ago`}
                </span>
            </div>
            
            <div className="chat__message-wrapper">
                {wordsElements}
            </div>
        </div>
    )
}