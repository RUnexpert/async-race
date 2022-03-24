import { useCarStatuses } from "./useCarStatuses";
import { useAppSelector, useAppDispatch } from "./useStore";
import { startRace, finishRace } from "../store/raceStatusReducer";

export const useRaceStatus = () => {
  const dispatch = useAppDispatch();
  const raceStatus = useAppSelector((rootState) => rootState.raceStatus);
  const { startCars, resetCars } = useCarStatuses();

  return {
    raceStatus,
    startRace: () => {
      if (!raceStatus.started) {
        startCars();
        dispatch(startRace());
      }
    },
    raceFinish: () => {
      dispatch(finishRace());
      resetCars();
    },
  };
};
