import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import styles from "./styles.module.css";
import { useWinners } from "../../hooks/useWinners";
import { Car } from "../../components/CarIcon";
import { CarType } from "../../types";
import { selectCarsByIds } from "../../store/carsReducer";
import { useAppSelector } from "../../hooks/useStore";
import { Typography } from "@mui/material";

export const WinnersPage = () => {
  const { winners } = useWinners();
  const carsIds = Object.keys(winners);
  const carsMap = useAppSelector(selectCarsByIds(carsIds));
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "car",
      headerName: "Car",
      width: 130,
      renderCell: ({ value }: GridRenderCellParams<CarType>) => (
        <>
          <Car color={value.color} className={styles.car} />
          {value.name}
        </>
      ),
    },
    { field: "wins", headerName: "Wins", width: 130 },
    { field: "bestTime", headerName: "Best time", width: 130 },
  ];

  const rows = Object.entries(winners).map(([carId, winner]) => ({
    id: carId,
    car: carsMap[carId],
    wins: winner.wins,
    bestTime: winner.minTime,
  }));

  return (
    <div>
      <Typography variant='h4' color={"white"} my={2} pl={2}>
        Winners ({rows.length})
      </Typography>

      <div className={styles.table}>
        <DataGrid
          sx={{ color: "white" }}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          initialState={{
            sorting: {
              sortModel: [{ field: "wins", sort: "desc" }],
            },
          }}
        />
      </div>
    </div>
  );
};
