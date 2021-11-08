import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "./module/theme/theme.reducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authenticationReducer } from "./module/authentication/authentication.reducer";

const store = configureStore({
	reducer: combineReducers({
		theme: themeReducer,
		authentication: authenticationReducer,
	}),
});

export type StoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector;

export default store;
