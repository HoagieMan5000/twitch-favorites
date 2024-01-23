import { StreamData, UserData, UserFollow } from '../service/TwitchClientTypes';
import { FavoritesState } from '../state/FavoritesState';
import ChromeStorage from './chrome/ChromeStorage';

export default class CachedDataProvider {
  public static async getUserData(): Promise<UserData> {
    const storage = new ChromeStorage();
    return (await storage.getLocal(['userData']))?.userData;
  }

  public static setUserData(userData?: UserData) {
    const storage = new ChromeStorage();
    return storage.setLocal({
      userData: userData,
    });
  }

  public static async getTwitchAccessToken(): Promise<string | undefined> {
    const storage = new ChromeStorage();
    return (await storage.getLocal(['twitchAccessToken'])).twitchAccessToken;
  }

  public static setTwitchAccessToken(token?: string) {
    const storage = new ChromeStorage();
    return storage.setLocal({
      twitchAccessToken: token,
    });
  }

  public static async getFollowingList() {
    const storage = new ChromeStorage();
    return (await storage.getLocal(['followingList']))?.followingList;
  }

  public static setFollowingList(followingList?: UserFollow[]) {
    const storage = new ChromeStorage();
    return storage.setLocal({
      followingList,
    });
  }

  public static async getFollowingUserData() {
    const storage = new ChromeStorage();
    return (await storage.getLocal(['followingUserData']))?.followingUserData as UserData[] | undefined;
  }

  public static setFollowingUserData(followingUserData?: UserData[]) {
    const storage = new ChromeStorage();
    return storage.setLocal({
      followingUserData,
    });
  }

  public static async getStreamData() {
    const storage = new ChromeStorage();
    return (await storage.getLocal(['streamData']))?.streamData as StreamData[] | undefined;
  }

  public static setStreamData(streamData?: StreamData[]) {
    const storage = new ChromeStorage();
    return storage.setLocal({
      streamData,
    });
  }

  public static async getFavorites(userId: string): Promise<FavoritesState | undefined> {
    const storage = new ChromeStorage();
    return (await storage.getSync([userId]))?.[userId] as FavoritesState | undefined;
  }

  public static async setFavorites(userId: string, favorites?: FavoritesState) {
    const storage = new ChromeStorage();
    return storage.setSync({
      [userId]: favorites,
    });
  }
}
