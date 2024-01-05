import { useEffect, useState } from "react";
import { UserData } from "../service/TwitchClientTypes";
import CachedDataProvider from "../util/CachedDataProvider";
import UserDataProvider from "../providers/UserDataProvider";

export const useUserData = (accessToken: string | undefined): [UserData | undefined, () => Promise<void>, () => void, () => Promise<void>] => {
  const [userData, setUserData] = useState<UserData | undefined>(undefined);

  const getUser = async () => {
    const user = await CachedDataProvider.getUserData();
    if (user) {
      setUserData(user);
    }
  }

  const refreshUser = async () => {
    const userData = await UserDataProvider.getUser();
    if (userData) {
      setUserData(userData);
    }
  }

  useEffect(() => {
    if (accessToken) {
      getUser();
    }
  }, [accessToken]);


  return [userData, getUser, () => setUserData(undefined), refreshUser]
}