import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { apiSlice } from "services/apiSlice";

export interface UserState {
  email?: string;
  token?: string;
  hasSeenMakeAccountSuggestionDialog: boolean;
}

const initialState: UserState = {
  hasSeenMakeAccountSuggestionDialog: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setHasSeenMakeAccountSuggestionDialog: (
      state: UserState,
      action: PayloadAction<boolean>
    ) => {
      state.hasSeenMakeAccountSuggestionDialog = action.payload;
    },
    setEmailAndToken: (
      state: UserState,
      action: PayloadAction<{ email: string; token: string }>
    ) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        apiSlice.endpoints.loginUser.matchFulfilled,
        (state, action) => {
          state.email = action.payload.email;
          state.token = action.payload.token;
        }
      )
      .addMatcher(
        apiSlice.endpoints.createUser.matchFulfilled,
        (state, action) => {
          state.email = action.payload.email;
          state.token = action.payload.token;
        }
      );
  },
});

export const { setHasSeenMakeAccountSuggestionDialog, setEmailAndToken } =
  userSlice.actions;
export const selectHasSeenMakeAccountSuggestionDialog = (state: RootState) =>
  state.user.hasSeenMakeAccountSuggestionDialog;
export const selectEmail = (state: RootState) => state.user.email;
export const selectToken = (state: RootState) => state.user.token;

export default userSlice.reducer;
