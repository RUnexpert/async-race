import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CarStatus, CarType } from "../types";
import { RootState } from "./index";

export interface CarsStatusState {
  cars: Record<string, CarStatus>;
}

const initialState: CarsStatusState = { cars: {} };

export const carsStatusSlice = createSlice({
  name: "carsStatus",
  initialState,
  reducers: {
    startCar: (state, { payload }: PayloadAction<CarType["id"]>) => {
      state.cars[payload] = {
        status: "started",
        speed: Math.random() * 500,
        distance: 0,
      };
    },
    resetCar: (state, { payload }: PayloadAction<CarType["id"]>) => {
      if (state.cars[payload]) {
        state.cars[payload] = { ...state.cars[payload], status: "stopped", distance: 0 };
      }
    },
    moveCar: (state, { payload }: PayloadAction<{ id: CarType["id"]; distance: CarStatus["distance"] }>) => {
      if (state.cars[payload.id]) {
        state.cars[payload.id].distance = payload.distance;
      }
    },
    finishCar: (state, { payload }: PayloadAction<CarType["id"]>) => {
      state.cars[payload].status = "stopped";
    },
  },
});

export const { startCar, resetCar, moveCar, finishCar } = carsStatusSlice.actions;

export const selectCarStatusById = (id: CarType["id"]) => (store: RootState) => store.carsStatus.cars[id];

export default carsStatusSlice.reducer;
