import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: { auth: null },
    reducers: {
        loginForm: (state, action) => {

            const userLogin = action.payload
            // console.log(userLogin);
            state.auth = userLogin

        },
        loginOutForm: (state) => {
            state.auth.Auth = null
            console.log(state, 'state');

        }


    },
})

// Action creators are generated for each case reducer function
const { reducer, actions } = authSlice
export const { loginForm, loginOutForm } = actions

export default reducer