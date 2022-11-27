import TwitchClient from "../service/TwitchClient";
import { UserData, UserFollows } from "../service/TwitchClientTypes";
import LoginUtil from "../util/login/LoginUtil";

export default class FollowingListProvider {
    public static async getFollowing(userData?: UserData) {
        const loginData = await LoginUtil.getLogin();
        if (loginData?.accessToken && userData) {
            const client = new TwitchClient(loginData.accessToken);
            const follows = await client.getAllUsersFollowedChannels(userData.login);
            return follows;
        }
        return undefined;
    }

    public static async getFollowingUserData(followingList?: UserFollows[]) {
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
            return following;
        }
        return undefined;
    }
}