import * as React from 'react'
import { NotificationContainer } from './style'
import { useSelector, useDispatch } from 'react-redux'
import { removeNotification } from '../../logic/actions/actions'
const { useEffect } = React

const Notification = () => {

    const notificationMsg = useSelector((state: any) => state.notification.notificationText)
    const notificationType = useSelector((state: any) => state.notification.notificationType)
    const dispatch = useDispatch()

    useEffect(() => {
        if(notificationType) {
            setTimeout(() => {
                dispatch(removeNotification())
            }, 3500)
        }
    }, [notificationType])

    const renderNotification = () => {
        if (notificationType) {
            return (
                <NotificationContainer notificationType={notificationType}>
                    {notificationMsg}
                </NotificationContainer>
            )
        }

        return null
    }

    return (
        <React.Fragment>
            {renderNotification()}
        </React.Fragment>
    )
}

export default Notification