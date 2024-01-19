import { StreamData } from "../service/TwitchClientTypes";
import { GetLiveStreamsRequest } from "./GetLiveStreams";

export class MessageClient {
    public static async requestStreams(): Promise<StreamData[]> {
        const request: GetLiveStreamsRequest = { type: "getLiveStreams" };
        const response = await this.sendMessage(request);
        if (response.type === "getLiveStreamsResponse") {
            return response.streams;
        }
        return [];
    }

    public static async sendMessage(request: any): Promise<any> {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage(request, (response: any) => {
                resolve(response);
            });
        });
    }
}