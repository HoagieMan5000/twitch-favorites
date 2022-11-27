import { StreamData, UserData, UserFollows } from "../service/TwitchClientTypes";
import ChromeStorage from "./chrome/ChromeStorage";

export default class CachedDataProvider {
    public static async getUserData() {
        const storage = new ChromeStorage();
        return (await storage.getLocal(["userData"]))?.userData
    }

    public static setUserData(userData?: UserData) {
        const storage = new ChromeStorage();
        return storage.setLocal({
            userData: userData
        })
    }

    public static async getFollowingList() {
        const storage = new ChromeStorage();
        return (await storage.getLocal(["followingList"]))?.followingList
    }

    public static setFollowingList(followingList?: UserFollows[]) {
        const storage = new ChromeStorage();
        return storage.setLocal({
            followingList
        })
    }

    public static async getFollowingUserData() {
        const storage = new ChromeStorage();
        return (await storage.getLocal(["followingUserData"]))?.followingUserData as UserData[] | undefined
    }

    public static setFollowingUserData(followingUserData?: UserData[]) {
        const storage = new ChromeStorage();
        return storage.setLocal({
            followingUserData
        })
    }

    public static async getStreamData() {
        const storage = new ChromeStorage();
        return (await storage.getLocal(["streamData"]))?.streamData as StreamData[] | undefined
    }

    public static setStreamData(streamData?: StreamData[]) {
        const storage = new ChromeStorage();
        return storage.setLocal({
            streamData
        })
    }
}
