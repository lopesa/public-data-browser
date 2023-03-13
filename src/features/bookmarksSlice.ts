import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialIndexDataItem } from "types/types-general";
import { RootState } from "../app/store";

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
      state.value = state.value.filter(
        (bookmark) => bookmark.id !== action.payload.id
      );
    },
  },
});

export const { addBookmark, removeBookmark } = bookmarksSlice.actions;
export const selectBookmarks = (state: RootState) => state.bookmarks.value;

export default bookmarksSlice.reducer;
