import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CarStatus } from "../types";

export interface CarsStatusState {
  cars: Record<string, CarStatus>;
}

const initialState: CarsStatusState = { cars: {} };

export const carsStatusSlice = createSlice({
  name: "carsStatus",
  initialState,
  reducers: {
    startCar: (state) => {},
  },
});

// Action creators are generated for each case reducer function
export const { startCar } = carsStatusSlice.actions;

export default carsStatusSlice.reducer;
