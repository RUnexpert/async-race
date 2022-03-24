import { useRef } from "react";
import { CarType } from "../types";
import { useAppSelector, useAppDispatch } from "./useStore";
import { setWinner } from "../store/raceStatusReducer";
import { addWinner } from "../store/winnersReducer";

export const useRaceWinner = () => {
  const dispatch = useAppDispatch();
  const raceStatus = useAppSelector((rootState) => rootState.raceStatus);
  const raceStatusRef = useRef(raceStatus);
  raceStatusRef.current = raceStatus;

  return {
    setRaceWinner: (id: CarType["id"]) => {
      if (raceStatusRef.current.started && !raceStatusRef.current.winner) {
        const finishTime = (new Date().getTime() - raceStatusRef.current.started) / 1000;
        dispatch(setWinner({ id, finishTime }));
        dispatch(addWinner({ id, time: finishTime }));
      }
    },
  };
};
