import * as React from "react";
import "./App.css";
import { AppStateContextProvider } from "./state/AppStateContextProvider";
import { TwitchDataStateContextProvider } from "./state/TwitchDataStateContextProvider";
import { FavoritesStateContextProvider } from "./state/FavoritesStateContextProvider";
import MainApp from "./components/MainApp";

const App = () => {

  return (
    <AppStateContextProvider>
      <TwitchDataStateContextProvider>
        <FavoritesStateContextProvider>
          <MainApp />
        </FavoritesStateContextProvider>
      </TwitchDataStateContextProvider>
    </AppStateContextProvider>
  )
};

export default App;
