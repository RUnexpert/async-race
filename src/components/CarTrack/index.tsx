import React, { useCallback, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { useRaceWinner } from "../../hooks/useRaceWinner";
import { moveCar, selectCarStatusById, finishCar } from "../../store/carsStatusReducer";
import { selectRaceDistance } from "../../store/raceStatusReducer";
import { CarType } from "../../types";
import styles from "./styles.module.css";
import { Car } from "../CarIcon";
import { Flag } from "../FlagIcon";
import { removeCar } from "../../store/carsReducer";

interface Props {
  car: CarType;
  setSelectedCar: (car: CarType) => void;
}

const CarTrackComponent: React.FC<Props> = ({ car, setSelectedCar }) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectCarStatusById(car.id)) ?? { distance: 0 };
  const statusRef = useRef(status);
  statusRef.current = status;
  const distance = useAppSelector(selectRaceDistance());
  const { setRaceWinner } = useRaceWinner();
  const timeoutIdRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (statusRef.current?.status !== "started") {
      return;
    }

    timeoutIdRef.current = setTimeout(() => {
      if (statusRef.current?.status !== "started") {
        return;
      }
      const newDistance = statusRef.current.distance + 100;
      dispatch(
        moveCar({
          id: car.id,
          distance: Math.min(newDistance, distance),
        })
      );

      if (newDistance >= distance) {
        setTimeout(() => {
          dispatch(finishCar(car.id));
          setRaceWinner(car.id);
        }, 500);
      }
    }, status.speed);
  }, [car.id, dispatch, distance, status.distance, status.speed, status.status, setRaceWinner]);

  const onRemoveClick = useCallback(() => dispatch(removeCar(car.id)), [dispatch, car]);
  const setSelectedCarCallback = useCallback(() => {
    setSelectedCar(car);
  }, [setSelectedCar, car]);

  return (
    <div className={styles.wrapper}>
      <div>
        <Button onClick={setSelectedCarCallback} variant='text' size='small'>
          Select
        </Button>
        <Button onClick={onRemoveClick} variant='text' size='small'>
          Remove
        </Button>
        <span className={styles.name}>{car.name}</span>
      </div>
      <div className={styles.track}>
        <div style={{ left: status.distance + "px" }} className={styles.car}>
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
