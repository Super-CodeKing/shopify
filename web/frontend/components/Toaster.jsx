import { Toast } from '@shopify/app-bridge-react'

export default function Toaster({active = false, content, duration = 2000, isError = false, toggleToastActive}) {
    return (<>{active && <Toast content={content} duration={duration} onDismiss={toggleToastActive} isError={isError}/>}</>);
}