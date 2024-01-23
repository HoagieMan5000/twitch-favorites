import { GetLiveStreamsResponse } from '@root/src/shared/messaging/GetLiveStreams';
import CachedDataProvider from '@root/src/shared/util/CachedDataProvider';

export function initStreamInfoProvider() {
  chrome.runtime.onMessage.addListener(function (
    request: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: any) => void,
  ) {
    console.log({ request, sender, sendResponse });
    if (request.type === 'getLiveStreams') {
      getStreamInfo().then(streams => {
        console.log({ streams });
        const response: GetLiveStreamsResponse = {
          type: 'getLiveStreamsResponse',
          streams,
        };
        console.log({ response });
        sendResponse(response);
      });
    }
    return true;
  });
}

export async function getStreamInfo() {
  const user = await CachedDataProvider.getUserData();
  const allStreamData = await CachedDataProvider.getStreamData();
  const favorites = await CachedDataProvider.getFavorites(user.id);
  console.log({ user, allStreamData, favorites });
  const streamsData = allStreamData?.filter(streamData => {
    return favorites?.favorites?.find((fav: any) => fav.channelId === streamData.user_id);
  });
  return streamsData;
}
