import {createSlice} from '@reduxjs/toolkit'

const initialState = {error: null, isLoading: false}
const NotificationSlice = createSlice({
name: "notificationSlice",
initialState,
reducers:{
    send(state){
        state.isLoading = true;
    },
    error(state, action){
        state.isLoading = false;
        state.error = action.payload;
    },
    reset(){
        return initialState
    }
}
});

export const notificationActions = NotificationSlice.actions;
export default NotificationSlice.reducer;