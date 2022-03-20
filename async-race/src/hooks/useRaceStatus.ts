import { useRef } from "react";
import { CarType } from "../types";
import { useCars } from "./useCars";
import { useCarStatuses } from "./useCarStatuses";
import { useAppSelector, useAppDispatch } from "./useStore";
import { startRace, finishRace, setWinner } from "../store/raceStatusReducer";
import { addWinner } from "../store/winnersReducer";

let setIntervalId: number;

export const useRaceStatus = () => {
  const { cars } = useCars();
  const dispatch = useAppDispatch();
  const raceStatus = useAppSelector((rootState) => rootState.raceStatus);
  const { carsStatusesRef, moveCars, startCars, stopCars } = useCarStatuses();
  const raceStatusRef = useRef(raceStatus);
  raceStatusRef.current = raceStatus;

  const setRaceWinner = (car: CarType) => {
    if (raceStatusRef.current.started && !raceStatusRef.current.winner) {
      dispatch(setWinner(car.id));
      dispatch(addWinner({ car, time: raceStatus?.winner?.time }));
    }
  };

  const runSetInterval = (cars: CarType[]) => {
    clearInterval(setIntervalId);
    // change
    setIntervalId = window.setInterval(() => {
      cars.forEach((car) => {
        const status = carsStatusesRef.current[car.id] ?? { distance: 0, speed: 0 };
        const distance = raceStatusRef.current.distance;

        if (status.status === "stopped") return;
        if (status.distance >= distance) {
          setRaceWinner(car);
          clearInterval(setIntervalId);
          return;
        }
      });
    }, 1000);
  };

  return {
    raceStatus,
    setWinner: setRaceWinner,
    startRace: () => {
      if (!raceStatus.started) {
        startCars();
        dispatch(startRace());

        runSetInterval(cars);
      } else {
        runSetInterval(cars);
      }
    },
    raceFinish: () => {
      dispatch(finishRace());
      clearInterval(setIntervalId);
      stopCars();
      moveCars(0);
    },
  };
};
