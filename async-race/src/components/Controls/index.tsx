import React, { useCallback, useState } from "react";
// import { Button } from '../Button';
import { useCars } from "../../hooks/useCars";

import { useCarStatuses } from "../../hooks/useCarStatuses";
import { useRaceStatus } from "../../hooks/useRaceStatus";
import { CarStatus } from "../../types";
import Button from "@mui/material/Button";
import { WinnerModal } from "../WinnerModal";

interface Props {}

const randomColor = () => Math.floor(Math.random() * 10);

export const Controls: React.FC<Props> = () => {
  const { addCar, cars } = useCars();

  const { startCars } = useCarStatuses();
  const { raceFinish, carStarted } = useRaceStatus();
  //TODO: Заменить на useCallBack

  // const onRaceClick = () => {
  //   startCars(cars, 'started', carStarted);
  // };

  const onRaceClick = useCallback(() => startCars(cars, "started", carStarted), [carStarted, cars, startCars]);

  const onStopClick = async () => {
    await startCars(cars, "stopped", carStarted);
    raceFinish(cars);
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
