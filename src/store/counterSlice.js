import { createSlice } from "@reduxjs/toolkit";

const initialState = 0

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state, action) => {
            state += action.payload
            return state
        },
        decrement: (state, action) => {
            if (state <= 0) {
                state = 0
            } else {
                state -= action.payload
            }
            return state
        }
    }
})

export default counterSlice.reducer
export const { increment, decrement } = counterSlice.actions