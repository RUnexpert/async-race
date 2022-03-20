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
    setNewCar({ ...newCar, color: "#" + hex });
  };

  const onCreateClick = async () => {
    if (newCar.name === "") {
      alert("Wrong car name!");
      return;
    }

    await onSave(newCar);
    setNewCar(defaultCar);
  };

  return (
    <div className={styles.createCar}>
      <TextField value={newCar.name} onChange={onInputChange("name")} className={styles.input} />
      <ColorPicker value={newCar.color} onChange={onColorChange} hideTextfield />
      <Button onClick={onCreateClick}>{buttonText}</Button>
    </div>
  );
};
