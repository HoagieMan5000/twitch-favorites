import TwitchClient from "../service/TwitchClient";
import LoginUtil from "../util/login/LoginUtil";

export default class UserDataProvider {
    public static async getUser() {
        const loginData = await LoginUtil.getLogin();
        if (loginData?.accessToken) {
            const client = new TwitchClient(loginData.accessToken);
            const user = await client.getCurrentUser();
            return user;
        }
        return undefined
    }
}