import { useRef } from 'react';
import { startCar, resetCar } from '../store/carsStatusReducer';
import { useCars } from './useCars';
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
    resetCars() {
      cars.forEach((car) => {
        dispatch(resetCar(car.id))
      });
    },


  };
};
