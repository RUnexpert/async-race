import { useState, useContext } from "react";
import { CarStatus, CarType } from "../types";
import { useAppSelector, useAppDispatch } from "./useStore";
import { addCar, removeCar } from "../store/carsReducer";
import { RootState } from "../store";

export const useCars = () => {
  const dispatch = useAppDispatch();
  const cars = useAppSelector((rootState) => rootState.cars.cars);
  return {
    cars,
    addCar: (newCar: CarType) => dispatch(addCar(newCar)),
    removeCar: (id: CarType["id"]) => dispatch(removeCar(id)),
    selectCarById: (carId?: CarType["id"]) => (rootState: RootState) => rootState.cars.cars.find(({ id }) => id === carId),
  };
};
