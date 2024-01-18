import * as React from "react";
import "./App.css";
import { AppStateContextProvider } from "../../shared/state/AppStateContextProvider";
import { TwitchDataStateContextProvider } from "../../shared/state/TwitchDataStateContextProvider";
import { FavoritesStateContextProvider } from "../../shared/state/FavoritesStateContextProvider";
import MainApp from "../../shared/components/MainApp";

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
