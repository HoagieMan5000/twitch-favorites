import { StreamData } from "../service/TwitchClientTypes";
import { GetLiveStreamsRequest, GetLiveStreamsResponse } from "./GetLiveStreams";

export class MessageClient {
    public static async requestStreams(): Promise<GetLiveStreamsResponse | undefined> {
        const request: GetLiveStreamsRequest = { type: "getLiveStreams" };
        const response = await this.sendMessage(request);
        console.log({ response });
        if (response?.type === "getLiveStreamsResponse") {
            return response;
        }
    }

    public static async sendMessage(request: GetLiveStreamsRequest): Promise<GetLiveStreamsResponse> {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage(request, (response: any) => {
                resolve(response);
            });
        });
    }
}