import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import { thunk } from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "../reducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [],
};

// eslint-disable-next-line import/no-anonymous-default-export

export default () => {
  const persistedReducer = persistReducer(
    persistConfig,
    combineReducers(rootReducer)
  );

  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: thunk,
        serializableCheck: false,
      }),
    devTools: process.env.NODE_ENV !== "production",
  });

  const persistor = persistStore(store);
  return { store, persistor };
};
