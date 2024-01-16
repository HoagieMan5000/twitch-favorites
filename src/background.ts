import BackgroundUpdater from "./background/BackgroundUpdater";
import CachedDataProvider from "./util/CachedDataProvider";
import ChromeStorage from "./util/chrome/ChromeStorage";

export default class Background {
  dataUpdater = new BackgroundUpdater();

  public init() {
    const self = this;

    this.dataUpdater.update();
    setInterval(() => this.dataUpdater.update(), 30000);

    chrome.runtime.onMessage.addListener(async function (
      request: any,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response: any) => void
    ) {
      if (request.type === "getLiveStreams") {
        const allStreams = await CachedDataProvider.getStreamData();
        sendResponse({
            type: "getLiveStreamsResponse",
            streams: allStreams
        });
      }
    });
  }
}
new Background().init();
