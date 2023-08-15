import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { User } from "./userSlice"
import { BaseApiResponse } from "../../types/base-api-response";

export interface Auth {
    token: string;
    user: User;
}

interface AuthState {
    userInfo: Auth | null
}

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') ?? '') : null
} as AuthState;

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setCredentials: (state, action: PayloadAction<BaseApiResponse<Auth>>) => {
            state.userInfo = action.payload.data;
            localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
        },
        logout: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        }
    },
})

export default AuthSlice.reducer;
export const { setCredentials, logout } = AuthSlice.actions;
