import * as React from "react";
import "./App.css";
import FormGroup from "@mui/material/FormGroup";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Login } from "./components/login/Login";
import { useUserData } from "./hooks/UserData";
import { useFollowingList } from "./hooks/FollowingList";
import { TwitchFollowedStreamList } from "./components/followerlist/TwitchFollowedStreamList";
import { useStreams } from "./hooks/Streams";
import { TwitchStreamList } from "./components/streamlist/TwitchStreamList";
import { Divider } from "@mui/material";
import { defaultFavoritesData } from "./components/favoriteslist/FavoritesTypes";
import { FavoritesListContainer } from "./components/favoriteslist/FavoritesListContainer";

const App = () => {

  const [userData, getUser] = useUserData();
  const [followerList, getFollowing] = useFollowingList(userData);
  const [streams, getStreams] = useStreams(followerList);
  const [favorites, setFavorites] = useState(defaultFavoritesData);

  useEffect(() => {
    getUser();
  }, []);

  console.log({ favorites });

  return (
    <div className="App">
      <Grid container>
        <Grid item xs={12}>
          <FormGroup>
            <Login
              userData={userData}
              onLogin={() => getUser()}
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FavoritesListContainer
            favorites={favorites}
            streams={streams ?? []}
            following={followerList ?? []}

            onFavoritesChange={(newValue) => setFavorites(newValue)}
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
  )
};

export default App;
