import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CarType, WinnerType } from "../types";

export interface WinnersState {
  winners: WinnerType[];
}

const initialState: WinnersState = {
  winners: [],
};

export const winnersSlice = createSlice({
  name: "winners",
  initialState,
  reducers: {
    addWinner: (state, action: PayloadAction<{ car: CarType; time: number }>) => {
      if (state.winners.length < 2) {
        state.winners.push({ car: action.payload.car, wins: 1, minTime: 2 });
        console.log("action", action);
        // time: action.payload.time
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addWinner } = winnersSlice.actions;

export default winnersSlice.reducer;
