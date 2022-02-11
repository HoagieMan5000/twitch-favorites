import { AppBar, Toolbar, Typography } from "@mui/material"
import React, { useContext } from "react"
import { TwitchDataStateContext } from "../state/TwitchDataStateContextProvider";
import { FlexRow } from "../util/FlexBox";
import { Login } from "./login/Login";

export interface PopHeaderProps {
}

export const PopHeader = (props: PopHeaderProps) => {
    const {
        twitchDataState: { userData },
        callbacks: { getUser, logout }
    } = useContext(TwitchDataStateContext);

    return <AppBar style={{
        backgroundColor: "#3C474B",
        color: "#dbdbf8"
    }} position="static">
        <Toolbar variant="dense">
            <FlexRow flexGrow={1} alignItems="center" justifyContent="space-between">
                <Typography
                    variant="h6"
                >
                    Twitch Favorites
                </Typography>
                <Login
                    userData={userData}
                    onLogin={() => getUser()}
                    onLogout={() => logout()}
                />
            </FlexRow>
        </Toolbar>
    </AppBar>
}
