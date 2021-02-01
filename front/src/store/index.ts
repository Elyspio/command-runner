import {configureStore} from "@reduxjs/toolkit";
import {reducer as configReducer} from "./module/config/reducer"
import {reducer as themeReducer} from "./module/theme/reducer"

const store = configureStore({
    reducer: {
        theme: themeReducer,
        config: configReducer,
    }
});


export default store;
export type RootState = ReturnType<typeof store.getState>


