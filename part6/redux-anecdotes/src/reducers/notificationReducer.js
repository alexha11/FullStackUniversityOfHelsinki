import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notiSlice = createSlice({
    name: 'noti',
    initialState,
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        removeNotification(state, action) {
            return ''
        }
    }
})

export const { setNotification, removeNotification } = notiSlice.actions
export default notiSlice.reducer