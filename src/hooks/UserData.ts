import { useState } from "react";
import TwitchClient from "../service/TwitchClient";
import { UserData } from "../service/TwitchClientTypes";
import LoginUtil from "../util/login/LoginUtil";

export const useUserData = (): [UserData | undefined, () => Promise<void>] => {
    const [userData, setUserData] = useState<UserData | undefined>(undefined);

    const getUser = async () => {
      const loginData = await LoginUtil.getLogin();
      if (loginData?.accessToken) {
        const client = new TwitchClient(loginData.accessToken);
        const user = await client.getCurrentUser();
        setUserData(user);
      }
    }

    return [userData, getUser]
}