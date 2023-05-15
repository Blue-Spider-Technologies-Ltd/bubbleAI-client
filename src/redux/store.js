import { configureStore } from '@reduxjs/toolkit'
import messagesReducer from "./states.js"

export default configureStore({
    reducer: {
        stateData: messagesReducer,
    }
})