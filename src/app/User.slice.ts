import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

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
  },
});

export const { setHasSeenMakeAccountSuggestionDialog } = userSlice.actions;
export const selectHasSeenMakeAccountSuggestionDialog = (state: RootState) =>
  state.user.hasSeenMakeAccountSuggestionDialog;

export default userSlice.reducer;
