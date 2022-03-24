import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FINISH_FROM_RIGHT } from "../constants";
import { CarType, RaceWinnerType } from "../types";
import { RootState } from "./index";

export interface RaceStatusState {
  winner?: RaceWinnerType;
  started: number;
  distance: number;
}

const initialState: RaceStatusState = {
  started: 0,
  distance: 0,
};

export const raceStatusSlice = createSlice({
  name: "raceStatus",
  initialState,
  reducers: {
    startRace: (state) => {
      state.started = new Date().getTime();
      state.distance = window.innerWidth - FINISH_FROM_RIGHT;
      delete state.winner;
    },
    setWinner: (state, action: PayloadAction<{ id: CarType["id"]; finishTime: number }>) => {
      if (!state.winner) {
        state.winner = {
          id: action.payload.id,
          time: action.payload.finishTime,
        };
      }
    },
    finishRace: (state) => {
      state.started = 0;
    },
  },
});

export const { startRace, setWinner, finishRace } = raceStatusSlice.actions;
export const selectRaceDistance = () => (store: RootState) => store.raceStatus.distance;
export default raceStatusSlice.reducer;
