import React, { useState } from "react";
import { GaragePage } from "./components/GaragePage";
import { WinnersPage } from "./components/WinnersPage";
import { Navigation } from "./components/Navigation";
import { PageType } from "./types";
import { Provider } from "react-redux";
import store from "./store";

const App: React.FC = () => {
  const [page, setPage] = useState<PageType>("garage");
  return (
    <Provider store={store}>
      <Navigation setPage={setPage} />
      {page === "garage" && <GaragePage />}
      {page === "winners" && <WinnersPage />}
    </Provider>
  );
};
export default App;
