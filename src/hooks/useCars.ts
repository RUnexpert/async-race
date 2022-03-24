import { useAppSelector } from "./useStore";
import { useMemo } from "react";

export const useCars = () => {
  const carsMap = useAppSelector((rootState) => rootState.cars.cars);
  const cars = useMemo(() => Object.values(carsMap), [carsMap]);
  return {
    cars,
  };
};
