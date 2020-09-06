import {createAction as _createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {Api} from "../../../../core/api";

const createAction = <T>(name: string) => _createAction<T>(`theme/${name}`);

type User = { username: string, password: string };
export const login = createAsyncThunk<{ authorized: boolean } & User, User>("login", async ({username, password}) => {

    let authorized = await Api.Account.instance.isAuthorized({password, name: username})

    return {
        username,
        password,
        authorized
    };
})
