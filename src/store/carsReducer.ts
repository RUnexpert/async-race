import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CarType } from "../types";
import { RootState } from ".";

export interface CarsState {
  cars: Record<string, CarType>;
  currentId: number;
}

const initialState: CarsState = {
  cars: {
    1: {
      name: "LADA",
      color: "#e6e6fa",
      id: 1,
    },
    2: {
      name: "Audi TT",
      color: "#fede00",
      id: 2,
    },

    3: {
      name: "Dodge Charger",
      color: "#6c779f",
      id: 3,
    },
    4: {
      name: "Ford Mustang",
      color: "#ef3c40",
      id: 4,
    },
  },
  currentId: 5,
};

export const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    addCar: (state, { payload }: PayloadAction<Omit<CarType, "id">>) => {
      const id = state.currentId++;
      state.cars[id] = {
        ...payload,
        id,
      };
    },
    removeCar: (state, { payload }: PayloadAction<CarType["id"]>) => {
      delete state.cars[payload];
    },
    updateCar: (state, { payload }: PayloadAction<CarType>) => {
      state.cars[payload.id] = {
        ...payload,
      };
    },
  },
});

export const { addCar, removeCar, updateCar } = carsSlice.actions;
export const selectCarById = (carId?: CarType["id"]) => (rootState: RootState) => carId ? rootState.cars.cars[carId] : null;
export const selectCarsByIds = (carsIds: string[]) => (rootState: RootState) =>
  carsIds.reduce<Record<string, CarType>>((acc, carId) => {
    acc[carId] = rootState.cars.cars[carId];
    return acc;
  }, {});
export default carsSlice.reducer;
