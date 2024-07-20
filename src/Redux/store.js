import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
// import { postApi } from "../Services/index";
import AuthSlice from "./reducer";
import { setupListeners } from "@reduxjs/toolkit/query";

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, AuthSlice);

export const Store = configureStore({
    reducer: {
        // [postApi.reducerPath]: postApi.reducer,
        reducer: persistedReducer,
    },
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware().concat(postApi.middleware),
});
setupListeners(Store.dispatch);