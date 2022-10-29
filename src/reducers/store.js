import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import planetsReducer from "./Planets/PlanetsSlice";
import starshipsReducer from "./Starships/StarshipsSlice";
import peopleReducer from "./People/PeopleSlice";

const reducer = combineReducers({
  planets: planetsReducer,
  starships: starshipsReducer,
  people: peopleReducer,
});

export const store = configureStore({
  reducer,
});
