import React, { useCallback } from "react";
import { useRaceStatus } from "../../../hooks/useRaceStatus";
import { Button } from "@mui/material";

export const ResetButton = () => {
  const { raceFinish } = useRaceStatus();
  const onStopClick = useCallback(() => raceFinish(), [raceFinish]);
  return (
    <Button onClick={onStopClick} variant='outlined'>
      Reset
    </Button>
  );
};
