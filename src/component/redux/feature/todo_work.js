import { createSlice } from '@reduxjs/toolkit'

export const todoWorkSlice = createSlice({
    name: 'todo_work',
    initialState: [],
    reducers: {
        add_list_work: (state, action) => {

            const todoWork = action.payload
            const findById = state?.findIndex((res) => res?.id === todoWork.id)
            if (findById === -1) {
                state.push(todoWork)
            }

        },
        remove_work_id: (state, action) => {

            const id = action.payload
            const findById = state?.findIndex((res) => res?.id === id)
            if (findById > -1) {
                state.splice(state[findById], 1)
            }
            // console.log(userLogin);


        },
        remove_alll: (state, action) => {

            state.length = 0
        },


    },
})

// Action creators are generated for each case reducer function
const { reducer, actions } = todoWorkSlice
export const { add_list_work, remove_work_id, remove_alll } = actions

export default reducer