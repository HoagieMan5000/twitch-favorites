import FollowingListProvider from "../providers/FollowingListProvider";
import StreamsProvider from "../providers/StreamsProvider";
import UserDataProvider from "../providers/UserDataProvider";
import CachedDataProvider from "../util/CachedDataProvider";
import ChromeStorage from "../util/chrome/ChromeStorage";

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

    const user = await CachedDataProvider.getUserData();
    console.log({ user });
    const allStreamData = await CachedDataProvider.getStreamData();
    const favoritesResponse = await new ChromeStorage().getSync([user.id]);
    console.log({ favoritesResponse });
    const favorites = favoritesResponse[user.id];
    console.log({ favorites });
    const streamsData = allStreamData?.filter((streamData) => {
      return favorites?.favorites?.find((fav: any) => fav.channelId === streamData.user_id);
    });
    console.log({ streamsData });
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      tabs.forEach((tab) => {
        if (tab.id) {
          chrome.tabs.sendMessage(tab.id, { type: "getLiveStreamsResponse", streams: streamsData });
        }
      });
    });
  }
}
