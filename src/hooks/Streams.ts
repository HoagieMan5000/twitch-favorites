import { useEffect, useState } from "react";
import TwitchClient from "../service/TwitchClient";
import { StreamData, UserData } from "../service/TwitchClientTypes";
import LoginUtil from "../util/login/LoginUtil";

export const useStreams = (userFollows?: UserData[], callback?: () => void): [StreamData[] | undefined, () => Promise<void>] => {
  const [streams, setStreams] = useState<StreamData[] | undefined>(undefined);

  useEffect(() => {
    getStreams();
  }, [userFollows]);

  const getStreams = async () => {
    const loginData = await LoginUtil.getLogin();
    if (loginData?.accessToken && userFollows) {
      const client = new TwitchClient(loginData.accessToken);
      let numRequested = 0;
      const numPerRequest = 100;
      const streamData: StreamData[] = [];
      while (numRequested <= userFollows.length) {
        const streamsToRequest = userFollows.slice(numRequested, numRequested + numPerRequest);
        const streamsResponse = await client.getStreamsByUsernames(streamsToRequest.map(u => u.login));
        streamData.push(...streamsResponse)

        numRequested += numPerRequest;
      }
      setStreams(streamData);
      if (callback) {
        callback();
      }
    }
  }

  return [streams, getStreams]
}