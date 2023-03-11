import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialIndexDataItem } from "types/types-general";
import { AppThunk, RootState } from "../app/store";

export interface BookmarksState {
  value: InitialIndexDataItem[];
  status: "idle" | "loading" | "failed";
}

const initialState: BookmarksState = {
  value: [],
  status: "idle",
};

export const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    addBookmark: (
      state: BookmarksState,
      action: PayloadAction<InitialIndexDataItem>
    ) => {
      state.value.push(action.payload);
    },
    removeBookmark: (
      state: BookmarksState,
      action: PayloadAction<InitialIndexDataItem>
    ) => {
      state.value = state.value.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addBookmark, removeBookmark } = bookmarksSlice.actions;
export const selectBookmarks = (state: RootState) => state.bookmarks.value;

export default bookmarksSlice.reducer;

// export const counterSlice = createSlice({
//   name: 'counter',
//   initialState,
//   // The `reducers` field lets us define reducers and generate associated actions
//   reducers: {
//     increment: (state) => {
//       // Redux Toolkit allows us to write "mutating" logic in reducers. It
//       // doesn't actually mutate the state because it uses the Immer library,
//       // which detects changes to a "draft state" and produces a brand new
//       // immutable state based off those changes
//       state.value += 1;
//     },
//     decrement: (state) => {
//       state.value -= 1;
//     },
//     // Use the PayloadAction type to declare the contents of `action.payload`
//     incrementByAmount: (state, action: PayloadAction<number>) => {
//       state.value += action.payload;
//     },
//   },
//   // The `extraReducers` field lets the slice handle actions defined elsewhere,
//   // including actions generated by createAsyncThunk or in other slices.
//   extraReducers: (builder) => {
//     builder
//       .addCase(incrementAsync.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(incrementAsync.fulfilled, (state, action) => {
//         state.status = 'idle';
//         state.value += action.payload;
//       })
//       .addCase(incrementAsync.rejected, (state) => {
//         state.status = 'failed';
//       });
//   },
// });
