import React, { useState, useCallback } from "react";
import { CarType } from "../../types";
import { CarTrack } from "../../components/CarTrack";
import { CreateCar } from "../../components/CreateCar";
import { Controls } from "../../components/Controls";
import { useCars } from "../../hooks/useCars";
import { useAppDispatch } from "../../hooks/useStore";
import { updateCar, addCar } from "../../store/carsReducer";
import { WinnerModal } from "../../components/WinnerModal";
import { Footer } from "../../components/Footer";
import styles from "./styles.module.css";
import { Typography } from "@mui/material";

export const GaragePage = () => {
  const { cars } = useCars();

  const [selectedCar, setSelectedCar] = useState<CarType | null>(null);
  const dispatch = useAppDispatch();
  const onCreateCar = useCallback((newCar) => dispatch(addCar(newCar)), [dispatch]);
  const onUpdateCar = useCallback(
    (newCar) => {
      dispatch(updateCar(newCar));
      setSelectedCar(null);
    },
    [dispatch]
  );

  return (
    <>
      <header className={styles.header}>
        <CreateCar buttonText='Create' onSave={onCreateCar} />
        <CreateCar buttonText='Update' car={selectedCar} onSave={onUpdateCar} />
        <Controls />
      </header>
      <main className={styles.main}>
        <WinnerModal></WinnerModal>
        <Typography variant='h4' color={"white"} my={2}>Garage ({cars.length})</Typography>
        {cars.map((car) => (
          <CarTrack key={car.id} setSelectedCar={setSelectedCar} car={car} />
        ))}
      </main>
      <Footer />
    </>
  );
};
