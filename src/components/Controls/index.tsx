import React from "react";
import styles from "./styles.module.css";
import { RaceButton } from "./RaceButton";
import { ResetButton } from "./ResetButton";
import { GenerateCarsButton } from "./GenerateCarsButton";

export const Controls: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <RaceButton />
      <ResetButton />
      <GenerateCarsButton />
    </div>
  );
};
