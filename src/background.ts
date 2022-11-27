import BackgroundUpdater from "./background/BackgroundUpdater";

export default class Background {
    dataUpdater = new BackgroundUpdater();

    public init() {
        const self = this;

        this.dataUpdater.update();
        setInterval(() => this.dataUpdater.update(), 30000)

        chrome.runtime.onMessage.addListener(function (request: any, sender: chrome.runtime.MessageSender) {
            // maybe do something here
        });
    }
}
(new Background).init();