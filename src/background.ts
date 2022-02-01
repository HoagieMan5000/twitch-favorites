export default class Background {
    public init() {
        const self = this;
        chrome.runtime.onMessage.addListener(function (request: any, sender: chrome.runtime.MessageSender) {
            // maybe do something here
        });
    }
}
(new Background).init();