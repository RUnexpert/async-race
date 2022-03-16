import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FINISH_FROM_RIGHT } from "../constants";
import { CarType, RaceWinnerType } from "../types";

export interface RaceStatusState {
  winner: RaceWinnerType | null;
  started: number;
  distance: number;
}

const initialState: RaceStatusState = {
  winner: null,
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
      state.winner = null;
    },
    setWinner: (state, action: PayloadAction<CarType["id"]>) => {
      if (!state.winner) {
        state.winner = {
          id: action.payload,
          time: (new Date().getTime() - state.started) / 1000,
        };
      }
    },
    finishRace: (state) => {
      state.started = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { startRace, setWinner, finishRace } = raceStatusSlice.actions;

export default raceStatusSlice.reducer;
