import React, { useCallback, useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useRaceStatus } from "../../hooks/useRaceStatus";
import { useAppSelector } from "../../hooks/useStore";
import styles from "./styles.module.css";
import { selectCarById } from "../../store/carsReducer";
import { setModalShown } from "../../store/winnersReducer";
import { useAppDispatch } from "../../hooks/useStore";

export const WinnerModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { raceStatus } = useRaceStatus();

  const dispatch = useAppDispatch();

  const winnerCar = useAppSelector(selectCarById(raceStatus?.winner?.id));
  const modalShown = useAppSelector((rootState) => rootState.winners.modalShown);

  useEffect(() => {
    console.log("winnerCar?.id", winnerCar?.id);
    console.log("modalShown", modalShown);
    if (!modalShown) {
      setOpen(!!winnerCar?.id);
      dispatch(setModalShown(true));
    }
  }, [winnerCar?.id, modalShown, dispatch]);

  const onClose = useCallback(() => setOpen(false), [setOpen]);
  return (
    <Modal open={open} onClose={onClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
      <Box sx={{}} className={styles.box}>
        {winnerCar && (
          <>
            <h1>Winner: {winnerCar.name}</h1>
            <h2>Car: {winnerCar.color}</h2>
            <h2>Time: {raceStatus?.winner?.time} seconds</h2>
          </>
        )}
      </Box>
    </Modal>
  );
};
