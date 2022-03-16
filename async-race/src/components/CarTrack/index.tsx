import React, { useEffect, useRef, useState } from "react";
import { CarStatus, CarType } from "../../types";
import styles from "./styles.module.css";
import { Car } from "../Car";
import { Flag } from "../Flag";
// import { Button } from '../Button';
import { useCarStatuses } from "../../hooks/useCarStatuses";
import { useCars } from "../../hooks/useCars";
import { useRaceStatus } from "../../hooks/useRaceStatus";
import Button from "@mui/material/Button";

interface Props {
  car: CarType;
  setSelectedCar: (car: CarType) => void;
}

export const CarTrack: React.FC<Props> = ({ car, setSelectedCar }) => {
  const carRef = useRef<HTMLDivElement>(null);
  const { carsStatuses, moveCar } = useCarStatuses();
  const { cars, removeCar } = useCars();
  const {
    raceStatus: {},
  } = useRaceStatus();
  const status = carsStatuses[car.id] ?? { distance: 0 };

  useEffect(() => {
    if (status?.status !== "started") {
      return;
    }
  }, [status.distance, status]);

  const onRemoveClick = () => {
    removeCar(car.id);
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <Button onClick={() => setSelectedCar(car)}>Select</Button>
        <Button onClick={onRemoveClick}>Remove</Button>
        <span className={styles.name}>{car.name}</span>
      </div>
      <div className={styles.track}>
        <div style={{ left: status.distance + "px" }} ref={carRef} className={styles.car}>
          <Car color={car.color} />
        </div>
        <div className={styles.flag}>
          <Flag />
        </div>
      </div>
    </div>
  );
};
