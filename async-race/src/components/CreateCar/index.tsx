import React, { useEffect, useState } from "react";
import { CarType } from "../../types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styles from "./styles.module.css";
import { Color, ColorPicker } from "material-ui-color";

const defaultCar = { name: "", color: "" };

interface Props {
  buttonText: string;
  car?: any;
  onSave: (car: Omit<CarType, "id">) => void;
}

export const CreateCar: React.FC<Props> = ({ buttonText, car, onSave }) => {
  const [newCar, setNewCar] = useState<Omit<CarType, "id">>(car ?? defaultCar);

  useEffect(() => {
    car && setNewCar(car);
  }, [car]);

  const onInputChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCar({ ...newCar, [name]: event.target.value });
  };

  const onColorChange = ({ hex }: Color) => {
    // console.log(hex);
    // console.log();
    setNewCar({ ...newCar, color: "#" + hex });
  };

  // const onInputChange = (name: string) => (event: Color) => {
  //   setNewCar({ ...newCar, [name]: event.value });
  // };
  const onCreateClick = async () => {
    if (newCar.name === "") {
      alert("Wrong car name!");
      return;
    }

    await onSave(newCar);
    setNewCar(defaultCar);
  };

  return (
    <div className='create-car'>
      {/* <input type='text' value={newCar.name} onChange={onInputChange("name")} /> */}
      <TextField value={newCar.name} onChange={onInputChange("name")} variant='standard' className={styles.input}></TextField>
      {/* <input type='color' className='color' value={newCar.color} onChange={onInputChange("color")} /> */}
      <ColorPicker value={newCar.color} onChange={onColorChange}></ColorPicker>
      <Button onClick={onCreateClick}>{buttonText}</Button>
    </div>
  );
};
