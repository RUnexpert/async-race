import React, { useCallback, useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useRaceStatus } from "../../hooks/useRaceStatus";
import { useAppSelector } from "../../hooks/useStore";
import { useCars } from "../../hooks/useCars";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  color: "black",
};

export const WinnerModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { raceStatus } = useRaceStatus();
  const { selectCarById } = useCars();
  const winnerCar = useAppSelector(selectCarById(raceStatus?.winner?.id));
  useEffect(() => setOpen(!!winnerCar), [winnerCar]);
  const onClose = useCallback(() => setOpen(false), [setOpen]);
  return (
    <Modal open={open} onClose={onClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
      <Box sx={style}>
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
