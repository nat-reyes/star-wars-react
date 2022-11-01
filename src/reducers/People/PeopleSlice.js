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
    isSearching: [],
  },
  reducers: {
    storageCharacter: (state, { payload }) => {
      state.people = payload;
    },
    updateCharacter: (state, { payload }) => {
      const { characterId } = payload;

      let peopleToUpdate = JSON.parse(JSON.stringify(state.people));
      console.log({ payload });
      if (!peopleToUpdate.results.find((item) => item?.url === characterId)) {
        return state;
      }

      const resultsUpdated = peopleToUpdate.results.length
        ? peopleToUpdate.results.map((character) =>
            character.url === characterId
              ? { ...character, ...payload }
              : character
          )
        : peopleToUpdate.results;

      peopleToUpdate.results = resultsUpdated;

      return {
        ...state,
        people: peopleToUpdate,
      };
    },
    updateCharacterFieldState: (state, { payload }) => {
      const { url } = payload;
      const stateIsSearching = JSON.parse(JSON.stringify(state.isSearching));
      const exist = stateIsSearching.find((item) => item?.itemId === url);

      if (exist) {
        return state;
      }
      return {
        ...state,
        isSearching: [...stateIsSearching, { itemId: url, state: true }],
      };
    },
  },
});

export const { storageCharacter, updateCharacterFieldState, updateCharacter } =
  peopleSlice.actions;

export const peopleSelector = createSelector(
  (state) => state.people,
  (people) => people
);

export const isSearchingSelector = createSelector(
  (state) => state.people,
  (isSearching) => isSearching
);

export default peopleSlice.reducer;
