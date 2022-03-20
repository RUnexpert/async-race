import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { moveCar, selectCarStatusById } from "../../store/carsStatusReducer";
import { selectRaceDistance } from "../../store/raceStatusReducer";
import { CarType } from "../../types";
import styles from "./styles.module.css";
import { Car } from "../Car";
import { Flag } from "../Flag";
import { useCars } from "../../hooks/useCars";
import Button from "@mui/material/Button";

interface Props {
  car: CarType;
  setSelectedCar: (car: CarType) => void;
}

const CarTrackComponent: React.FC<Props> = ({ car, setSelectedCar }) => {
  const carRef = useRef<HTMLDivElement>(null);
  const { removeCar } = useCars();
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectCarStatusById(car.id)) ?? { distance: 0 };
  const statusRef = useRef(status);
  statusRef.current = status;
  const distance = useAppSelector(selectRaceDistance());
  const timeoutIdRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (statusRef.current?.status !== "started") {
      return;
    }

    timeoutIdRef.current = setTimeout(() => {
      if (statusRef.current?.status !== "started") {
        return;
      }

      dispatch(
        moveCar({
          id: car.id,
          distance: Math.min(statusRef.current.distance + 100, distance),
        })
      );
    }, status.speed);
  }, [car.id, dispatch, status.distance, status.status]);

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

export const CarTrack = React.memo(CarTrackComponent);
