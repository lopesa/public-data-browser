import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DatasetsAvailable } from "types/dataset-index-type";
import { RootState } from "../app/store";

export interface DatasetSelectedState {
  value?: DatasetsAvailable;
}

const initialState: DatasetSelectedState = {
  value: undefined,
};

export const datasetSelectedSlice = createSlice({
  name: "datasetSelected",
  initialState,
  reducers: {
    setDatasetSelected: (
      state: DatasetSelectedState,
      action: PayloadAction<DatasetsAvailable>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setDatasetSelected } = datasetSelectedSlice.actions;
export const selectDatasetSelected = (state: RootState) =>
  state.datasetSelected.value;

export default datasetSelectedSlice.reducer;
