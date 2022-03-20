import React, { useCallback } from "react";
import { useCars } from "../../hooks/useCars";
import { useRaceStatus } from "../../hooks/useRaceStatus";
import Button from "@mui/material/Button";
import { WinnerModal } from "../WinnerModal";

interface Props {}

const randomColor = () => Math.floor(Math.random() * 10);

export const Controls: React.FC<Props> = () => {
  const { addCar } = useCars();

  const { raceFinish, startRace } = useRaceStatus();

  const onRaceClick = useCallback(() => startRace(), [startRace]);

  const onStopClick = async () => {
    raceFinish();
  };

  const onGenerateClick = async () => {
    for (let i = 0; i < 10; i++) {
      addCar({
        id: i + 100,
        name: `Test ${i + 1}`,
        color: `#${randomColor()}${randomColor()}${randomColor()}`,
      });
    }
  };

  return (
    <div className='control-game'>
      <Button onClick={onRaceClick}>Race</Button>
      <Button onClick={onStopClick}>Reset</Button>
      <Button onClick={onGenerateClick}>Generate Cars</Button>
      <WinnerModal></WinnerModal>
    </div>
  );
};
