const initialState = {
    notificationText: '',
    notificationType: 0
}

const notificationReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "SHOW_NOTIFICATION":
            return {
                ...state,
                notificationText: action.notificationText,
                notificationType: action.notificationType
            }
        case "REMOVE_NOTIFICATION":
            return {
                ...state,
                notificationText: '',
                notificationType: 0
            }
        default:
            return state
    }
}

export default notificationReducer