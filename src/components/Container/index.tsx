import styles from "./styles.module.css";
import { GaragePage } from "../../pages/GaragePage";
import { WinnersPage } from "../../pages/WinnersPage";
import { Navigation } from "../Navigation";
import React, { useState } from "react";
import { PageType } from "../../types";

export const Container = () => {
  const [page, setPage] = useState<PageType>("garage");
  return (
    <div className={styles.container}>
      <Navigation setPage={setPage} />
      <div className={styles.content}>
        {page === "garage" && <GaragePage />}
        {page === "winners" && <WinnersPage />}
      </div>
    </div>
  );
};
