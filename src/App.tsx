import React from "react";
import { createTheme, ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { Container } from "./components/Container";
import { Provider } from "react-redux";
import store from "./store";

const App: React.FC = () => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={darkTheme}>
        <Provider store={store}>
          <Container />
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
export default App;
