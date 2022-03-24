import React, { useCallback } from "react";
import Button from "@mui/material/Button";
import { useRaceStatus } from "../../../hooks/useRaceStatus";

export const RaceButton = () => {
  const { startRace } = useRaceStatus();
  const onRaceClick = useCallback(() => startRace(), [startRace]);
  return (
    <Button onClick={onRaceClick} variant='outlined'>
      Race
    </Button>
  );
};
