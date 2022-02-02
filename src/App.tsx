import * as React from "react";
import "./App.css";
import FormGroup from "@mui/material/FormGroup";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Config from "./Config";
import { Button } from "@mui/material"
import LoginUtil from "./util/login/LoginUtil";
import { UserData } from "./service/TwitchClientTypes";
import TwitchClient from "./service/TwitchClient";
import { Login } from "./components/Login";

const App = () => {
  const [userData, setUserData] = useState<UserData | undefined>(undefined);

  async function getUser() {
    const loginData = await LoginUtil.getLogin();
    if (loginData?.accessToken) {
      const client = new TwitchClient(loginData.accessToken);
      const user = await client.getCurrentUser();
      setUserData(user);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="App">
      <Grid container>
        <Grid item xs={12}>
          <FormGroup>
            <Login
              userData={userData}
              onLogin={() => getUser()}
            />
            <div>There is nothing here yet 🤓</div>
          </FormGroup>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
