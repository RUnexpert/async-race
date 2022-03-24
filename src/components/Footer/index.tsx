import React from "react";
import styles from "./styles.module.css";
import { Typography } from "@mui/material";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <Typography>2022</Typography>
        </li>
        <li className={styles.listItem}>
          <a href='https://github.com/RUnexpert'>
            <Typography>Alexander Protasov</Typography>
          </a>
        </li>
      </ul>
    </footer>
  );
};
