import * as React from "react";
import "./App.css";
import FormGroup from "@mui/material/FormGroup";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Login } from "./components/login/Login";
import { useUserData } from "./hooks/UserData";

const App = () => {

  const [userData, getUser] = useUserData();

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
