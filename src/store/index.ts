import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./carsReducer";
import raceStatusReducer from "./raceStatusReducer";
import winnersReducer from "./winnersReducer";
import carsStatusReducer from "./carsStatusReducer";

const store = configureStore({
  reducer: {
    cars: carsReducer,
    raceStatus: raceStatusReducer,
    winners: winnersReducer,
    carsStatus: carsStatusReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
