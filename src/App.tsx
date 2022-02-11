import * as React from "react";
import "./App.css";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

import { defaultFavoritesData, FavoritesData } from "./components/favoriteslist/FavoritesTypes";
import { FavoritesListContainer } from "./components/favoriteslist/FavoritesListContainer";
import ChromeStorage from "./util/chrome/ChromeStorage";
import { PopHeader } from "./components/PopHeader";
import { AppStateContextProvider } from "./state/AppStateContextProvider";
import { TwitchDataStateContextProvider } from "./state/TwitchDataStateContextProvider";

const App = () => {

  const [favorites, setFavorites] = useState(defaultFavoritesData);

  useEffect(() => {
    async function load() {
      const loadedFavorites = await (new ChromeStorage()).getSync(["favorites"]);
      setFavorites(loadedFavorites?.favorites as FavoritesData ?? defaultFavoritesData);
    }
    load();
  }, [])

  return (
    <AppStateContextProvider>
      <TwitchDataStateContextProvider>
        <div>
          <PopHeader />
          <div className="App">
            <Grid container>
              <Grid item xs={12}>
                <FavoritesListContainer
                  favorites={favorites}
                  onFavoritesChange={(newValue) => {
                    new ChromeStorage().setSync({
                      favorites
                    });
                    setFavorites(newValue)
                  }}
                />
              </Grid>
              {/*
          <TwitchStreamList
            streams={streams ?? []}
          />
          <Divider />
          <TwitchFollowedStreamList
            following={followerList ?? []}
          />
        */}
            </Grid>
          </div >
        </div>
      </TwitchDataStateContextProvider>
    </AppStateContextProvider>
  )
};

export default App;
