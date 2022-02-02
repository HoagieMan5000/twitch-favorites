import ChromeStorage from "../chrome/ChromeStorage";
import * as queryString from "query-string";

export default class LoginUtil {
    public static async saveLogin(accessToken?: string) {
        new ChromeStorage().setLocal({
            twitchAccessToken: accessToken
        })
    }

    public static async getLogin() {
        const storage = new ChromeStorage();
        return {
            accessToken: (await storage.getLocal(["twitchAccessToken"]))?.twitchAccessToken
        }
    }

    public static parseAccessToken(url?: string) {
        if (url) {
            const qs = queryString.parse(url.substring(url.indexOf('#')));
            return qs.access_token as string;
        }
        return undefined;
    }
}