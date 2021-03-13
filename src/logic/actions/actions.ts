export const login = ({ username }: any) => {
    return {
        type: 'LOGIN',
        username
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT'
    }
}

export const showNotification = ({ notificationText, notificationType }: any) => {
    return {
        type: 'SHOW_NOTIFICATION',
        notificationText,
        notificationType
    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION'
    }
}

export const toggleSideBar = () => {
    return {
        type: 'TOGGLE_SIDEBAR'
    }
}