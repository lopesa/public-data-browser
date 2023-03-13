import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import bookmarksReducer from "../features/bookmarksSlice";
import datasetSelectedReducer from "app/DatasetSelected.slice";

// import { setupListeners } from '@reduxjs/toolkit/query'
import { apiSlice } from "services/apiSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    bookmarks: bookmarksReducer,
    datasetSelected: datasetSelectedReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

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
// setupListeners(store.dispatch)
