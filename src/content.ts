import "./content.css";
import { StreamData } from "./service/TwitchClientTypes";
import ChromeStorage from "./util/chrome/ChromeStorage";

const streamListClassname = "favorite-stream-list";

let added = false;

// Function to insert a new element after a reference element
function insertAfter(newNode: HTMLDivElement, referenceNode: Node) {
  console.log("INSERTING");
  referenceNode.parentElement?.insertBefore(newNode, referenceNode);
}

function createStreamList(streamData: StreamData[]) {
  const container = document.createElement("div");
  container.className = streamListClassname;
  container.append(...streamData.map((stream) => {
    const streamElement = document.createElement("div");
    streamElement.className = `${streamListClassname}-item`;
    streamElement.textContent = stream.user_name;
    return streamElement;
  }));
  return container;
}

function findStreamListElement() {
  return document.getElementsByClassName(streamListClassname)[0];
}

// Function to handle DOM changes
function handleMutations(mutations: MutationRecord[]) {
  if (added) {
    return;
  }

  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      mutation.addedNodes.forEach((addedNode) => {
        if (
          addedNode instanceof HTMLElement &&
          addedNode.attributes?.getNamedItem("aria-label")?.value ===
            "Followed Channels"
        ) {
          const streamList = createStreamList([]);
          insertAfter(streamList, addedNode);
          added = true;
        }
      });
    }
  });
}

// Set up the observer
const observer = new MutationObserver(handleMutations);

// Start observing
observer.observe(document.body, { childList: true, subtree: true });

chrome.runtime.onMessage.addListener(function (
  request: {
    type: string,
    [key: string]: any
  },
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: any) => void
) {
  console.log({request});
  if (request.type === "getLiveStreamsResponse") {
    const existingElement = findStreamListElement();
    if (existingElement) {
      const newElement = createStreamList(request.streams);
      existingElement.replaceWith(newElement);
    }
  }
});
