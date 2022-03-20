import React, { useEffect } from "react";
import styles from "./styles.modules.css";
import { useWinners } from "../../hooks/useWinners";
import { DataGrid } from "@mui/x-data-grid";

export const WinnersPage = () => {
  const { winners } = useWinners();
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "car", headerName: "Car", width: 130 },
    { field: "wins", headerName: "Wins", width: 130 },
    { field: "bestTime", headerName: "Best time", width: 130 },
  ];

  const rows = winners.map((winner, index) => ({
    id: index + 1,
    car: winner.car.name,
    wins: winner.wins,
    bestTime: winner.minTime,
  }));

  console.log(rows);

  return (
    <div style={{ color: "white" }}>
      <h2>Winners ({winners.length})</h2>
      {/* <tr>
          <td>Number</td>
          <td>Car</td>
          <td>Name</td>
          <td>Wins</td>
          <td>Best time</td>
        </tr> */}

      {/* {winners.map((winner, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{}</td>
            <td>{winner.car.name}</td>
            <td>{winner.wins}</td>
            <td>{winner.minTime}</td>
          </tr>
        ))} */}

      <div style={{ height: 400, width: "600px", color: "white" }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
      </div>
    </div>
  );
};
