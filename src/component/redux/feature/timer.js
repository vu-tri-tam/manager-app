import { createSlice } from '@reduxjs/toolkit'


export const timeSlice = createSlice({
    name: 'timer',
    initialState: {},
    reducers: {
        saveTime: (state, action) => {

            const timer = action.payload

            // console.log(userLogin);
            state.hours = timer.hours
            state.minutes = timer.minutes
            state.seconds = timer.seconds
        },
        removeTime: (state, action) => {

            const id = action.payload
            const findById = state?.findIndex((res) => res?.id === id)
            if (findById > -1) {
                state.splice(state[findById], 1)
            }
            // console.log(userLogin);


        }


    },
})

// Action creators are generated for each case reducer function
const { reducer, actions } = timeSlice
export const { saveTime, removeTime } = actions

export default reducer