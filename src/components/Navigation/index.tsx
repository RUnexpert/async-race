import React, { useCallback } from "react";
import { PageType } from "../../types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { MenuItem } from "@mui/material";

interface Props {
  setPage: (page: PageType) => void;
}

export const Navigation: React.FC<Props> = ({ setPage }) => {
  const onClick = useCallback((page: PageType) => () => setPage(page), [setPage]);
  return (
    <div>
      <AppBar position='static'>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <MenuItem onClick={onClick("garage")}>GARAGE</MenuItem>
            <MenuItem onClick={onClick("winners")}>WINNERS</MenuItem>
          </Box>
          <Box sx={{ flexGrow: 0 }}></Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};
