import {configureStore} from '@reduxjs/toolkit'
import IngredientsReducer from '../store/IngredientsSlice'
import NotificationReducer from '../store/NotificationSlice'

const ReduxStore = configureStore({
    reducer: {ingredientSlice: IngredientsReducer, notificationSlice: NotificationReducer}
})

export default ReduxStore