import { useState } from "react";
import { UserData } from "../service/TwitchClientTypes";
import CachedDataProvider from "../util/CachedDataProvider";

export const useUserData = (): [UserData | undefined, () => Promise<void>, () => void] => {
  const [userData, setUserData] = useState<UserData | undefined>(undefined);

  const getUser = async () => {
    const user = await CachedDataProvider.getUserData();
    if (user) {
      setUserData(user);
    }
  }

  return [userData, getUser, () => setUserData(undefined)]
}