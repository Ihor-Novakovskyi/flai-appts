import {ElementProp, ChatProps, SetPropsData} from '../interfaces/interfaces'
export default function createProps() { 
    const props: ChatProps = [];
    return function setProps({ isLoading, requestData, isSuccess, responseData, setRequestData }: SetPropsData):ChatProps {
        if (isLoading && requestData) {
            props.push({ requestData, startTimeRequest: new Date() } as ElementProp)
            setRequestData('')
        }
        if (isSuccess && responseData) { 
            props[props.length - 1].responseData = responseData
        }
        console.log('property',props)
        return props;
    }
}
