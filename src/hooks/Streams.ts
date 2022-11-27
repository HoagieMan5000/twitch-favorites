import { useEffect, useState } from "react";
import { StreamData, UserData } from "../service/TwitchClientTypes";
import CachedDataProvider from "../util/CachedDataProvider";

export const useStreams = (userFollows?: UserData[], callback?: () => void): [StreamData[] | undefined, () => Promise<void>] => {
  const [streams, setStreams] = useState<StreamData[] | undefined>(undefined);

  useEffect(() => {
    getStreams();
  }, [userFollows]);

  const getStreams = async () => {
    const streamData = await CachedDataProvider.getStreamData()
    if (streamData) {
      setStreams(streamData);
      if (callback) {
        callback();
      }
    }
  }

  return [streams, getStreams]
}