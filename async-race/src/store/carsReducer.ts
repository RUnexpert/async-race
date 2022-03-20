import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CarType } from "../types";

export interface CarsState {
  cars: CarType[];
}

const initialState: CarsState = {
  cars: [
    {
      name: "Tesla",
      color: "#e6e6fa",
      id: 1,
    },
    {
      name: "BMW",
      color: "#fede00",
      id: 2,
    },
    {
      name: "Mersedes",
      color: "#6c779f",
      id: 3,
    },
    {
      name: "Ford",
      color: "#ef3c40",
      id: 4,
    },
  ],
};

export const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    addCar: (state, action: PayloadAction<Omit<CarType, "id">>) => {
      state.cars.push({
        ...action.payload,
        id: state.cars.length + 1,
      });
    },
    removeCar: (state, action: PayloadAction<CarType["id"]>) => {
      state.cars = state.cars.filter(({ id }) => id !== action.payload);
    },
    updateCar: (state, action: PayloadAction<CarType>) => {
      state.cars = state.cars.map((car) => (car.id === action.payload.id ? action.payload : car));
    },
  },
});


export const { addCar, removeCar, updateCar } = carsSlice.actions;
export default carsSlice.reducer;
