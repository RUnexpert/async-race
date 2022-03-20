import React, { useState, useCallback } from "react";
import { CarType } from "../../types";
import { CarTrack } from "../CarTrack";
import { CreateCar } from "../CreateCar";
import { Controls } from "../Controls";
import { useCars } from "../../hooks/useCars";
import { useAppDispatch } from "../../hooks/useStore";
import { updateCar, addCar } from "../../store/carsReducer";

export const GaragePage = () => {
  const { cars } = useCars();


  const [selectedCar, setSelectedCar] = useState<CarType | null>(null);
  const dispatch = useAppDispatch();
  const onCreateCar = useCallback((newCar) => dispatch(addCar(newCar)), [dispatch]);
  const onUpdateCar = useCallback((newCar) => dispatch(updateCar(newCar)), [dispatch]);

  return (
    <>
      <header className='header'>
        <CreateCar buttonText='Create' onSave={onCreateCar} />

        <CreateCar
          buttonText='Update'
          car={selectedCar}
          onSave={onUpdateCar}
        />

        <Controls />
      </header>
      <main className='main'>
        <h1>
          Garage (<span className='number'>{cars.length}</span>)
        </h1>

        {cars.map((car) => (
          <CarTrack key={car.id} setSelectedCar={setSelectedCar} car={car} />
        ))}
      </main>
      {/* <Footer /> */}
    </>
  );
};
