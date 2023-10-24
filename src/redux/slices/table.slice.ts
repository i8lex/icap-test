import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Table, User } from "@/types";

const initialState: Table = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTable(state, action: PayloadAction<Table>) {
      state = action.payload;
    },
  },
});

export const { setTable } = tableSlice.actions;
export default tableSlice.reducer;
