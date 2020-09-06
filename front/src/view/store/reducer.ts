import {combineReducers} from "redux";

import {reducer as themeReducer, ThemeState} from "./module/theme/reducer";
import {AccountState, reducer as accountReducer} from "./module/account/reducer";

export interface RootState {
    theme: ThemeState;
    account: AccountState
}

export const rootReducer = combineReducers<RootState | undefined>({
    theme: themeReducer,
    account: accountReducer
});
