import axios, { AxiosResponse } from "axios";
import NodeCache from "node-cache";
import Config from "../Config";
import CacheManager from "../util/CacheManager";
import { ChannelData, DataResponse, Game, LiveChannelData, Paginated, StreamData, UserData, UserFollow, UserFollows, UserSubscriptions } from "./TwitchClientTypes";

export interface ValidatedSession {
    expires_in: number
    login: string
    user_id: string
}

export default class TwitchClient {
    accessToken: string;
    cache: NodeCache;

    constructor(accessToken: string, cacheManager?: CacheManager) {
        this.accessToken = accessToken;
        this.cache = cacheManager?.get("TwitchClient") ?? new NodeCache();
    }

    async validateSession(): Promise<{
        validatedSession: ValidatedSession | undefined,
        validated: boolean
    }> {
        const response = await fetch("https://id.twitch.tv/oauth2/validate", {
            method: 'GET',
            headers: {
                Authorization: `OAuth ${this.accessToken}`
            }
        });
        return {
            validated: response.status === 200,
            validatedSession: await response.json(),
        };
    }

    async getCurrentUser(): Promise<UserData> {
        const data = await this.getRequest(`https://api.twitch.tv/helix/users`, true);
        return data.data?.[0];
    }

    async getUsers(userIds: string[]): Promise<UserData[]> {
        const data = await this.getRequest(`https://api.twitch.tv/helix/users?${userIds.map(userId => `id=${userId}`).join('&')}`, true);
        return data.data;
    }

    async getUserStream(username: string): Promise<any[]> {
        const data = await this.getRequest(`https://api.twitch.tv/helix/streams?user_login=${username}`, false);
        return data.data;
    }

    async getUserSubscriptions(broadcasterId: string, userId: string): Promise<UserSubscriptions[]> {
        const data = await this.getRequest(`https://api.twitch.tv/helix/subscriptions/user?broadcaster_id=${broadcasterId}&user_id=${userId}`, true);
        return data.data;
    }

    async getUserFollows(broadcasterId: string, userId: string): Promise<UserFollows[]> {
        const data = await this.getRequest(`https://api.twitch.tv/helix/users/follows?to_id=${broadcasterId}&from_id=${userId}`, true);
        return data.data;
    }

    async getAllUsersFollowedChannels(broadcasterLogin: string): Promise<UserFollow[]> {
        let after = undefined;
        const follows: UserFollow[] = [];
        const broadcasterId = await this.getUserId(broadcasterLogin);
        do {
            const url = `https://api.twitch.tv/helix/channels/followed?user_id=${broadcasterId}&first=100${after ? `&after=${after}` : ``}`;
            const page = await this.getRequest(url, true) as Paginated<UserFollow[]>;
            follows.push(...page.data);
            after = page.pagination?.cursor;
        } while (after);
        return follows;
    }

    async getLiveChannels(categoryName: string): Promise<LiveChannelData[]> {
        let after = undefined;
        const channels: LiveChannelData[] = [];
        do {
            const url = `https://api.twitch.tv/helix/search/channels?live_only=true&first=100${after ? `&after=${after}` : ``}&query=${encodeURIComponent(`${categoryName}`)}`;
            const page = await this.getRequest(url, false) as Paginated<LiveChannelData[]>;
            channels.push(...page.data);
            after = page.pagination?.cursor;
        } while (after);
        return channels;
    }

    async getChannel(broadcasterId: string): Promise<ChannelData[]> {
        const data = await this.getRequest(`https://api.twitch.tv/helix/channels?broadcaster_id=${broadcasterId}`, true);
        return data.data;
    }

    async getStreamsByUsernames(usernames: string[]): Promise<StreamData[]> {
        const data = await this.getRequest(`https://api.twitch.tv/helix/streams?${usernames.map(u => `user_login=${u}`).join("&")}`, false);
        return data.data ?? [];
    }

    async getStreamsByGame(gameId: string): Promise<StreamData[]> {
        let after = undefined;
        const channels: StreamData[] = [];
        do {
            const page = await this.getRequest(`https://api.twitch.tv/helix/streams?game_id=${gameId}&first=100${after ? `&after=${after}` : ``}`, false) as Paginated<StreamData[]>;
            channels.push(...page.data);
            after = page.pagination?.cursor;
        } while (after);
        return channels;
    }

    async getGame(name: string): Promise<Game | undefined> {
        const data = await this.getRequest(`https://api.twitch.tv/helix/games?name=${name}`, false) as DataResponse<Game[]>;
        return data.data?.[0];
    }

    async getUserId(username: string) {
        const data = await this.getRequest(`https://api.twitch.tv/helix/users?login=${username}`, true);
        if (data?.data && data?.data?.length === 1) {
            return data.data[0].id as number;
        }
        return undefined;
    }

    async getFollows(props: { userId: string, max?: number, cursor?: string }): Promise<UserFollow[]> {
        const { userId, max, cursor } = props;

        const follows: UserFollow[] = [];
        let currCursor: string | undefined = cursor;
        do {
            let query = [];
            query.push(userId ? `user_id=${userId}` : '');
            query.push(max ? `first=${max}` : '');
            query.push(cursor ? `after=${currCursor}` : '');
            const request = `https://api.twitch.tv/helix/users/follows?${query.join("&")}`;
            const data = await this.getRequest(request, true);
            follows.push(...data.data);
            currCursor = data.pagination?.cursor;
        } while (currCursor)

        return follows;
    }

    async getRequest(request: string, useCache: boolean) {
        const cached = useCache ? this.cache.get(request) as AxiosResponse : undefined;
        if (cached) {
            return cached;
        }

        const response = await fetch(request, {
            headers: this.getAuthHeaders()
        });

        const data = await response.json();
        if (response && response.status === 200 && useCache) {
            this.cache.set(request, data, 60);
        }

        return data;
    }

    getAuthHeaders() {
        return {
            "Client-Id": Config.ClientId,
            Authorization: `Bearer ${this.accessToken}`
        }
    }
}