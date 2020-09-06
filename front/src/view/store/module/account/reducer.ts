import {createReducer} from "@reduxjs/toolkit";
import {login} from "./action";


export enum AccountStateType {
    succeeded,
    pending,
    rejected,
    waiting
}


export interface AccountState {
    current?: {
        username: string,
        password: string,
    }
    state: { status: AccountStateType, message?: string }

}

const defaultState: AccountState = {
    state: {status: AccountStateType.waiting}
};

export const reducer = createReducer(defaultState, (builder) => {

    builder.addCase(login.fulfilled, (state, {payload: {authorized, password, username}}) => {
        state.current = {
            username,
            password
        }
        state.state = authorized ? {status: AccountStateType.succeeded, message: undefined} : {status: AccountStateType.waiting, message: undefined}
    });

    builder.addCase(login.rejected, (state, action) => {
        state.state = {status: AccountStateType.rejected, message: action.error.message}
    })

    builder.addCase(login.pending, state => {
        state.state = {status: AccountStateType.pending}
    })
});
