import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notiSlice = createSlice({
    name: 'noti',
    initialState,
    reducers: {
        setNoti(state, action) {
            
            return action.payload
        },
        removeNotification(state, action) {
            return ''
        }
    }
})

export const setNotification = (content, time) => {
    return async dispatch => {
        dispatch(setNoti(content))
        setTimeout(() => {
            dispatch(removeNotification())
        }, time * 1000)
    }

}

export const { setNoti, removeNotification } = notiSlice.actions
export default notiSlice.reducer