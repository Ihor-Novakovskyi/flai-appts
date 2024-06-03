import React, { Fragment } from "react"
import User from "../user/User"
import Chat from "../chat/Chat"
import { ChatProps } from "../interfaces/interfaces"
import calculateTime from "../chat-helpFunction/calculateTime"
export default function UserChatComponents({ chatprops }: { chatprops: ChatProps }): JSX.Element { 

    const elements = chatprops.map(({ requestData, responseData, startTimeRequest }, id: number) => { 
         const time = calculateTime(startTimeRequest)
         return (
                 <Fragment key={id}>
                     { requestData ? <User requestData={ requestData } time={time} key={id} /> : null}
                     { responseData ? <Chat responseData={ responseData } time={time} key={id + 1} /> : null}
                 </Fragment>
        )
    }) 
     return (
         <Fragment>
             {elements}
         </Fragment>
     )
 }