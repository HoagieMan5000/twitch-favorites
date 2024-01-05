import { useState } from "react";
import CachedDataProvider from "../util/CachedDataProvider";

export const useTwitchAccessToken = (): [string | undefined, () => Promise<void>, () => void] => {
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);

  const getToken = async () => {
    const token = await CachedDataProvider.getTwitchAccessToken();
    if (token) {
      setAccessToken(token);
    }
  }

  return [accessToken, getToken, () => setAccessToken(undefined)]
}