import { CarType } from "../types";
import { useCarStatuses } from "./useCarStatuses";
import { useAppSelector, useAppDispatch } from "./useStore";
import { startRace, finishRace, setWinner } from "../store/raceStatusReducer";
import { addWinner } from "../store/winnersReducer";

let setIntervalId: number;

export const useRaceStatus = () => {
  const dispatch = useAppDispatch();
  const raceStatus = useAppSelector((rootState) => rootState.raceStatus);
  const { carsStatuses, moveCar, moveCars } = useCarStatuses();

  const setRaceWinner = (car: CarType) => {
    if (raceStatus.started && !raceStatus.winner) {
      dispatch(setWinner(car.id));
      dispatch(addWinner({ car, time: raceStatus?.winner?.time }));
      //setRaceStatus({ ...raceStatus, winner: carId });
      //setWinner(carId, time);
    }
  };

  const runSetInterval = (cars: CarType[], distance: number) => {
    clearInterval(setIntervalId);
    // @ts-ignore
    setIntervalId = setInterval(() => {
      // console.log("setIntervalId", setIntervalId);

      cars.forEach((car) => {
        const status = carsStatuses[car.id] ?? { distance: 0, speed: 0 };

        if (status.status === "stopped") return;
        if (status.distance >= distance) {
          setRaceWinner(car);
          return;
        }
        moveCar(car.id, Math.min(status.distance + (status.speed ?? 0) / 40, distance));
      });
    }, 20);
  };

  return {
    raceStatus,
    setWinner: setRaceWinner,
    carStarted: (cars: CarType[]) => {
      if (!raceStatus.started) {
        dispatch(startRace());

        runSetInterval(cars, raceStatus.distance);
      } else {
        runSetInterval(cars, raceStatus.distance);
      }
    },
    raceFinish: (cars: CarType[]) => {
      dispatch(finishRace());
      clearInterval(setIntervalId);
      moveCars(cars, 0);
    },
  };
};
