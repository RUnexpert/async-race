import { useAppSelector } from "./useStore";

export const useWinners = () => {
  const winners = useAppSelector((rootState) => rootState.winners.winners);
  return {
    winners,
  };
};
