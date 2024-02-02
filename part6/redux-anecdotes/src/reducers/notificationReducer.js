import { createSlice } from '@reduxjs/toolkit'

const initialState = 'Duong Developer'

const notiSlice = createSlice({
    name: 'noti',
    initialState,
    reducers: {
        setNotification(state, action) {
            return action.payload
        }
    }
})

export const { setNotification } = notiSlice.actions
export default notiSlice.reducer