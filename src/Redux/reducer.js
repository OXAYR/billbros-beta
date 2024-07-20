import { createSlice } from '@reduxjs/toolkit';

const AuthSlice = createSlice({
    name: 'Auth',
    initialState: {
        token: '',
        user: [],
    },
    reducers: {

        setUser: (state, action) => {
            state.user = action.payload;
        },
       
        setToken: (state, action) => {
            state.token = action.payload;
        },
       
    },
});

export const {
    setUser,
    setToken,
   
} = AuthSlice.actions;

export default AuthSlice.reducer;
