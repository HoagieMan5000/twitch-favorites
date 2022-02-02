import { Button } from "@mui/material";
import React from "react"
import Config from "../../Config";
import { UserData } from "../../service/TwitchClientTypes";
import LoginUtil from "../../util/login/LoginUtil";

export interface LoginProps {
    userData?: UserData

    onLogin: () => void
}

export const Login = (props: LoginProps) => {
    const { userData, onLogin } = props;

    return <div>
        {!userData &&
            <Button onClick={() => {
                chrome.identity.launchWebAuthFlow({
                    interactive: true,
                    url: `https://id.twitch.tv/oauth2/authorize?client_id=${Config.ClientId}&redirect_uri=${Config.RedirectUrl}&response_type=token&scope=${Config.TwitchScopes}`,
                },
                    async (responseUrl?: string) => {
                        const token = LoginUtil.parseAccessToken(responseUrl);
                        if (token) {
                            await LoginUtil.saveLogin(token);
                            onLogin();
                        }
                    })
            }}>Login</Button>
        }
        {userData &&
            <div>{userData.display_name}</div>
        }
    </div>
}