import { useEffect, useState } from "react";
import TwitchClient from "../service/TwitchClient";
import { UserData, UserFollows } from "../service/TwitchClientTypes";
import LoginUtil from "../util/login/LoginUtil";

export const useFollowingList = (userData?: UserData): [UserData[] | undefined, () => Promise<void>] => {
  const [followingList, setFollowingList] = useState<UserFollows[] | undefined>(undefined);
  const [followingUserData, setFollowingUserData] = useState<UserData[] | undefined>(undefined);

  useEffect(() => {
    getFollowing();
  }, [userData]);

  useEffect(() => {
    getFollowingUserData();
  }, [followingList])

  const getFollowing = async () => {
    const loginData = await LoginUtil.getLogin();
    if (loginData?.accessToken && userData) {
      const client = new TwitchClient(loginData.accessToken);
      const user = await client.getAllUsersFollowedChannels(userData.login);
      setFollowingList(user);
    }
  }

  const getFollowingUserData = async () => {
    const loginData = await LoginUtil.getLogin();
    if (loginData?.accessToken && followingList) {
      const client = new TwitchClient(loginData.accessToken);
      let numRequested = 0;
      const numPerRequest = 100;
      const following: UserData[] = [];
      while (numRequested <= followingList.length) {
        const streamsToRequest = followingList.slice(numRequested, numRequested + numPerRequest);
        const streamsResponse = await client.getUsers(streamsToRequest.map(u => u.to_name));
        following.push(...streamsResponse)

        numRequested += numPerRequest;
      }
      setFollowingUserData(following);
    }
  }

  return [followingUserData, getFollowing]
}