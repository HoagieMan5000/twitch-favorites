import { AppBar, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";
import { TwitchDataStateContext } from "../state/TwitchDataStateContextProvider";
import { FlexRow } from "../util/FlexBox";
import { Login } from "./login/Login";

export interface PopHeaderProps {}

export const PopHeader = (props: PopHeaderProps) => {
  const {
    twitchDataState: { userData, accessToken },
    callbacks: { getUser, resetToken, getToken, refreshUser, logout },
  } = useContext(TwitchDataStateContext);

  return (
    <AppBar
      style={{
        backgroundColor: "#3C474B",
        color: "#dbdbf8",
      }}
      position="static"
    >
      <Toolbar variant="dense">
        <FlexRow
          flexGrow={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6">Twitch Favorites</Typography>
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
        </FlexRow>
      </Toolbar>
    </AppBar>
  );
};
