import React from "react"
import './Error.css'
import ErrorSpinner from "./error-svgrepo-com"
export default function ErrorMessage(): JSX.Element {
    return (
        <div className="chat-window__error-message">
            <span>
                Sorry...the connection was closed. Check internet connection.....
                <br />
                If connection okay, reload page. If it doesnt work yet - contact us 
            </span>
            <ErrorSpinner/>
        </div>
    )
}