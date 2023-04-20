import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import bookmarksReducer from "../features/bookmarksSlice";
import datasetSelectedReducer from "app/DatasetSelected.slice";
import userReducer from "app/User.slice";
import { apiSlice } from "services/apiSlice";

/**
 * here is the official guide to using redux-persist with redux-toolkit:
 * https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
 */
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["apiSlice"],
};

const reducers = combineReducers({
  bookmarks: bookmarksReducer,
  datasetSelected: datasetSelectedReducer,
  user: userReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization

// import { setupListeners } from '@reduxjs/toolkit/query'
// setupListeners(store.dispatch)
