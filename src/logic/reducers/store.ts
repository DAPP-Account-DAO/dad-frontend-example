import { createStore, combineReducers } from 'redux'
import userReducer from './user.reducer'
import notificationReducer from './notification.reducer'

const rootReducer = combineReducers({
    user: userReducer,
    notification: notificationReducer
})

const store = createStore(rootReducer)

export default store