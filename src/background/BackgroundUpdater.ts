import FollowingListProvider from "../providers/FollowingListProvider";
import StreamsProvider from "../providers/StreamsProvider";
import UserDataProvider from "../providers/UserDataProvider";
import CachedDataProvider from "../util/CachedDataProvider";

export default class BackgroundUpdater {
    public async update() {
        const userData = await UserDataProvider.getUser();
        const following = await FollowingListProvider.getFollowing(userData);
        const followingUserData = await FollowingListProvider.getFollowingUserData(following);
        const streamsData = await StreamsProvider.getStreams(followingUserData);

        console.log({
            userData,
            following,
            followingUserData,
            streamsData
        })

        if (userData) {
            CachedDataProvider.setUserData(userData);
        }

        if (following) {
            CachedDataProvider.setFollowingList(following);
        }

        if (followingUserData) {
            CachedDataProvider.setFollowingUserData(followingUserData);
        }

        if (streamsData) {
            CachedDataProvider.setStreamData(streamsData);
        }
    }
}