import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CarType, WinnerType } from "../types";

export interface WinnersState {
  winners: Record<string, WinnerType>;
  modalShown: boolean;
}

const initialState: WinnersState = {
  winners: {},
  modalShown: false,
};

export const winnersSlice = createSlice({
  name: "winners",
  initialState,
  reducers: {
    addWinner: (state, { payload }: PayloadAction<{ id: CarType["id"]; time: number }>) => {
      const id = payload.id;

      if (state.winners[id]) {
        const prev = state.winners[id];
        state.winners[id] = { wins: prev.wins + 1, minTime: Math.min(prev.minTime, payload.time) };
      } else {
        state.winners[id] = { wins: 1, minTime: payload.time };
      }
      state.modalShown = false;
    },
    setModalShown: (state, { payload }: PayloadAction<boolean>) => {
      state.modalShown = payload;
    },
  },
});

export const { addWinner, setModalShown } = winnersSlice.actions;
export default winnersSlice.reducer;
