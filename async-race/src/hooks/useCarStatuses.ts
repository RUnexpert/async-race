import { CarStatus, CarType } from "../types";
import { useRaceStatus } from "./useRaceStatus";
import { useAppSelector } from "./useStore";

export const useCarStatuses = () => {
  const carsStatuses = { ...useAppSelector((state) => state.carsStatus.cars) };
  console.log(carsStatuses);

  const startCars = async (cars: CarType[], status: CarStatus["status"], carStarted: (cars: CarType[]) => void) => {
    cars.map(async (car) => {
      carsStatuses[car.id] = {
        status,
        speed: Math.random() * 300,
        distance: 0,
        // status === "started" ? 0 : carsStatuses[car.id].distance,
      };
    });

    if (status === "started") {
      carStarted(cars);
    }
  };

  return {
    carsStatuses,
    startCars,
    moveCar(carId: CarType["id"], distance: CarStatus["distance"]) {
      carsStatuses[carId] = {
        ...carsStatuses[carId],
        distance,
      };
    },
    moveCars(cars: CarType[], distance: CarStatus["distance"]) {
      cars.forEach((car) => {
        carsStatuses[car.id] = {
          ...carsStatuses[car.id],
          distance,
        };
      });
    },
  };
};
