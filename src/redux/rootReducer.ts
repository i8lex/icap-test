import { combineReducers } from "@reduxjs/toolkit";
import tableSlice from "./slices/table.slice";
import { tableApi } from "./api/table.api";
import { authApi } from "@/redux/api/auth.api";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { authSlice } from "@/redux/slices/auth.slice";
import { persistReducer } from "redux-persist";

const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const authPersistConfig = {
  key: "authApi",
  storage,
  whitelist: ["isAuthenticated"],
};

const combinedReducer = combineReducers({
  table: tableSlice,
  auth: persistReducer(authPersistConfig, authSlice.reducer),
  [authApi.reducerPath]: authApi.reducer,
  [tableApi.reducerPath]: tableApi.reducer,
});

export default combinedReducer;
