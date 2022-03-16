import React, { useEffect, useState } from "react";
import styles from "./styles.modules.css";
import { useWinners } from "../../hooks/useWinners";

export const WinnersPage = () => {
  const { winners } = useWinners();

  useEffect(() => {
    // getWinners().then((winners) => setWinners(winners));
  }, []);

  return (
    <div style={{ color: "white" }}>
      <h2>Winners ({winners.length})</h2>
      <table>
        <tr>
          <td>Number</td>
          <td>Car</td>
          <td>Name</td>
          <td>Wins</td>
          <td>Best time</td>
        </tr>

        {winners.map((winner, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{}</td>
            <td>{winner.car.name}</td>
            <td>{winner.wins}</td>
            <td>{winner.minTime}</td>
          </tr>
        ))}
      </table>
      {/* <Button onClick={getWinners()}>Prev</Button><Button>Next</Button> */}
    </div>
  );
};
