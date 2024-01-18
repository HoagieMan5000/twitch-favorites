import { useEffect, useState } from "react";
import { UserData, UserFollows } from "../service/TwitchClientTypes";
import CachedDataProvider from "../util/CachedDataProvider";

export const useFollowingList = (userData?: UserData): [UserData[] | undefined] => {
  const [followingList, setFollowingList] = useState<UserFollows[] | undefined>(undefined);
  const [followingUserData, setFollowingUserData] = useState<UserData[] | undefined>(undefined);

  useEffect(() => {
    CachedDataProvider.getFollowingList().then((follows) => {
      if (follows) {
        setFollowingList(follows);
      }
    });
  }, [userData]);

  useEffect(() => {
    CachedDataProvider.getFollowingUserData().then((userDatas) => {
      if (userDatas) {
        setFollowingUserData(userDatas)
      }
    })
  }, [followingList])

  return [followingUserData]
}