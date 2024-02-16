import { GetLiveStreamsResponse } from "@root/src/shared/messaging/GetLiveStreams";
import FollowingListProvider from "../../shared/providers/FollowingListProvider";
import StreamsProvider from "../../shared/providers/StreamsProvider";
import UserDataProvider from "../../shared/providers/UserDataProvider";
import CachedDataProvider from "../../shared/util/CachedDataProvider";
import ChromeStorage from "../../shared/util/chrome/ChromeStorage";
import { getStreamInfo } from "./StreamInfoProvider";

const defaultPeriodsMillis = {
  user: 240e3,
  following: 120e3,
  streamData: 60e3,
};

export default class BackgroundUpdater {
  private lastUpdateMillis: {
    user: number;
    following: number;
    streamData: number;
  } = {
    user: 0,
    following: 0,
    streamData: 0,
  };

  public async update() {
    const now = Date.now();
    if (now - this.lastUpdateMillis.user >= defaultPeriodsMillis.user) {
      const userData = await UserDataProvider.getUser();
      if (userData) {
        CachedDataProvider.setUserData(userData);
        this.lastUpdateMillis.user = now;
      }
    }

    if (now - this.lastUpdateMillis.following >= defaultPeriodsMillis.following) {
      const userData = await CachedDataProvider.getUserData();
      if (userData) {
        const following = await FollowingListProvider.getFollowing(userData);
        if (following) {
          CachedDataProvider.setFollowingList(following);
        }

        if (following) {
          const followingUserData =
            await FollowingListProvider.getFollowingUserData(following);
          if (followingUserData) {
            CachedDataProvider.setFollowingUserData(followingUserData);
            this.lastUpdateMillis.following = now;
          }
        }
      }
    }

    if (now - this.lastUpdateMillis.streamData >= defaultPeriodsMillis.streamData) {
      const followingUserData = await CachedDataProvider.getFollowingUserData();
      if (followingUserData) {
        const streamsData = await StreamsProvider.getStreams(followingUserData);
        if (streamsData) {
          CachedDataProvider.setStreamData(streamsData);
          this.lastUpdateMillis.streamData = now;
        }
      }
    }

    const streamsData = await getStreamInfo();
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      tabs.forEach((tab) => {
        if (tab.id) {
          const streamMessage: GetLiveStreamsResponse = {
            type: "getLiveStreamsResponse",
            streams: streamsData.streamsData || [],
            userData: streamsData.favUserData || [],
          };
          console.log({ streamMessage });
          chrome.tabs.sendMessage(tab.id, streamMessage);
        }
      });
    });
  }
}
