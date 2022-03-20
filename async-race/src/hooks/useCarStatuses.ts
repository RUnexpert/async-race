import { useRef } from 'react';
import { moveCar, startCar, stopCar } from '../store/carsStatusReducer';
import { CarStatus, CarType } from "../types";
import { useCars } from './useCars';
import { useRaceStatus } from "./useRaceStatus";
import { useAppDispatch, useAppSelector } from './useStore';

export const useCarStatuses = () => {
  const carsStatuses = useAppSelector((state) => state.carsStatus.cars);
  const {cars} = useCars();
  const dispatch = useAppDispatch();
  const carsStatusesRef = useRef(carsStatuses);
  carsStatusesRef.current = carsStatuses

  return {
    carsStatuses,
    carsStatusesRef,
    startCars() {
      cars.forEach((car) => {
        dispatch(startCar(car.id))
      });
    },
    stopCars() {
      cars.forEach((car) => {
        dispatch(stopCar(car.id))
      });
    },
    moveCars(distance: CarStatus['distance']) {
      cars.forEach((car) => {
        dispatch(moveCar({ id: car.id, distance }))
      });
    },

  };
};
