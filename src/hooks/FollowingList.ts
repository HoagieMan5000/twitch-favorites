import { useEffect, useState } from "react";
import TwitchClient from "../service/TwitchClient";
import { UserData, UserFollows } from "../service/TwitchClientTypes";
import LoginUtil from "../util/login/LoginUtil";

export const useFollowingList = (userData?: UserData): [UserFollows[] | undefined, () => Promise<void>] => {
    const [followingList, setFollowingList] = useState<UserFollows[] | undefined>(undefined);

  useEffect(() => {
    getFollowing();
  }, [userData]);

    const getFollowing = async () => {
      const loginData = await LoginUtil.getLogin();
      if (loginData?.accessToken && userData) {
        const client = new TwitchClient(loginData.accessToken);
        const user = await client.getAllUsersFollowedChannels(userData.login);
        setFollowingList(user);
      }
    }

    return [followingList, getFollowing]
}