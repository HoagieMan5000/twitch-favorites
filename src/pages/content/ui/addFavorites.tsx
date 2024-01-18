import { GetLiveStreamsRequest, GetLiveStreamsResponse } from "@root/src/shared/messaging/GetLiveStreams";
import { createRoot } from "react-dom/client";
import App from '@pages/content/ui/app';
import injectedStyle from './injected.css?inline';
import refreshOnUpdate from "virtual:reload-on-update-in-view";

refreshOnUpdate('pages/content');

const favoritesClassname = 'favorites-list-container';

// Function to insert a new element after a reference element
const insertAfter = (newNode: HTMLDivElement, referenceNode: Node) => {
  console.log("Twitch Favorites: Inserting Component");
  const root = document.createElement('div');
  root.id = 'chrome-extension-boilerplate-react-vite-content-view-root';
  
  referenceNode.parentElement?.insertBefore(root, referenceNode);
  
  const rootIntoShadow = document.createElement('div');
  rootIntoShadow.id = 'shadow-root';
  
  const shadowRoot = root.attachShadow({ mode: 'open' });
  shadowRoot.appendChild(rootIntoShadow);
  
  /** Inject styles into shadow dom */
  const styleElement = document.createElement('style');
  styleElement.innerHTML = injectedStyle;
  shadowRoot.appendChild(styleElement); 
 
  createRoot(rootIntoShadow).render(<App />);
}

function createStreamList(streamData: any[]) {
  const container = document.createElement('div');
  container.className = favoritesClassname;
  const header = document.createElement('h5');
  header.textContent = 'LIVE FAVORITES';
  container.append(header);

  const streamList = document.createElement('div');
  streamList.append(
    ...streamData.map(stream => {
      const streamElement = document.createElement('div');
      streamElement.className = `${favoritesClassname}-item`;
      streamElement.textContent = stream.user_name;
      return streamElement;
    }),
  );
  container.append(streamList);

  return container;
}

function findStreamListElement() {
  return document.getElementsByClassName(favoritesClassname)[0];
}

function elementExists() {
  return !!document.getElementsByClassName(favoritesClassname).length;
}

// Function to handle DOM changes
function handleMutations(mutations: MutationRecord[]) {
  console.log("Twitch Favorites: Handling Mutations");
  if (elementExists()) {
    console.log("Twitch Favorites: Element already exists");
    return;
  }

  mutations.forEach(mutation => {
    if (mutation.addedNodes.length) {
      mutation.addedNodes.forEach(addedNode => {
        if (addedNode instanceof HTMLElement) {
          console.log({ addedNode: addedNode.attributes?.getNamedItem('aria-label') });
        }
        if (
          addedNode instanceof HTMLElement &&
          addedNode.attributes?.getNamedItem('aria-label')?.value === 'Followed Channels'
        ) {
          console.log("Twitch Favorites: Found Followed Channels");
          const streamList = createStreamList([]);
          insertAfter(streamList, addedNode);
          requestStreamData();
        }
      });
    }
  });
}

function requestStreamData() {
  const streamsRequest: GetLiveStreamsRequest = { type: 'getLiveStreams' };
  chrome.runtime.sendMessage(streamsRequest, (response: GetLiveStreamsResponse) => {
    console.log({ response });
    if (response?.type === 'getLiveStreamsResponse') {
      const existingElement = findStreamListElement();
      if (existingElement) {
        const newElement = createStreamList(response.streams);
        existingElement.replaceWith(newElement);
      }
    }
    //return true;
  });
}

async function addFavorites() {
  // Set up the observer
  const observer = new MutationObserver(handleMutations);

  // Start observing
  observer.observe(document.body, { childList: true, subtree: true });

  chrome.runtime.onMessage.addListener(function (
    request: {
      type: string;
      [key: string]: any;
    },
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: any) => void,
  ) {
    console.log({ request, sender });
    if (request.type === 'getLiveStreamsResponse') {
      const existingElement = findStreamListElement();
      if (existingElement) {
        const newElement = createStreamList(request.streams);
        existingElement.replaceWith(newElement);
      }
    }
    //return true;
  });
}

console.log("injected Twitch Favorites");
void addFavorites();
