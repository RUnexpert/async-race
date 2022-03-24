import React, { useCallback } from "react";
import Button from "@mui/material/Button";
import { useAppDispatch } from "../../../hooks/useStore";
import { addCar } from "../../../store/carsReducer";
import { getRandomArrayItem } from "../../../utils";
import { randomColor } from "../../../utils";

const cars = {
  Nissan: ["Skyline GT-R", "370Z", "240SX"],
  Toyota: ["Supra", "Celica", "AE86", "GT86"],
  Ford: ["Focus", "Mustang", "GT", "Torino"],
  BMW: ["M4", "M8", "M3", "M5", "Z4"],
  Mitsubishi: ["Lancer Evolution", "Eclipse", "3000GT", "Galant VR-4"],
  Mazda: ["RX-8", "RX-7", "MX-5"],
};

export const GenerateCarsButton = () => {
  const dispatch = useAppDispatch();

  const onGenerateClick = useCallback(() => {
    for (let i = 0; i < 4; i++) {
      const carBrand = getRandomArrayItem(Object.keys(cars));
      const carModel = getRandomArrayItem(cars[carBrand as keyof typeof cars]);
      dispatch(
        addCar({
          name: `${carBrand} ${carModel}`,
          color: `#${randomColor()}`,
        })
      );
    }
  }, [dispatch]);
  return (
    <Button onClick={onGenerateClick} variant='outlined'>
      Generate Cars
    </Button>
  );
};
