import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CarStatus, CarType } from '../types';
import { RootState } from './index';

export interface CarsStatusState {
  cars: Record<string, CarStatus>;
}

const initialState: CarsStatusState = { cars: {} };

export const carsStatusSlice = createSlice({
  name: "carsStatus",
  initialState,
  reducers: {
    startCar: (state, {payload}: PayloadAction<CarType['id']>) => {
      state.cars[payload] = {
        status: 'started',
        speed: Math.random() * 500,
        distance: 0,
      };
    },
    stopCar: (state, {payload}: PayloadAction<CarType['id']>) => {
      state.cars[payload].status = 'stopped';
    },
    moveCar: (state, {payload}: PayloadAction<{id: CarType['id'], distance: CarStatus['distance']}>) => {
      state.cars[payload.id].distance = payload.distance
    },
  },
});


export const { startCar, stopCar, moveCar } = carsStatusSlice.actions;

export const selectCarStatusById = (id: CarType['id']) => (store: RootState) => store.carsStatus.cars[id]

export default carsStatusSlice.reducer;
