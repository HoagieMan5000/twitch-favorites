import * as React from "react";
import "./App.css";
import FormGroup from "@mui/material/FormGroup";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Login } from "./components/login/Login";
import { useUserData } from "./hooks/UserData";
import { useFollowingList } from "./hooks/FollowingList";
import { TwitchFollowedStreamList } from "./components/followerlist/TwitchFollowedStreamList";
import { useStreams } from "./hooks/Streams";
import { TwitchStreamList } from "./components/streamlist/TwitchStreamList";
import { Divider } from "@mui/material";

const App = () => {

  const [userData, getUser] = useUserData();
  const [followerList, getFollowing] = useFollowingList(userData);
  const [streams, getStreams] = useStreams(followerList);

  useEffect(() => {
    getUser();
  }, []);

  console.log({ streams });

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
          <TwitchStreamList
            streams={streams ?? []}
          />
          <Divider />
          <TwitchFollowedStreamList
            following={followerList ?? []}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
