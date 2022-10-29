import { createSlice, createSelector } from "@reduxjs/toolkit";

export const peopleSlice = createSlice({
  name: "people",
  initialState: {
    people: [
      {
        results: [],
        pageCount: 0,
      },
    ],
  },
  reducers: {
    storagePeople: (state, { payload }) => {
      state.people = payload;
    },
  },
});

export const { storagePeople } = peopleSlice.actions;

export const peopleSelector = createSelector(
  (state) => state.people,
  (people) => people
);

export default peopleSlice.reducer;
