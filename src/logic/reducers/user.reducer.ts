const initialState = {
    walletConnected: false,
    username: '',
    showSideBar: false,
}

const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                walletConnected: true,
                username: action.username
            }

        case "LOGOUT":
            return {
                ...state,
                walletConnected: false,
                username: ''
            }

        case "TOGGLE_SIDEBAR":
            return {
                ...state,
                showSideBar: !state.showSideBar
            }

        default:
            return state
    }
}

export default userReducer