import { createSlice, createSelector } from "@reduxjs/toolkit";

export const planetSlice = createSlice({
  name: "planet",
  initialState: {
    planets: [],
    planetRequested: {},
  },
  reducers: {
    storagePlanet: (state, { payload }) => {
      if (state.planets.find((planet) => planet?.name === payload?.name)) {
        return state;
      }

      state.planets = [...state.planets, payload];
    },
  },
});

export const { storagePlanet } = planetSlice.actions;

export const planetsSelector = createSelector(
  (state) => state?.planets?.planets,
  (planets) => ({ planets })
);

export default planetSlice.reducer;
