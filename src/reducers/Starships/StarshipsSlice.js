import { createSlice, createSelector } from "@reduxjs/toolkit";

export const starshipSlice = createSlice({
  name: "starship",
  initialState: {
    starships: [],
  },
  reducers: {
    storageStarship: (state, { payload }) => {
      if (
        state.starships.find((starship) => starship?.name === payload?.name)
      ) {
        return state;
      }

      state.starships = [...state.starships, payload];
    },
  },
});

export const { storageStarship } = starshipSlice.actions;

export const starshipSelector = createSelector(
  (state) => state?.starships,
  (starships) => starships
);

export default starshipSlice.reducer;
