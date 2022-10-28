import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import planetsReducer from "./Planets/PlanetsSlice";
import starshipsReducer from "./Starships/StarshipsSlice";

const reducer = combineReducers({
  planets: planetsReducer,
  starships: starshipsReducer,
});

export const store = configureStore({
  reducer,
});
