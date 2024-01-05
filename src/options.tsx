import * as React from "react";
import * as ReactDOM from "react-dom";

import "./options.css";
import "./content.css";
import { Login } from "./components/login/Login";
import { useContext } from "react";
import { TwitchDataStateContext, TwitchDataStateContextProvider } from "./state/TwitchDataStateContextProvider";

export const Options = () => {
  const {
    twitchDataState: { userData, accessToken },
    callbacks: { getUser, refreshUser, logout, getToken, resetToken },
  } = useContext(TwitchDataStateContext);

  return (
    <div>
      <Login
        accessToken={accessToken}
        userData={userData}
        onLogin={async () => {
            await getToken();
            refreshUser();
        }}
        onLogout={() => {
            logout();
            resetToken();
        }}
      />
    </div>
  );
};

var mountNode = document.getElementById("options");
ReactDOM.render(
<TwitchDataStateContextProvider>
    <Options />
</TwitchDataStateContextProvider>
, mountNode);
